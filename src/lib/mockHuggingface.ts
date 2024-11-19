// src/lib/mockHuggingface.ts
export const mockHuggingFaceClassification = async (text: string) => {
  // Analyze text for emotional content with more specific patterns
  const containsJoy = /(happy|joy|wonderful|great|excellent|amazing|excited|delighted)/gi.test(text);
  const containsAnger = /(angry|mad|furious|rage|hate|annoyed|irritated)/gi.test(text);
  const containsSadness = /(sad|depressed|unhappy|miserable|crying|disappointed)/gi.test(text);
  const containsFear = /(scared|afraid|terrified|fearful|anxious|worried|nervous)/gi.test(text);
  const containsSurprise = /(wow|omg|unexpected|surprised|shocking|amazed|astonished)/gi.test(text);

  // Calculate emotion scores with more nuanced scoring
  const emotions = [
    { label: 'joy', score: containsJoy ? 0.9 : 0.1 },
    { label: 'anger', score: containsAnger ? 0.85 : 0.15 },
    { label: 'sadness', score: containsSadness ? 0.8 : 0.2 },
    { label: 'fear', score: containsFear ? 0.75 : 0.1 },
    { label: 'surprise', score: containsSurprise ? 0.7 : 0.1 },
    { label: 'neutral', score: (!containsJoy && !containsAnger && !containsSadness && !containsFear && !containsSurprise) ? 0.9 : 0.1 }
  ];

  // Return both toxicity and emotion results
  return {
    toxicity: [
      { label: 'toxic', score: containsAnger ? 0.8 : 0.2 },
      { label: 'severe_toxic', score: containsAnger ? 0.7 : 0.1 },
      { label: 'obscene', score: 0.1 },
      { label: 'threat', score: containsFear ? 0.8 : 0.1 },
      { label: 'insult', score: containsAnger ? 0.75 : 0.15 },
      { label: 'identity_attack', score: 0.1 }
    ],
    emotion: emotions
  };
};