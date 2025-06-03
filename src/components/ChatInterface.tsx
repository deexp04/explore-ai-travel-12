
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  agentInfo?: {
    agentType: string;
    action: string;
  };
}

const ChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedHistory);
    } else {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: `Hi ${user?.name}! I'm your AI travel assistant powered by FetchAI's agent network. I can help you plan trips, find the best deals, and manage your budget. Try asking me: "Plan a 4-day Tokyo trip under $1200"`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user?.name]);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with agent coordination
    setTimeout(() => {
      const responses = getAIResponse(inputMessage);
      
      responses.forEach((response, index) => {
        setTimeout(() => {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + index).toString(),
            content: response.content,
            sender: 'assistant',
            timestamp: new Date(),
            agentInfo: response.agentInfo
          };
          setMessages(prev => [...prev, assistantMessage]);
          
          if (index === responses.length - 1) {
            setIsTyping(false);
          }
        }, index * 1500);
      });
    }, 1000);
  };

  const getAIResponse = (message: string): Array<{content: string, agentInfo?: {agentType: string, action: string}}> => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('tokyo') && lowerMessage.includes('trip')) {
      return [
        {
          content: "🔍 Connecting to travel agents...",
          agentInfo: { agentType: "Coordinator", action: "Discovering agents" }
        },
        {
          content: "✈️ **Flight Agent**: Found flights from $680-$950 roundtrip\n🏨 **Hotel Agent**: Budget hotels from $60/night in Shibuya\n🍱 **Food Agent**: Estimated $40/day for local dining",
          agentInfo: { agentType: "Travel Agents", action: "Price discovery" }
        },
        {
          content: "💰 **Finance Agent**: Current estimate: $1,180 total\n⚠️ **Alert**: Shinkansen to Mt. Fuji would add $120 - suggest local trains instead to stay under budget",
          agentInfo: { agentType: "Finance Agent", action: "Budget monitoring" }
        },
        {
          content: "📋 **Itinerary Created**:\n\n**Day 1**: Arrive Narita, Senso-ji Temple\n**Day 2**: Tsukiji Market, Tokyo National Museum\n**Day 3**: Shibuya Crossing, Meiji Shrine\n**Day 4**: Local train to Kamakura, departure\n\n💡 **AI Savings**: Using local trains saves $200 vs bullet train!",
          agentInfo: { agentType: "Itinerary Agent", action: "Trip planning" }
        }
      ];
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('money') || lowerMessage.includes('cost')) {
      return [
        {
          content: "💰 **Finance Agent Active**: I'm monitoring your spending in real-time. Current trip budget: $950 used of $1,200.\n\n**Smart suggestions**:\n• Book flights Tuesday/Wednesday for 15% savings\n• Choose hotels in Asakusa over Shibuya for $30/night less\n• Eat at convenience stores for lunch ($8 vs $25 restaurants)",
          agentInfo: { agentType: "Finance Agent", action: "Budget optimization" }
        }
      ];
    }
    
    if (lowerMessage.includes('flight') || lowerMessage.includes('hotel') || lowerMessage.includes('booking')) {
      return [
        {
          content: "🔍 **Booking Agents Activated**:\n\n✈️ **Flight Agent**: Scanning 15+ airlines\n🏨 **Hotel Agent**: Checking rates across 200+ properties\n🎯 **Deal Agent**: Found 3 limited-time offers\n\n⏰ **Alert**: Prices change in 2 hours - shall I hold these rates?",
          agentInfo: { agentType: "Booking Agents", action: "Rate comparison" }
        }
      ];
    }
    
    // Default responses
    const defaultResponses = [
      "I understand you'd like help with travel planning. Let me connect with my agent network to find the best options for you! Could you tell me more about your destination, dates, and budget?",
      "Great question! I'm coordinating with specialized agents to get you the most accurate and up-to-date information. What specific aspect of travel planning can I help you with?",
      "I'm here to help you plan amazing trips! My agent network includes flight specialists, hotel experts, local guides, and budget analysts. What's your next adventure?"
    ];
    
    return [{
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      agentInfo: { agentType: "AI Assistant", action: "General assistance" }
    }];
  };

  return (
    <div className="h-[calc(100vh-300px)] flex flex-col min-h-screen">
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="flex items-center space-x-2 min-w-0">
            <span className="truncate">SyncAgents</span>
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 mt-1 flex-shrink-0">
              Connected to FetchAI Network
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-4 min-h-0">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input */}
          <div className="flex-shrink-0">
            <ChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              placeholder="Ask me to plan your trip, find deals, or check your budget..."
              subtitle="Connected to FetchAI agents: Flight, Hotel, Finance, and Itinerary specialists"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
