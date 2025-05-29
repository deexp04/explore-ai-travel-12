
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

interface ChatMessageType {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  agentInfo?: {
    agentType: string;
    action: string;
  };
}

const GuestChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message for guest users
    const welcomeMessage: ChatMessageType = {
      id: '1',
      content: `Welcome to TravelAI! I'm your AI travel assistant. I can help you with general travel suggestions and planning ideas. For personalized recommendations, trip history, and budget tracking, please sign up or log in. Try asking me: "What are the best places to visit in Japan?"`,
      sender: 'assistant',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response for guest users
    setTimeout(() => {
      const response = getGuestAIResponse(inputMessage);
      
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'assistant',
        timestamp: new Date(),
        agentInfo: response.agentInfo
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getGuestAIResponse = (message: string): {content: string, agentInfo?: {agentType: string, action: string}} => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('japan') || lowerMessage.includes('tokyo')) {
      return {
        content: "🗾 **Japan Travel Suggestions**:\n\n• **Best time to visit**: Spring (cherry blossoms) or Fall (autumn colors)\n• **Must-see cities**: Tokyo, Kyoto, Osaka, Hiroshima\n• **Budget estimate**: $100-200/day for mid-range travel\n• **Cultural tips**: Bow when greeting, remove shoes indoors\n\n💡 **Sign up for personalized itineraries and budget tracking!**",
        agentInfo: { agentType: "Travel Guide", action: "General suggestions" }
      };
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
      return {
        content: "💰 **General Budget Tips**:\n\n• **Flights**: Book 2-3 months in advance for best prices\n• **Accommodation**: Consider hostels, Airbnb, or capsule hotels\n• **Food**: Mix restaurant dining with local markets\n• **Transport**: Look into rail passes for multiple cities\n\n🔒 **For real-time budget tracking and personalized cost analysis, please log in!**",
        agentInfo: { agentType: "Budget Advisor", action: "General guidance" }
      };
    }
    
    if (lowerMessage.includes('europe') || lowerMessage.includes('paris') || lowerMessage.includes('london')) {
      return {
        content: "🇪🇺 **Europe Travel Tips**:\n\n• **Best value**: Eastern Europe (Prague, Budapest, Krakow)\n• **Transportation**: Eurail pass for multiple countries\n• **Timing**: Shoulder seasons (April-May, September-October)\n• **Must-sees**: Paris, Rome, Barcelona, Amsterdam\n\n✈️ **Create an account for detailed itineraries and flight tracking!**",
        agentInfo: { agentType: "Travel Guide", action: "Regional advice" }
      };
    }
    
    const defaultResponses = [
      "I can help with general travel advice! For personalized recommendations, detailed planning, and budget tracking, consider creating an account. What destination are you curious about?",
      "Great question! I'd love to help you plan better. For the full AI agent experience with real-time booking and budget monitoring, please sign up. What can I help you explore today?",
      "I'm here to provide travel inspiration! For detailed itineraries and personalized agent coordination, log in to unlock all features. Where would you like to travel?"
    ];
    
    return {
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      agentInfo: { agentType: "AI Assistant", action: "General assistance" }
    };
  };

  return (
    <div className="h-96 flex flex-col min-w-0">
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="truncate">SyncAgents</span>
              <Badge variant="outline" className="ml-2 text-blue-600 border-blue-200 mt-1 flex-shrink-0">
                Guest Mode
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:bg-blue-50 flex-shrink-0"
            >
              <LogIn className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Login for Full Features</span>
              <span className="sm:hidden">Login</span>
            </Button>
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
              placeholder="Ask about travel destinations, tips, or general advice..."
              subtitle="💡 Sign up for personalized features: trip history, budget tracking, and agent coordination"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestChatInterface;
