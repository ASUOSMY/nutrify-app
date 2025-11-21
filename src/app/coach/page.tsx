'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import BottomNav from '@/components/bottom-nav';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! 👋 Sou seu Coach IA. Estou aqui para te ajudar com dúvidas sobre nutrição, treinos e motivação. Como posso te ajudar hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente!'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Como perder gordura?',
    'Melhor horário para treinar?',
    'Dicas de alimentação',
    'Como ganhar massa muscular?'
  ];

  return (
    <div className="min-h-screen bg-[#121212] pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-purple-500/30 p-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Coach IA</h1>
            <p className="text-sm text-[#B0B0B0]">Seu assistente pessoal</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white'
                    : 'bg-[#1E1E1E] border border-[#2A2A2A]'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-[#B0B0B0] text-center">Perguntas rápidas:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                    }}
                    className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-3 text-sm hover:border-[#4CAF50] transition-colors text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#2A2A2A] p-4 bg-[#1E1E1E]">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-[#121212] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder:text-[#666] focus:border-[#4CAF50] focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] flex items-center justify-center hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
