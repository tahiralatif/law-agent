'use client';

<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
=======
import { useEffect, useRef, useState } from 'react';
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
<<<<<<< HEAD
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
=======
import { MessageCircle, X, Send, Bot, User, Copy, Check } from 'lucide-react';
import { askGemini } from '@/lib/askGemini';

function formatTimestamp(date: Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)

type ChatMessage = {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
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
=======
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)

  const quickQuestions = [
    'What is the procedure for filing a civil suit in Pakistan?',
    'How to draft a legal notice under Pakistani law?',
    'Property registration process in Pakistan',
    'Family law basics in Pakistan',
    'Criminal procedure code overview',
    'Contract law essentials'
  ];

<<<<<<< HEAD
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

=======
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

<<<<<<< HEAD
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
=======
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const botReply = await askGemini(generateMemoryString([...messages, userMessage]));

    const botMessage: ChatMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: botReply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

<<<<<<< HEAD
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
=======
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const generateMemoryString = (msgs: ChatMessage[]) => {
    return msgs.map((m) => `${m.type === 'user' ? 'User' : 'Bot'}: ${m.content}`).join('\n');
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
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
<<<<<<< HEAD
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-primary/20">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
=======
    <Card className="fixed bottom-6 right-6 w-[26rem] h-[36rem] shadow-xl z-50 flex flex-col rounded-3xl border border-gray-200">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 px-4 pt-4">
        <CardTitle className="flex items-center space-x-2 text-base font-medium">
          <Bot className="h-5 w-5 text-primary" />
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
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

<<<<<<< HEAD
      <CardContent className="flex-1 flex flex-col p-4 space-y-4 bg-gray-50/50">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
=======
      <CardContent className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        <div className="flex flex-col space-y-3">
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
<<<<<<< HEAD
                className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
=======
                className={`relative max-w-[80%] px-4 py-2 rounded-2xl shadow-md group ${
                  message.type === 'user' ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-900'
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />}
                  {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
<<<<<<< HEAD
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
=======
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400">
                  <span>{formatTimestamp(message.timestamp)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-muted-foreground hover:text-primary"
                    onClick={() => handleCopy(message.id, message.content)}
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
                </div>
              </div>
            </div>
          ))}
<<<<<<< HEAD
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl rounded-bl-md p-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
=======

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-600 text-sm rounded-2xl px-4 py-2 animate-pulse">
                Typing...
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

<<<<<<< HEAD
        {messages.length === 1 && (
          <div className="space-y-3 border-t pt-3">
            <p className="text-xs text-gray-600 font-medium">Quick questions to get started:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.slice(0, 4).map((question, index) => (
=======
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Quick questions:</p>
            <div className="flex flex-wrap gap-1">
              {quickQuestions.map((question, index) => (
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
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

<<<<<<< HEAD
        <div className="flex space-x-2 border-t pt-3">
=======
        <div className="flex items-center space-x-2 mt-2 border-t pt-2">
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
          <Input
            placeholder="Ask about Pakistani law..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
<<<<<<< HEAD
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
=======
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
>>>>>>> 805c048 (Fix: resolve build errors, remove duplicate cases variable, add placeholder for empty login route)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}