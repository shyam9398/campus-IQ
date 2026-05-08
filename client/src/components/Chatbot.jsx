import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm CampusIQ AI. How can I help you find your dream college today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let botText = "I can help with that! You should check our 'Compare' page for detailed fee and placement analysis.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('fee')) botText = "Top IITs have fees around 2.1L/yr, while private colleges like BITS Pilani are around 4.5L/yr.";
      if (lowerInput.includes('placement')) botText = "IIT Bombay leads with 98% placement rates and average packages above 22 LPA.";
      if (lowerInput.includes('recommend')) botText = "For Computer Science, I recommend IIT Bombay, NIT Trichy, and BITS Pilani based on recent placement trends.";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
      setLoading(false);
    }, 800);
  };

  const handleQuickAction = (text) => {
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      let botText = "I can help with that! You should check our 'Compare' page for detailed fee and placement analysis.";
      const lowerInput = text.toLowerCase();
      if (lowerInput.includes('fee')) botText = "Top IITs have fees around 2.1L/yr, while private colleges like BITS Pilani are around 4.5L/yr.";
      if (lowerInput.includes('placement')) botText = "IIT Bombay leads with 98% placement rates and average packages above 22 LPA.";
      if (lowerInput.includes('engineering') || lowerInput.includes('recommend')) botText = "For Computer Science, I recommend IIT Bombay, NIT Trichy, and BITS Pilani based on recent placement trends.";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* FLOATING CHAT BUTTON */}
      {!isOpen && (
        <div className="relative group">
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            Need Help?
            {/* Tooltip triangle */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
          
          <button 
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:shadow-[0_8px_30px_rgb(147,51,234,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce group-hover:animate-none"
            onClick={() => setIsOpen(true)}
            style={{ animationDuration: '3s' }} // Slow bounce for subtly
          >
            <MessageCircle size={32} />
          </button>
        </div>
      )}

      {/* CHATBOT WINDOW */}
      {isOpen && (
        <div className="w-[380px] h-[600px] max-h-[80vh] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex items-center justify-between shrink-0 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">CampusIQ AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-blue-100 font-medium">Online & Ready to Help</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 flex flex-col gap-4" ref={scrollRef}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 text-gray-500">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-sm">CampusIQ AI is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Area */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
              <button 
                className="whitespace-nowrap px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-full transition-colors snap-start border border-blue-100" 
                onClick={() => handleQuickAction("Top Engineering Colleges")}
              >
                Top Colleges
              </button>
              <button 
                className="whitespace-nowrap px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-full transition-colors snap-start border border-purple-100" 
                onClick={() => handleQuickAction("Highest Placement Packages")}
              >
                Placements
              </button>
              <button 
                className="whitespace-nowrap px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold rounded-full transition-colors snap-start border border-green-100" 
                onClick={() => handleQuickAction("Lowest Fees Colleges")}
              >
                Compare Fees
              </button>
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              className="flex-1 bg-gray-100 hover:bg-gray-200/50 focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500 rounded-full px-4 py-2.5 outline-none transition-all text-gray-700"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shrink-0 shadow-sm"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
