import type { Message } from './types';

export const TRIP_STAGE_RULES = {
  after_dropoff: {
    personal_request_threshold: 0.5,
    severity_multiplier: 1.5,
    high_risk_types: ['personal_attack', 'harassment', 'explicit_content']
  },
  during_ride: {
    threat_threshold: 0.3,
    severity_multiplier: 2.0,
    high_risk_types: ['threat', 'violence', 'harassment']
  },
  before_pickup: {
    scam_threshold: 0.4,
    severity_multiplier: 1.2,
    high_risk_types: ['phishing', 'scam', 'misinformation']
  }
};

export const RELATIONSHIP_RULES = {
  driver_to_passenger: {
    personal_boundary_threshold: 0.4,
    power_dynamic_multiplier: 1.5,
    restricted_topics: ['personal_life', 'appearance', 'contact_info']
  },
  passenger_to_driver: {
    personal_boundary_threshold: 0.6,
    power_dynamic_multiplier: 1.2,
    restricted_topics: ['personal_life', 'private_info']
  }
};

export function analyzeMessageSequence(messages: Message[]): {
  escalation_score: number;
  pattern_detected: string[];
} {
  let escalation_score = 0;
  const pattern_detected: string[] = [];

  for (let i = 1; i < messages.length; i++) {
    const prevMessage = messages[i - 1];
    const currentMessage = messages[i];

    // Check for escalating toxicity
    if (currentMessage.toxicity && prevMessage.toxicity) {
      if (currentMessage.toxicity > prevMessage.toxicity) {
        escalation_score += 0.2;
        pattern_detected.push('increasing_toxicity');
      }
    }

    // Check for repeated flags
    if (currentMessage.flags && prevMessage.flags) {
      const repeatedFlags = currentMessage.flags.filter(flag =>
        prevMessage.flags?.some(prevFlag => prevFlag.type === flag.type)
      );
      if (repeatedFlags.length > 0) {
        escalation_score += 0.3;
        pattern_detected.push('repeated_violations');
      }
    }
  }

  return {
    escalation_score: Math.min(1, escalation_score),
    pattern_detected: [...new Set(pattern_detected)]
  };
} 