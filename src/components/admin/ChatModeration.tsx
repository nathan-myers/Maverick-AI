import { useState, useEffect } from 'react';
import { moderateText } from '../../lib/moderation';
import { MessageSquare, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Flag {
  type: string;
  reason: string;
  confidence: number;
  severity?: 'low' | 'medium' | 'high';
  context?: string;
}

interface Message {
  id: string;
  role: 'driver' | 'passenger';
  content: string;
  timestamp: Date;
  moderated?: boolean;
  flags?: Flag[];
  toxicity?: number;
}

export function ChatModeration() {
  const [activeChats, setActiveChats] = useState<{
    [key: string]: {
      driverId: string;
      passengerId: string;
      messages: Message[];
      status: 'active' | 'flagged' | 'completed';
    }
  }>({});

  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Simulate incoming messages
  useEffect(() => {
    const mockConversation = async () => {
      const chatId = 'chat_1';
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        role: Math.random() > 0.5 ? 'driver' : 'passenger',
        content: "Hey, I'll be there in 5 minutes",
        timestamp: new Date()
      };

      // Moderate the message
      try {
        const moderationResult = await moderateText(newMessage.content);
        newMessage.flags = moderationResult.flags;
        newMessage.toxicity = moderationResult.overallToxicity;
        newMessage.moderated = true;
      } catch (error) {
        console.error('Moderation failed:', error);
      }

      setActiveChats(prev => ({
        ...prev,
        [chatId]: {
          driverId: 'D-1234',
          passengerId: 'P-5678',
          status: newMessage.flags?.length ? 'flagged' : 'active',
          messages: [...(prev[chatId]?.messages || []), newMessage]
        }
      }));
    };

    const interval = setInterval(mockConversation, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Chat List */}
      <div className="col-span-4 bg-white/5 rounded-xl border border-white/10 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Active Chats</h2>
        <div className="space-y-2">
          {Object.entries(activeChats).map(([chatId, chat]) => (
            <button
              key={chatId}
              onClick={() => setSelectedChat(chatId)}
              className={`w-full p-4 rounded-lg transition-colors ${
                selectedChat === chatId 
                  ? 'bg-purple-500/20 border border-purple-500/20' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  Driver #{chat.driverId} & Passenger #{chat.passengerId}
                </span>
                {chat.status === 'flagged' && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="text-sm text-neutral-400">
                {chat.messages.length} messages
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="col-span-8 bg-white/5 rounded-xl border border-white/10 p-4">
        {selectedChat ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Chat #{selectedChat}
              </h2>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-neutral-400">
                  Live Moderation Active
                </span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4">
              {activeChats[selectedChat]?.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    message.role === 'driver' 
                      ? 'bg-blue-500/10 border border-blue-500/20 ml-auto' 
                      : 'bg-purple-500/10 border border-purple-500/20'
                  } max-w-[80%]`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {message.role === 'driver' ? 'Driver' : 'Passenger'}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mb-2">{message.content}</p>
                  {(message.flags ?? []).length > 0 && (
                    <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Content flagged</span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        {(message.flags ?? []).map((flag, index) => (
                          <div key={index}>
                            {flag.type}: {flag.reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-neutral-400">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mb-4 mx-auto opacity-50" />
              <p>Select a chat to view the conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 