
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  placeholder?: string;
  subtitle?: string;
}

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isTyping, 
  placeholder = "Type your message...",
  subtitle
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex space-x-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 min-w-0"
        />
        <Button 
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="px-3 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 mt-2 break-words">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
