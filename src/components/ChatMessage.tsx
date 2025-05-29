
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
    agentInfo?: {
      agentType: string;
      action: string;
    };
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className={message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}>
            {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
        
        <div className={`px-3 py-2 rounded-lg break-words min-w-0 ${
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
          <div className="whitespace-pre-wrap break-words overflow-wrap-anywhere">{message.content}</div>
          <div className="text-xs mt-1 opacity-75">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
