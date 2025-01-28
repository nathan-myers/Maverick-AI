import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Shield, User, Car } from 'lucide-react';
import { moderateText } from '../../lib/moderation';
import { Flag } from '../../lib/types';

interface Message {
  id: string;
  role: 'driver' | 'passenger';
  content: string;
  timestamp: Date;
  context?: {
    tripStatus: 'before_pickup' | 'during_ride' | 'after_dropoff';
    location?: string;
    rideDetails?: {
      pickupLocation?: string;
      dropoffLocation?: string;
      estimatedDuration?: number;
      currentStatus?: string;
    };
    previousMessages?: Message[];
  };
  moderation?: {
    flags: Flag[];
    toxicity: number;
  };
}

export function ChatSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeRole, setActiveRole] = useState<'driver' | 'passenger'>('driver');
  const [isModerating, setIsModerating] = useState(false);
  const [tripContext, setTripContext] = useState({
    tripStatus: 'before_pickup' as 'before_pickup' | 'during_ride' | 'after_dropoff',
    pickupLocation: '',
    dropoffLocation: '',
    estimatedDuration: 0,
    currentStatus: 'Waiting for pickup'
  });

  const updateTripStatus = (status: 'before_pickup' | 'during_ride' | 'after_dropoff') => {
    setTripContext(prev => ({
      ...prev,
      tripStatus: status,
      currentStatus: status === 'during_ride' ? 'En route' : 
                    status === 'after_dropoff' ? 'Completed' : 'Waiting for pickup'
    }));
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isModerating) return;
    
    const messageId = `msg_${Date.now()}`;
    setIsModerating(true);

    const recentMessages = messages.slice(-5);

    const message: Message = {
      id: messageId,
      role: activeRole,
      content: newMessage,
      timestamp: new Date(),
      context: {
        tripStatus: tripContext.tripStatus,
        location: 'Current location',
        rideDetails: {
          pickupLocation: tripContext.pickupLocation,
          dropoffLocation: tripContext.dropoffLocation,
          estimatedDuration: tripContext.estimatedDuration,
          currentStatus: tripContext.currentStatus
        },
        previousMessages: recentMessages
      }
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    try {
      const moderationResult = await moderateText(newMessage, message.context);

      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? {
              ...msg,
              moderation: {
                flags: moderationResult.flags,
                toxicity: moderationResult.overallToxicity
              }
            }
          : msg
      ));
    } catch (error) {
      console.error('Moderation failed:', error);
    } finally {
      setIsModerating(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Chat Simulator</h2>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="text-sm text-neutral-400">Live Moderation</span>
        </div>
      </div>

      {/* Add Trip Context Controls */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg">
        <h3 className="text-sm font-medium mb-3">Trip Context</h3>
        <div className="flex gap-4 mb-3">
          <button
            onClick={() => updateTripStatus('before_pickup')}
            className={`px-3 py-1 rounded text-sm ${
              tripContext.tripStatus === 'before_pickup' ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-400'
            }`}
          >
            Before Pickup
          </button>
          <button
            onClick={() => updateTripStatus('during_ride')}
            className={`px-3 py-1 rounded text-sm ${
              tripContext.tripStatus === 'during_ride' ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-400'
            }`}
          >
            During Ride
          </button>
          <button
            onClick={() => updateTripStatus('after_dropoff')}
            className={`px-3 py-1 rounded text-sm ${
              tripContext.tripStatus === 'after_dropoff' ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-400'
            }`}
          >
            After Dropoff
          </button>
        </div>
        <div className="text-sm text-neutral-400">
          Current Status: {tripContext.currentStatus}
        </div>
      </div>

      {/* Role Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveRole('driver')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeRole === 'driver'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
              : 'text-neutral-400 hover:bg-white/5'
          }`}
        >
          <Car className="w-4 h-4" />
          Driver
        </button>
        <button
          onClick={() => setActiveRole('passenger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeRole === 'passenger'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
              : 'text-neutral-400 hover:bg-white/5'
          }`}
        >
          <User className="w-4 h-4" />
          Passenger
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-[400px] overflow-y-auto mb-6 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${message.role === 'driver' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'driver'
                  ? 'bg-blue-500/10 border border-blue-500/20'
                  : 'bg-purple-500/10 border border-purple-500/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {message.role === 'driver' ? (
                  <Car className="w-4 h-4 text-blue-400" />
                ) : (
                  <User className="w-4 h-4 text-purple-400" />
                )}
                <span className="text-sm font-medium">
                  {message.role === 'driver' ? 'Driver' : 'Passenger'}
                </span>
                <span className="text-xs text-neutral-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
              
              {/* Moderation Results */}
              {message.moderation && message.moderation.flags.length > 0 && (
                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>Content flagged</span>
                  </div>
                  <div className="mt-1 text-xs text-neutral-400">
                    {message.moderation.flags.map((flag, index) => (
                      <div key={index}>
                        {flag.type}: {flag.reason}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Type a message as ${activeRole}...`}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isModerating}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
} 