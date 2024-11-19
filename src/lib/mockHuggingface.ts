// src/lib/mockHuggingface.ts
export const mockHuggingFaceClassification = async (text: string) => {
  // Analyze text content for toxicity indicators
  const containsToxicWords = /(bad|hate|stupid|ugly|terrible|awful|idiot)/gi.test(text);
  const containsThreats = /(kill|die|hurt|destroy|attack)/gi.test(text);
  const containsProfanity = /(damn|hell|crap)/gi.test(text);
  
  // Analyze text for emotional content
  const containsJoy = /(happy|joy|wonderful|great|excellent|amazing)/gi.test(text);
  const containsAnger = /(angry|mad|furious|rage|hate)/gi.test(text);
  const containsSadness = /(sad|depressed|unhappy|miserable|crying)/gi.test(text);

  // Calculate base scores
  const toxicityBase = containsToxicWords ? 0.75 : 0.15;
  const threatScore = containsThreats ? 0.85 : 0.1;
  const profanityScore = containsProfanity ? 0.65 : 0.05;

  return {
    toxicity: [
      { label: 'toxic', score: toxicityBase },
      { label: 'severe_toxic', score: threatScore },
      { label: 'obscene', score: profanityScore },
      { label: 'threat', score: containsThreats ? 0.9 : 0.1 },
      { label: 'insult', score: containsToxicWords ? 0.8 : 0.2 },
      { label: 'identity_attack', score: containsToxicWords ? 0.7 : 0.1 }
    ],
    emotion: [
      { label: 'joy', score: containsJoy ? 0.9 : 0.1 },
      { label: 'anger', score: containsAnger ? 0.85 : 0.15 },
      { label: 'sadness', score: containsSadness ? 0.8 : 0.2 },
      { label: 'neutral', score: (!containsJoy && !containsAnger && !containsSadness) ? 0.9 : 0.3 },
      { label: 'fear', score: containsThreats ? 0.75 : 0.1 },
      { label: 'surprise', score: 0.2 }
    ]
  };
};