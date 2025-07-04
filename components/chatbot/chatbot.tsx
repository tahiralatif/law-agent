'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

type ChatMessage = {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Assalam-o-Alaikum! I am your AI legal assistant specialized in Pakistani law. How can I help you today? You can ask me about legal procedures, case research, or document drafting.',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What is the procedure for filing a civil suit in Pakistan?',
    'How to draft a legal notice under Pakistani law?',
    'Property registration process in Pakistan',
    'Family law basics in Pakistan',
    'Criminal procedure code overview',
    'Contract law essentials'
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: data.response || 'I apologize, but I encountered an issue. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-110"
        size="icon"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-primary/20">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>Legal AI Assistant</span>
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)} 
          className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4 bg-gray-50/50">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />}
                  {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl rounded-bl-md p-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="space-y-3 border-t pt-3">
            <p className="text-xs text-gray-600 font-medium">Quick questions to get started:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.slice(0, 4).map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs p-2 h-auto text-left justify-start transition-all duration-200 border-primary/30 hover:border-primary"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2 border-t pt-3">
          <Input
            placeholder="Ask about Pakistani law..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border-primary/30 focus:border-primary"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}