import { analyzeWithMistral } from './mistralService';
import type { ModerationResult } from './types';

export async function moderateText(text: string): Promise<ModerationResult> {
  try {
    const mistralAnalysis = await analyzeWithMistral(text);
    
    return {
      text,
      flags: mistralAnalysis.flags,
      overallToxicity: mistralAnalysis.overallToxicity,
      summary: mistralAnalysis.summary
    };
  } catch (error) {
    console.error('Moderation failed:', error);
    throw error;
  }
}