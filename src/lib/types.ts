export type FlagType = 
  | 'neutral'              // Safe content
  | 'spam'                 // Promotional or scam content
  | 'hate_speech'          // Discriminatory content
  | 'threat'               // Threats of violence
  | 'personal_attack'      // Direct insults
  | 'harassment'           // Targeted negative behavior
  | 'explicit_content'     // Adult/inappropriate content
  | 'misinformation'       // False information
  | 'self_harm'           // Self-harm content
  | 'violence'            // Violent content
  | 'emotional_manipulation' // Manipulative content
  | 'profanity'           // Strong language 
  | 'hate_group'          // Extremist content
  | 'conspiracy'          // Conspiracy theories
  | 'impersonation'       // Identity fraud
  | 'trolling'            // Intentional provocation
  | 'doxxing'             // Personal info sharing
  | 'copyright'           // Copyright violation
  | 'phishing'            // Scam attempts
  | 'extremism';          // Extreme ideologies

export interface Flag {
  type: FlagType;
  reason: string;
  confidence: number;
  context?: string;
  severity?: 'low' | 'medium' | 'high';
  recommendation?: string;
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
  };
}