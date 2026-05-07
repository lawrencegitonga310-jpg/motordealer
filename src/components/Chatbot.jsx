import React, { useState, useEffect, useRef } from "react";
import '../css/Chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "🚗 Welcome to Mrenga Carhire! How can I help you today?", time: new Date() },
    { from: "bot", text: "I can help you with:\n• 🚗 Car rentals and bookings\n• 💰 Pricing information\n• 📍 Branch locations\n• 📞 Customer support", time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Car rental responses
    if (lowerInput.includes('car') || lowerInput.includes('rent') || lowerInput.includes('vehicle')) {
      return "I can help you find the perfect car! We have luxury sedans, SUVs, and economy vehicles. What type of vehicle are you interested in?";
    }
    
    // Pricing responses
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('rate')) {
      return "Our rates start from KES 3,500/day for economy cars up to KES 9,000/day for luxury vehicles. Would you like to see our full price list?";
    }
    
    // Location responses
    if (lowerInput.includes('location') || lowerInput.includes('branch') || lowerInput.includes('where')) {
      return "We have 5 convenient branches: Nairobi CBD, JKIA Airport, Westlands, Thika Road, and Kisumu. Which location is closest to you?";
    }
    
    // Booking responses
    if (lowerInput.includes('book') || lowerInput.includes('reserve') || lowerInput.includes('hire')) {
      return "I can help you book a vehicle! Please let me know:\n• Which car you prefer\n• Pickup and return dates\n• Pickup location";
    }
    
    // Contact responses
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('help')) {
      return "You can reach us at:\n📞 +254 718483892\n✉️ info@mrengacarhire.com\n💬 WhatsApp: +254 718483892";
    }
    
    // Greeting responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! Welcome to Mrenga Carhire! I'm here to help you find the perfect vehicle for your needs. What are you looking for today?";
    }
    
    // Default response
    return "I understand you're interested in our services. Let me connect you with our booking system or you can browse our available vehicles. How else can I assist you?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { from: "user", text: input, time: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage = { from: "bot", text: botResponse, time: new Date() };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="chatbot-container">
      {/* Chat Toggle Button */}
      <button className="chat-toggle" onClick={toggleChat}>
        <span className="chat-icon">💬</span>
        <span className="chat-label">Chat</span>
        {messages.length > 2 && (
          <span className="notification-dot"></span>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">
              <span className="avatar-icon">🚗</span>
            </div>
            <div className="header-info">
              <h3>Mrenga Assistant</h3>
              <span className="status-indicator online"></span>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat}>×</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.from}`}>
              <div className="message-content">
                {msg.from === 'bot' && (
                  <div className="bot-avatar-small">
                    <span>🚗</span>
                  </div>
                )}
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{formatTime(msg.time)}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message bot">
              <div className="message-content">
                <div className="bot-avatar-small">
                  <span>🚗</span>
                </div>
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input"
              disabled={isTyping}
            />
            <button 
              className="send-btn" 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              <span className="send-icon">📤</span>
            </button>
          </div>
          <div className="input-footer">
            <span className="footer-text">Powered by Mrenga Carhire</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
