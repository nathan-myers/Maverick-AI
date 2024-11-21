import { analyzeWithGemma } from './gemmaService';
import type { ModerationResult } from './types';

export async function moderateText(text: string): Promise<ModerationResult> {
  try {
    const gemmaAnalysis = await analyzeWithGemma(text);
    
    return {
      text,
      flags: gemmaAnalysis.flags,
      overallToxicity: gemmaAnalysis.overallToxicity,
      summary: gemmaAnalysis.summary
    };
  } catch (error) {
    console.error('Moderation failed:', error);
    throw error;
  }
}