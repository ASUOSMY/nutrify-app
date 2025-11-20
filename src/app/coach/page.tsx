'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Olá! Sou seu Coach Nutrify 💪 Estou aqui para te motivar e ajudar com dicas de alimentação e treino. Como posso te ajudar hoje?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (in production, call OpenAI API)
    setTimeout(() => {
      const responses = [
        'Ótima pergunta! Lembre-se: consistência é a chave. Pequenos passos todos os dias levam a grandes resultados! 💪',
        'Você está no caminho certo! Continue focado em seus objetivos e não se esqueça de se hidratar bem. 💧',
        'Excelente! Para melhores resultados, combine alimentação balanceada com exercícios regulares. Você consegue! 🔥',
        'Boa! Lembre-se de priorizar proteínas magras, vegetais e carboidratos complexos. Seu corpo agradece! 🥗',
        'Perfeito! O descanso é tão importante quanto o treino. Durma bem e seu corpo se recuperará melhor. 😴',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: randomResponse },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Coach IA</h1>
              <p className="text-white/80 text-sm">Seu assistente pessoal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="max-w-lg mx-auto w-full px-4 pb-6">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua pergunta..."
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-[#4CAF50] hover:bg-[#2E7D32]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            'Como perder peso?',
            'Dicas de alimentação',
            'Motivação para treinar',
            'Receitas saudáveis',
          ].map((question) => (
            <button
              key={question}
              onClick={() => {
                setInput(question);
              }}
              className="px-4 py-2 bg-white dark:bg-[#1E1E1E] rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
