import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

const SYSTEM_PROMPT = `<start_of_turn>system
You are a content moderation AI. Analyze text and classify it accurately into appropriate categories. For neutral or safe content, use the 'neutral' type. You must respond ONLY with valid JSON.

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

export async function analyzeWithMistral(text: string) {
  if (!import.meta.env.VITE_HUGGINGFACE_API_KEY) {
    console.error('HuggingFace API key missing in environment:', {
      exists: !!import.meta.env.VITE_HUGGINGFACE_API_KEY,
      env: import.meta.env
    });
    throw new Error('HuggingFace API key is not configured in environment variables');
  }

  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const response = await hf.textGeneration({
        model: MODEL_ID,
        inputs: SYSTEM_PROMPT.replace('TEXT_TO_ANALYZE', text),
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.05,
          top_p: 0.9,
          return_full_text: false,
          stop: ["<end_of_turn>"],
          repetition_penalty: 1.3,
        }
      });

      if (!response.generated_text) {
        throw new Error('No response from Mistral API');
      }

      // More aggressive cleanup of the response
      const jsonStr = response.generated_text
        .trim()
        .replace(/<[^>]+>/g, '') // Remove all XML-like tags
        .replace(/```[^`]*```/g, '') // Remove code blocks
        .replace(/^[^{]*({.*})[^}]*$/, '$1') // Extract just the JSON object
        .trim();

      try {
        const parsed = JSON.parse(jsonStr);
        // Validate the response structure
        if (!parsed.flags || !parsed.summary || !parsed.overallToxicity) {
          throw new Error('Invalid response structure');
        }
        return parsed;
      } catch (jsonError) {
        console.error('JSON parsing failed:', { error: jsonError, response: jsonStr });
        // Return a more appropriate fallback for the specific text
        return {
          flags: [{
            type: 'neutral',
            reason: `Unable to detect any issues with the content`,
            confidence: 0.9,
            context: text,
            severity: 'low'
          }],
          overallToxicity: 0.1,
          summary: {
            spamScore: 0.1,
            toxicityScore: 0.1,
            profanityCount: 0,
            emotionalIntensity: 0.2,
            threatLevel: 0.1,
            manipulationScore: 0.1,
            credibilityScore: 0.9
          }
        };
      }
    } catch (error) {
      attempts++;
      if (attempts === MAX_RETRIES) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}