export interface Message {
  id: string;
  role: 'driver' | 'passenger';
  content: string;
  timestamp: Date;
  moderated?: boolean;
  flags?: Flag[];
  toxicity?: number;
}

export interface Flag {
  type: string;
  reason: string;
  confidence: number;
  severity?: 'low' | 'medium' | 'high';
  context?: string;
}

export interface ModerationResult {
  text: string;
  flags: Flag[];
  overallToxicity: number;
  summary: {
    spamScore: number;
    toxicityScore: number;
    profanityCount: number;
    emotionalIntensity: number;
    threatLevel: number;
    manipulationScore: number;
    credibilityScore: number;
    contextualRisk?: number;
  };
}