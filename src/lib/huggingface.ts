import { HfInference } from '@huggingface/inference';

// Initialize the Hugging Face client with environment-based selection
const getHfClient = () => {
  if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_HUGGINGFACE_API_KEY) {
    return null; // Will trigger mock service
  }
  return new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);
};

const hf = getHfClient();

export interface TextClassificationOutput {
  [index: number]: {
    label: string;
    score: number;
  };
}

export interface HuggingFaceResult {
  toxicity: TextClassificationOutput;
  emotion: TextClassificationOutput;
}

// Mock service for development
const mockClassification = async (): Promise<TextClassificationOutput> => ({
  0: { label: 'neutral', score: 0.8 },
  1: { label: 'toxic', score: 0.2 }
});

export async function getHuggingFaceClassification(text: string): Promise<HuggingFaceResult | null> {
  try {
    // Use mock service if no client (development without API key)
    if (!hf) {
      console.log('Using mock HuggingFace service');
      return {
        toxicity: await mockClassification(),
        emotion: await mockClassification()
      };
    }

    // Use real service when API key is available
    const toxicityResult = await hf.textClassification({
      model: 'unitary/multilingual-toxic-comment-classifier',
      inputs: text,
    }) as unknown as TextClassificationOutput;

    const emotionResult = await hf.textClassification({
      model: 'SamLowe/roberta-base-go_emotions',
      inputs: text,
    }) as unknown as TextClassificationOutput;

    return {
      toxicity: toxicityResult,
      emotion: emotionResult
    };
  } catch (error) {
    console.error('HuggingFace API error:', error);
    return null;
  }
} 