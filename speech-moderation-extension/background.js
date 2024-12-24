const HF_API_KEY = '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';
const HF_API_ENDPOINT = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

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

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function moderateText(text) {
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      const prompt = SYSTEM_PROMPT.replace('TEXT_TO_ANALYZE', text);
      
      const response = await fetch(HF_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HF_API_KEY}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.05,
            top_p: 0.9,
            return_full_text: false,
            stop: ["<end_of_turn>"],
            repetition_penalty: 1.3
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle model loading state
      if (data.error && data.error.includes('Model is loading')) {
        console.log('Model is loading, retrying in 20 seconds...');
        await new Promise(resolve => setTimeout(resolve, 20000));
        attempts++;
        continue;
      }

      // Parse the model's response to extract the JSON
      let moderationResult;
      try {
        const jsonMatch = data[0].generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          moderationResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No valid JSON found in response');
        }
      } catch (parseError) {
        console.error('Error parsing moderation result:', parseError);
        throw parseError;
      }

      return moderationResult;

    } catch (error) {
      console.error(`Attempt ${attempts + 1} failed:`, error);
      
      if (attempts === MAX_RETRIES - 1) {
        throw new Error(`Failed to moderate text after ${MAX_RETRIES} attempts`);
      }
      
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      attempts++;
    }
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'moderateText') {
    moderateText(request.text)
      .then(result => {
        console.log('Moderation result:', result);
        sendResponse(result);
      })
      .catch(error => {
        console.error('Moderation error:', error);
        sendResponse({ error: error.message });
      });
    return true; // Required for async response
  }
});

// Handle config requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getModerationConfig') {
    sendResponse({
      apiKey: HF_API_KEY,
      apiEndpoint: HF_API_ENDPOINT
    });
    return true;
  }
});
