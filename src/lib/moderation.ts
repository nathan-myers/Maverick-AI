import { analyzeWithMistral } from './mistralService';
import type { ModerationResult, Message, Flag } from './types';
import { TRIP_STAGE_RULES, RELATIONSHIP_RULES } from './contextRules';

export interface ModerationContext {
  tripStatus: 'before_pickup' | 'during_ride' | 'after_dropoff';
  location?: string;
  rideDetails?: {
    pickupLocation?: string;
    dropoffLocation?: string;
    estimatedDuration?: number;
    currentStatus?: string;
  };
  previousMessages?: Message[];
  isDefensiveResponse?: boolean;
  previousMessage?: string;
  role?: 'driver' | 'passenger';
}

export async function moderateText(text: string, context?: ModerationContext): Promise<ModerationResult> {
  try {
    const { isDefensive, previousFlags, previousMessage, role } = await analyzeResponseContext(text, context);
    const mistralAnalysis = await analyzeWithMistral(text, {
      tripStatus: context?.tripStatus || 'during_ride',
      ...context,
      isDefensiveResponse: isDefensive,
      previousMessage,
      role
    });
    
    const modifiedFlags = mistralAnalysis.flags.map((flag: Flag) => {
      // Update flag reason to correctly reflect trip context
      if (flag.reason && context?.tripStatus) {
        const contextPhrase = getContextPhrase(context.tripStatus);
        // Replace any mentions of trip context with the correct one
        flag.reason = flag.reason
          .replace(/during a ride/g, contextPhrase)
          .replace(/during the ride/g, contextPhrase)
          .replace(/in a ride/g, contextPhrase)
          .replace(/in the ride/g, contextPhrase);
      }
      
      // For defensive responses from passengers, remove harassment flags and mark as defensive
      if (isDefensive && role === 'passenger') {
        if (['harassment', 'personal_attack'].includes(flag.type)) {
          return {
            type: 'defensive_response',
            reason: 'Passenger expressing discomfort with inappropriate behavior',
            confidence: 0.95,
            severity: 'low',
            context: `In response to previous harassment: ${previousMessage}`
          };
        }
      }
      
      // For driver messages, check against relationship rules
      if (role === 'driver') {
        const relationshipRules = RELATIONSHIP_RULES.driver_to_passenger;
        if (relationshipRules.restricted_topics.some(topic => text.toLowerCase().includes(topic))) {
          flag.confidence *= relationshipRules.power_dynamic_multiplier;
          flag.severity = 'high';
          // Increase severity for repeated violations
          if (previousFlags.includes(flag.type)) {
            flag.severity = 'high';
            flag.confidence *= 1.2;
            flag.reason = `Repeated ${flag.type}: ${flag.reason}`;
          }
        }
      }
      
      return flag;
    }).filter(Boolean);

    return {
      text,
      flags: modifiedFlags,
      overallToxicity: isDefensive ? 0.1 : mistralAnalysis.overallToxicity,
      summary: {
        ...mistralAnalysis.summary,
        contextualRisk: calculateContextualRisk(modifiedFlags, context)
      }
    };
  } catch (error) {
    console.error('Moderation failed:', error);
    throw error;
  }
}

function getContextPhrase(tripStatus: 'before_pickup' | 'during_ride' | 'after_dropoff'): string {
  switch (tripStatus) {
    case 'before_pickup':
      return 'during the pickup stage';
    case 'during_ride':
      return 'during a ride';
    case 'after_dropoff':
      return 'after dropoff';
    default:
      return 'during the interaction';
  }
}

async function analyzeResponseContext(text: string, context?: ModerationContext): Promise<{isDefensive: boolean; previousFlags: string[]; previousMessage?: string; role?: 'driver' | 'passenger'}> {
  if (!context?.previousMessages?.length) {
    return { isDefensive: false, previousFlags: [], previousMessage: undefined };
  }
  
  const lastMessage = context.previousMessages[context.previousMessages.length - 1];
  const previousFlags = lastMessage.flags?.map(f => f.type) || [];
  const currentRole = context.previousMessages[context.previousMessages.length - 1]?.role;
  
  // Check if this is a response to a flagged message
  if (lastMessage.flags?.some(flag => 
    ['harassment', 'personal_attack', 'explicit_content'].includes(flag.type)
  )) {
    const defensivePatterns = [
      'uncomfortable', 'stop', 'inappropriate', 
      'please', 'don\'t', 'not okay',
      'no', 'unwanted', 'offensive',
      'makes me', 'this makes me',
      'really uncomfortable', 'that\'s really'
    ];
    
    const isDefensive = defensivePatterns.some(pattern => 
      text.toLowerCase().includes(pattern)
    );

    return { 
      isDefensive, 
      previousFlags,
      previousMessage: lastMessage.content,
      role: currentRole
    };
  }
  
  return { isDefensive: false, previousFlags: [], previousMessage: undefined, role: currentRole };
}

function calculateContextualRisk(flags: Flag[], context?: ModerationContext): number {
  let riskScore = 0;
  
  // Base risk from flags
  flags.forEach(flag => {
    switch (flag.severity) {
      case 'high': riskScore += 0.3; break;
      case 'medium': riskScore += 0.2; break;
      case 'low': riskScore += 0.1; break;
    }
  });

  // Apply trip stage specific rules
  if (context?.tripStatus) {
    const tripRules = TRIP_STAGE_RULES[context.tripStatus];
    if (flags.some(flag => tripRules.high_risk_types.includes(flag.type))) {
      riskScore *= tripRules.severity_multiplier;
    }
  }

  return Math.min(1, riskScore);
}