import React, { useState } from 'react';
import { MessageSquare, Send, User, X, Minimize2, RefreshCw, GraduationCap, Headphones } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const AIChatAssistant: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
  const { siteSettings, language, role } = useAcademy();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'ai' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: `Assalamu Alaikum! Welcome to Shaheen Al Zaitoon Quran Academy Support Desk in Rawalpindi, Pakistan. Dedicated in loving memory of Zaitoon Bibi. How can we assist you with Quran courses, Tajweed rules, or EasyPaisa fee payment today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/quran-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          userRole: role,
          language,
        }),
      });

      const data = await response.json();
      const supportReply =
        data.response ||
        'Assalamu Alaikum! For quick response, please reach Founder Muneeb Ur Rehman directly on WhatsApp: 03447956085.';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: supportReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Assalamu Alaikum! Please feel free to contact Founder Muneeb Ur Rehman directly on WhatsApp: 03447956085 for instant support.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'What courses are offered for children?',
    'How do I pay fee via EasyPaisa?',
    'Are there female Qaria teachers for ladies?',
    'What is the Rawalpindi Head Office contact?',
  ];

  if (embedded) {
    return (
      <div className="bg-gradient-to-b from-red-950 via-red-900 to-red-950 border-2 border-amber-500/50 rounded-2xl p-6 shadow-xl text-white space-y-4">
        <div className="flex items-center justify-between border-b border-red-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-red-950 flex items-center justify-center font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-amber-200">Academy Support & Advisory Desk</h3>
              <p className="text-[11px] text-amber-300">Ask anything about courses, Tajweed, fees & scheduling</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online Support Live
          </span>
        </div>

        {/* Messages Box */}
        <div className="h-64 overflow-y-auto space-y-3 p-3 bg-red-950/80 rounded-xl border border-red-800/80">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-amber-500 text-red-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-red-950 font-medium rounded-tr-none'
                    : 'bg-red-900 border border-amber-500/30 text-red-100 rounded-tl-none'
                }`}
              >
                <div>{m.text}</div>
                <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-red-900' : 'text-amber-300/80'}`}>
                  {m.time}
                </div>
              </div>
              {m.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-red-800 text-amber-200 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Retrieving information from support desk...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(q);
              }}
              className="text-[11px] bg-red-900 hover:bg-amber-500 hover:text-red-950 text-amber-200 px-2.5 py-1 rounded-full border border-red-800 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Type your question about Tajweed, courses, EasyPaisa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-red-900 text-amber-100 placeholder-red-300/60 px-3 py-2 rounded-xl text-xs border border-red-700 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-400 text-red-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Support</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-red-950 font-bold p-3.5 rounded-full shadow-2xl border-2 border-amber-200 flex items-center gap-2 transform hover:scale-110 transition-all"
        >
          <Headphones className="w-6 h-6" />
          <span className="hidden sm:inline text-xs">Academy Support Desk</span>
        </button>
      )}

      {/* Floating Widget Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-red-950 border-2 border-amber-500/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] text-white">
          <div className="bg-gradient-to-r from-red-900 via-amber-950 to-red-900 p-3.5 border-b border-amber-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-amber-300" />
              <div>
                <div className="text-xs font-bold text-amber-200 font-serif">Shaheen Support Desk</div>
                <div className="text-[10px] text-amber-300">Rawalpindi Head Office</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-amber-300 hover:bg-red-900"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs bg-red-950">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl ${
                  m.sender === 'user' ? 'bg-amber-500 text-red-950 ml-auto max-w-[85%]' : 'bg-red-900 text-red-100 mr-auto max-w-[85%]'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-2 border-t border-red-800 flex gap-1.5 bg-red-900">
            <input
              type="text"
              placeholder="Ask Support Desk..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-red-950 text-white placeholder-red-300 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="bg-amber-500 text-red-950 font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

