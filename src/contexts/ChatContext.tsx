import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Message } from '../lib/types';

interface ChatContextType {
  activeChats: number;
  flaggedMessages: number;
  activeUsers: number;
  messages: Message[];
  flaggedMessagesList: Message[];
  addMessage: (message: Message) => void;
  updateMetrics: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function isInappropriateMessage(message: Message): boolean {
  // Check if message has flags and they are not neutral
  const hasNonNeutralFlags = message.flags && message.flags.length > 0 && 
    message.flags.some(flag => flag.type !== 'neutral');
  
  // Check if message has high toxicity
  const hasHighToxicity = message.toxicity && message.toxicity > 0.5;

  return Boolean(hasNonNeutralFlags || hasHighToxicity);
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChats, setActiveChats] = useState(0);
  const [flaggedMessages, setFlaggedMessages] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [flaggedMessagesList, setFlaggedMessagesList] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // Add to flagged messages if it's inappropriate and not neutral
    if (isInappropriateMessage(message)) {
      setFlaggedMessagesList(prev => [message, ...prev].slice(0, 5)); // Keep only last 5 flagged messages
    }
  };

  const updateMetrics = () => {
    // Count unique users (both drivers and passengers)
    const uniqueUsers = new Set(messages.map(msg => msg.role)).size;
    setActiveUsers(uniqueUsers);

    // Count flagged messages (excluding neutral ones)
    const flaggedCount = messages.filter(isInappropriateMessage).length;
    setFlaggedMessages(flaggedCount);

    // Count active chats (each unique pair of driver/passenger is a chat)
    const chatPairs = new Set();
    messages.forEach(msg => {
      if (msg.role === 'driver') {
        chatPairs.add(`driver-${msg.id}`);
      } else if (msg.role === 'passenger') {
        chatPairs.add(`passenger-${msg.id}`);
      }
    });
    setActiveChats(Math.ceil(chatPairs.size / 2)); // Divide by 2 since each chat has a driver and passenger
  };

  // Update metrics whenever messages change
  useEffect(() => {
    updateMetrics();
  }, [messages]);

  return (
    <ChatContext.Provider value={{
      activeChats,
      flaggedMessages,
      activeUsers,
      messages,
      flaggedMessagesList,
      addMessage,
      updateMetrics
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 