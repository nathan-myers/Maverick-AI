import { HfInference } from '@huggingface/inference';

// Initialize the Hugging Face client
const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

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

export async function getHuggingFaceClassification(text: string): Promise<HuggingFaceResult | null> {
  try {
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