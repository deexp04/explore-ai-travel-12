
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  LogOut, 
  Sparkles, 
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Share,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  type: 'user' | 'assistant' | 'agent';
  content: string;
  timestamp: string;
  agentName?: string;
}

const ChatAssistant = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      type: 'assistant',
      content: `Welcome to TravelBud! Is there anything I can help you with?`,
      timestamp: new Date().toLocaleTimeString()
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
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {            
        const response = await fetch('http://127.0.0.1:8000/send-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputMessage }),
        });

        const data = await response.json()

        if (data.status === 200){
          setMessages(prev => [...prev, {
            type: 'agent',
            agentName: data.name || 'Agent',
            content: data.content,
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
        else{
          setMessages(prev => [...prev, {
            type: 'agent',
            agentName: data.name || 'Agent',
            content: `Error receiving response from agent`,
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
        setIsTyping(false);
                    
    } catch (error) {
          setMessages(prev => [...prev, {
            type: 'agent',
            agentName: 'Agent',
            content: `Connection error: ${String(error)}`,
            timestamp: new Date().toLocaleTimeString()
          }]);
    }

    // Simulate AI response
    // setTimeout(() => {
    //   const response = getTravelResponse(inputMessage);
    //   setMessages(prev => [...prev, {
    //     type: 'agent',
    //     agentName: response.name || 'Agent',
    //     content: response.content,
    //     timestamp: new Date().toLocaleTimeString()
    //   }]);
    //   setIsTyping(false);
    // }, 1500);

  };

    const getTravelResponse = (message: string): {content: string, name?: string} => {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('paris') || lowerMessage.includes('france')) {
        return {
          content: "🗼 Paris is an amazing destination! I'd recommend visiting the Eiffel Tower at sunset, exploring the Louvre Museum, and taking a Seine river cruise. The best time to visit is spring (April-June) or fall (September-November). Would you like specific recommendations for hotels or restaurants?",
          name: "Travel Guide"
        };
      }
      
      if (lowerMessage.includes('budget') || lowerMessage.includes('cheap')) {
        return {
          content: "💰 I can help you plan a budget-friendly trip! Consider traveling during off-season, booking accommodations in advance, using public transportation, and eating at local markets. What's your approximate budget and destination?",
          name: "Budget Advisor"
        };
      }
      
      if (lowerMessage.includes('tokyo') || lowerMessage.includes('japan')) {
        return {
          content: "🏯 Tokyo is incredible! Must-visit spots include Shibuya Crossing, Senso-ji Temple, Tsukiji Outer Market, and Mount Fuji day trip. Try authentic ramen, sushi, and visit during cherry blossom season (March-May) for the best experience. Need help with specific districts or activities?",
          name: "Japan Expert"
        };
      }
      
      return {
        content: "I'd be happy to help you plan your travel adventure! Whether you need destination recommendations, budget planning, itinerary suggestions, or local tips, I'm here to assist. What kind of trip are you thinking about?",
        name: "Travel Assistant"
      };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                TravelBud
              </h1>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Button 
                onClick={() => navigate('/chat')} 
                className={`text-white text-base px-4 py-2 relative ${
                  isActive('/chat') ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white' : ''
                }`}
                variant="ghost"
                size="sm"
              >
                <span className="hidden sm:inline">Chat Assistant</span>
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')} 
                className={`text-white text-base px-4 py-2 relative ${
                  isActive('/dashboard') ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white' : ''
                }`}
                variant="ghost"
                size="sm"
              >
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              <Button 
                onClick={logout} 
                className="text-white text-base px-4 py-2 hover:bg-white"
                variant="ghost"
                size="sm"
              >
                <LogOut className="h-4 w-4" /> 
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full mt-2">
        <ScrollArea className="flex-1 px-6 py-8">
          <div className="space-y-8">
            {messages.map((message, index) => (
              <div key={index} className="space-y-4">
                {(message.type === 'assistant' || message.type === 'agent') && (
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-4 bg-gray-800 rounded-2xl px-4 py-3">
                      {message.agentName && (
                        <div className="text-sm text-gray-400 font-medium">
                          {message.agentName}
                        </div>
                      )}
                      <div className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="flex items-start space-x-4 justify-end">
                    <div className="bg-gray-800 rounded-2xl px-4 py-3 max-w-2xl">
                      <div className="text-gray-100 leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-gray-600 text-white">
                        <Sparkles className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6">
          <Card className="bg-gray-900 border-gray-700 rounded-2xl overflow-hidden">
            <div className="flex items-center p-4 space-x-4">
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask TravelBud"
                  className="border-0 bg-transparent text-white placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
          <p className="text-center text-gray-500 text-sm mt-3">
            TravelBud - Your smart travel companion
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
