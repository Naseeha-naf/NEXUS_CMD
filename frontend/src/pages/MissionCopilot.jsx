import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const MissionCopilot = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "NEXUS Copilot initialized. I am continuously analyzing orbital telemetry, risk matrices, and system alerts. How may I assist your mission today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/copilot/ask`, { prompt: userMsg.text }, { headers: { 'x-auth-token': token } });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "ERROR: Connection to AI core severed. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="border-b border-slateGray pb-2 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider flex items-center gap-3">
            AI MISSION COPILOT <Sparkles className="text-neonCyan animate-pulse" />
          </h2>
          <p className="text-gray-400 mt-1">Autonomous System Intelligence & Explanation Engine</p>
        </div>
      </div>

      <div className="flex-1 bg-darkNavy border border-slateGray rounded-xl overflow-hidden flex flex-col">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-slateGray border-gray-500 text-white' : 'bg-[rgba(0,240,255,0.1)] border-neonCyan text-neonCyan'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[70%] p-4 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slateGray text-white rounded-tr-none' : 'bg-spaceBlack border border-neonCyan text-gray-300 rounded-tl-none shadow-[0_0_10px_rgba(0,240,255,0.1)]'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border bg-[rgba(0,240,255,0.1)] border-neonCyan text-neonCyan">
                <Bot size={20} />
              </div>
              <div className="max-w-[70%] p-4 rounded-xl bg-spaceBlack border border-neonCyan rounded-tl-none text-neonCyan font-mono flex items-center gap-2">
                <div className="w-2 h-2 bg-neonCyan rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="p-4 bg-spaceBlack border-t border-slateGray">
          <form onSubmit={handleSend} className="flex gap-4">
            <input 
              type="text" 
              className="flex-1 bg-darkNavy border border-slateGray rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition-colors"
              placeholder="E.g. 'Explain SAT-Alpha's health score' or 'Are there any critical alerts?'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-neonCyan text-spaceBlack px-6 rounded-lg font-bold hover:bg-[#00c0cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MissionCopilot;
