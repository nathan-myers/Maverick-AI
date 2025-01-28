import { HfInference } from '@huggingface/inference';
import { ModerationContext } from './moderation';
import { analyzeMessageSequence, TRIP_STAGE_RULES, RELATIONSHIP_RULES } from './contextRules';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

const SYSTEM_PROMPT = `<start_of_turn>system
You are a context-aware content moderation AI. Analyze text based on the following contexts:

1. TRIP STAGES:
- before_pickup: Monitor for scams, verify identity
- during_ride: Heightened awareness for safety threats
- after_dropoff: Strict monitoring of personal boundaries

2. RELATIONSHIP CONTEXT:
- Driver-Passenger: Professional service relationship
- Power Dynamics: Driver has responsibility for passenger safety
- Boundaries: Strict professional conduct requirements

3. CONVERSATION PATTERNS:
- Previous Messages: Consider full conversation context
- Escalation: Monitor for increasing hostility/inappropriate behavior
- Professional Boundaries: Enforce service-appropriate communication
- Defensive Responses: Recognize legitimate responses to inappropriate behavior
Guidelines for classification:
4. RESPONSE CONTEXT:
- Consider previous message context when analyzing responses
- Defensive responses to harassment are NOT personal attacks
- Expressions of discomfort with inappropriate behavior are legitimate
- Prioritize user safety and professional boundaries
- 'harassment': Targeted, persistent negative behavior or bullying

Guidelines for classification:
- 'neutral': Safe, appropriate content with no issues or concerns
- 'spam': Promotional, repetitive, or unsolicited commercial content
- 'hate_speech': Content expressing hatred or prejudice against protected groups
- 'threat': Direct or implied threats of violence or harm
- 'personal_attack': Direct insults, name-calling, or character attacks
- 'harassment': Targeted, persistent negative behavior or bullying
- 'explicit_content': Adult, NSFW, or inappropriate sexual content
- 'misinformation': False or misleading claims and information
- 'self_harm': Content promoting or discussing self-injury
- 'violence': Graphic violence or glorification of violent acts
- 'emotional_manipulation': Content designed to manipulate emotions or gaslight
- 'profanity': Strong language, swearing, or vulgar content
- 'hate_group': Content promoting extremist groups or ideologies
- 'conspiracy': Unfounded conspiracy theories or disinformation
- 'impersonation': Content pretending to be from another person/entity
- 'trolling': Intentionally provocative or disruptive content
- 'doxxing': Sharing private or personal information without consent
- 'copyright': Unauthorized use of copyrighted material
- 'phishing': Scam attempts or fraudulent content
- 'extremism': Content promoting extreme ideological views

Additional Severity Modifiers:
- After-dropoff personal requests: +50% severity
- During-ride threats: +100% severity
- Driver-initiated personal comments: +50% severity
- Sequential boundary violations: +75% severity

Example classifications:
- "The weather is beautiful today" -> neutral
- "Buy now! Limited time offer!!!" -> spam
- "I hate [protected group]" -> hate_speech
- "You're an idiot" -> personal_attack
- "Click here to win $1000" -> phishing

Respond with ONLY this JSON structure:
{
  "flags": [
    {
      "type": "neutral" | "spam" | "hate_speech" | "threat" | "personal_attack" | "harassment" | "explicit_content" | "misinformation" | "self_harm" | "violence" | "emotional_manipulation" | "profanity" | "hate_group" | "conspiracy" | "impersonation" | "trolling" | "doxxing" | "copyright" | "phishing" | "extremism",
      "reason": "Detailed explanation of why this classification was chosen",
      "confidence": 0.95,
      "context": "Relevant text excerpt",
      "severity": "low" | "medium" | "high"
    }
  ],
  "overallToxicity": 0.75,
  "summary": {
    "spamScore": 0.2,
    "toxicityScore": 0.75,
    "profanityCount": 1,
    "emotionalIntensity": 0.6,
    "threatLevel": 0.3,
    "manipulationScore": 0.4,
    "credibilityScore": 0.8
  }
}

Text to analyze: TEXT_TO_ANALYZE<end_of_turn>`;

const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export async function analyzeWithMistral(text: string, context?: ModerationContext) {
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      // Analyze message sequence if previous messages exist
      let escalationAnalysis: {
        escalation_score: number;
        pattern_detected: string[];
      } = { 
        escalation_score: 0, 
        pattern_detected: [] 
      };
      if (context?.previousMessages?.length) {
        escalationAnalysis = analyzeMessageSequence(context.previousMessages);
      }

      // Apply context-specific rules
      const tripRules = TRIP_STAGE_RULES[context?.tripStatus || 'during_ride'];
      const relationshipRules = RELATIONSHIP_RULES['driver_to_passenger'];

      const contextualizedPrompt = {
        text,
        context: {
          ...context,
          escalation_analysis: escalationAnalysis,
          trip_rules: tripRules,
          relationship_rules: relationshipRules
        }
      };

      const prompt = SYSTEM_PROMPT.replace('TEXT_TO_ANALYZE', 
        JSON.stringify(contextualizedPrompt)
      );

      const hfResponse = await hf.textGeneration({
        model: MODEL_ID,
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.1,
          return_full_text: false,
          stop: ["<end_of_turn>"]
        }
      });

      // Extract JSON from the response
      const jsonMatch = hfResponse.generated_text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      // Clean and parse the JSON
      const cleanJson = jsonMatch[0]
        .replace(/[^\x20-\x7E]/g, '')    // Keep only printable ASCII characters
        .replace(/,\s*([\]}])/g, '$1')   // Remove trailing commas
        .replace(/\s+/g, ' ')            // Normalize whitespace
        .trim();

      try {
        return JSON.parse(cleanJson);
      } catch (parseError) {
        console.error('JSON Parse Error:', cleanJson);
        throw parseError;
      }
    } catch (error) {
      attempts++;
      if (attempts === MAX_RETRIES) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}
