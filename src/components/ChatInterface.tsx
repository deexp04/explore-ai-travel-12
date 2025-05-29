
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
{/*             <MessageSquare className="w-5 h-5 text-blue-600" /> */}
            <span>SyncAgents</span>
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 mt-1">
              Connected to FetchAI Network
            </Badge>
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
                <div className={`flex max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
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
                placeholder="Ask me to plan your trip, find deals, or check your budget..."
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
              Connected to FetchAI agents: Flight, Hotel, Finance, and Itinerary specialists
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
