import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import './Chatbot.css';

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
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Mock AI response logic
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
    <div className="chatbot-wrapper">
      <button 
        className={`chatbot-trigger ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={28} />
      </button>

      <div className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="bot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h3>CampusIQ AI</h3>
              <span className="online-status">Online</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages" ref={scrollRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="message bot loading">
              <Loader2 size={16} className="animate-spin" />
            </div>
          )}
        </div>

        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => handleQuickAction("Top Engineering Colleges")}>Engineering</button>
          <button className="quick-action-btn" onClick={() => handleQuickAction("Highest Placement Packages")}>Placements</button>
          <button className="quick-action-btn" onClick={() => handleQuickAction("Lowest Fees Colleges")}>Fees</button>
        </div>

        <form onSubmit={handleSend} className="chatbot-input-area">
          <input 
            id="chat-input"
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..." 
          />
          <button type="submit" className="send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
