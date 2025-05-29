
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const GuestChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message for guest users
    const welcomeMessage: ChatMessage = {
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

    const userMessage: ChatMessage = {
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
      
      const assistantMessage: ChatMessage = {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-96 flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Try AI Travel Assistant</span>
              <Badge variant="outline" className="ml-2 text-blue-600 border-blue-200">
                Guest Mode
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login for Full Features
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.agentInfo && (
                      <div className="text-xs opacity-75 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {message.agentInfo.agentType}: {message.agentInfo.action}
                        </Badge>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 opacity-75`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-600 text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about travel destinations, tips, or general advice..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              💡 Sign up for personalized features: trip history, budget tracking, and agent coordination
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestChatInterface;
