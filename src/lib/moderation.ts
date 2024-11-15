import * as toxicity from '@tensorflow-models/toxicity';

export interface ModerationResult {
  text: string;
  flags: Flag[];
  overallToxicity: number;
  summary: {
    spamScore: number;
    toxicityScore: number;
    profanityCount: number;
    urlCount: number;
  };
}

export interface Flag {
  word: string;
  type: 'offensive' | 'spam' | 'inappropriate' | 'hate_speech' | 'profanity' | 'threat' | 'personal_attack' | 'scam';
  reason: string;
  confidence: number;
  context?: string;
}

let model: toxicity.ToxicityClassifier | null = null;

// Enhanced spam patterns with more comprehensive coverage
const spamPatterns = [
  {
    pattern: /\b(buy|cheap|discount|free|offer|price|prize|win|winner|earned|earn|income|profit)\b/gi,
    type: 'spam' as const,
    confidence: 0.75,
    reason: 'Commercial spam indicators'
  },
  {
    pattern: /\b(casino|lottery|bet|gambling|crypto|bitcoin|investment)\b/gi,
    type: 'scam' as const,
    confidence: 0.85,
    reason: 'Potential scam content'
  },
  {
    pattern: /\b(viagra|cialis|medication|pills|weight loss|miracle|cure)\b/gi,
    type: 'spam' as const,
    confidence: 0.8,
    reason: 'Medical spam indicators'
  },
  {
    pattern: /\b(click here|subscribe|sign up|limited time|act now|don't miss|hurry)\b/gi,
    type: 'spam' as const,
    confidence: 0.7,
    reason: 'Urgency spam tactics'
  },
  {
    pattern: /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g,
    type: 'spam' as const,
    confidence: 0.6,
    reason: 'Contains URLs'
  },
  {
    pattern: /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g,
    type: 'spam' as const,
    confidence: 0.6,
    reason: 'Contains email addresses'
  }
];

// Enhanced profanity and hate speech patterns
const offensivePatterns = [
  {
    pattern: /\b(hate|kill|death|die|murder)\b/gi,
    type: 'threat' as const,
    confidence: 0.9,
    reason: 'Violent content'
  },
  {
    pattern: /\b(stupid|idiot|dumb|loser|pathetic)\b/gi,
    type: 'personal_attack' as const,
    confidence: 0.8,
    reason: 'Personal attacks or insults'
  }
];

export async function initModel() {
  if (!model) {
    model = await toxicity.load(0.5, [
      'toxicity',
      'severe_toxicity',
      'identity_attack',
      'insult',
      'threat',
      'obscene',
      'sexual_explicit'
    ]);
  }
  return model;
}

export async function moderateText(text: string): Promise<ModerationResult> {
  const model = await initModel();
  const predictions = await model.classify([text]);
  
  const flags: Flag[] = [];
  let maxToxicity = 0;
  let spamScore = 0;
  let profanityCount = 0;
  const urlCount = (text.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g) || []).length;
  
  // Check AI model predictions
  predictions.forEach((prediction) => {
    const confidence = prediction.results[0].probabilities[1];
    maxToxicity = Math.max(maxToxicity, confidence);
    
    if (confidence > 0.5) {
      const type = getTypeFromLabel(prediction.label);
      flags.push({
        word: findOffendingPhrase(text),
        type,
        reason: `${prediction.label.replace(/_/g, ' ')} detected`,
        confidence: Math.round(confidence * 100) / 100,
        context: getTextContext(text, findOffendingPhrase(text))
      });
    }
  });

  // Check spam patterns
  spamPatterns.forEach(({ pattern, type, confidence, reason }) => {
    const matches = text.match(pattern);
    if (matches) {
      spamScore += confidence * matches.length;
      matches.forEach(match => {
        flags.push({
          word: match,
          type,
          reason,
          confidence,
          context: getTextContext(text, match)
        });
      });
    }
  });

  // Check offensive patterns
  offensivePatterns.forEach(({ pattern, type, confidence, reason }) => {
    const matches = text.match(pattern);
    if (matches) {
      profanityCount += matches.length;
      matches.forEach(match => {
        flags.push({
          word: match,
          type,
          reason,
          confidence,
          context: getTextContext(text, match)
        });
      });
    }
  });

  // Calculate weighted toxicity score
  const weightedToxicity = Math.max(
    maxToxicity,
    spamScore / 5,
    profanityCount * 0.2,
    urlCount * 0.15
  );

  return {
    text,
    flags: [...new Map(flags.map(flag => 
      [flag.word + flag.type, flag])).values()
    ].sort((a, b) => b.confidence - a.confidence),
    overallToxicity: weightedToxicity,
    summary: {
      spamScore: spamScore / 5,
      toxicityScore: maxToxicity,
      profanityCount,
      urlCount
    }
  };
}

function getTypeFromLabel(label: string): Flag['type'] {
  switch (label) {
    case 'toxicity':
    case 'severe_toxicity':
      return 'offensive';
    case 'identity_attack':
      return 'hate_speech';
    case 'insult':
      return 'personal_attack';
    case 'threat':
      return 'threat';
    case 'obscene':
    case 'sexual_explicit':
      return 'inappropriate';
    default:
      return 'inappropriate';
  }
}

function findOffendingPhrase(text: string): string {
  // Simple implementation - in a real system, you'd want more sophisticated phrase detection
  const words = text.split(/\s+/);
  return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
}

function getTextContext(text: string, match: string): string {
  const index = text.indexOf(match);
  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + match.length + 30);
  return '...' + text.slice(start, end) + '...';
}