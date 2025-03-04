import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card, Input, Button, Avatar, Space } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import ChatInput from './components/ChatInput';
import "./index.scss";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: `I received: "${content}". This is a simulated response.`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 2000);
  };
  
  const handleCancelResponse = () => {
    // Cancel the ongoing AI response
    setIsProcessing(false);
    // You would also need to cancel any actual API calls here
  };
  
  return (
    <div className="chat-page">
      <div className="chat-header">
        <Title level={2}>Chat</Title>
        <Paragraph>Start a conversation with the AI assistant</Paragraph>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'ai' ? 'ai-message' : 'user-message'}`}
          >
            <strong>
              {message.sender === 'ai' ? 'AI Assistant' : 'You'}
            </strong>
            <p>{message.content}</p>
          </div>
        ))}
        {isProcessing && (
          <div className="message ai-message is-typing">
            <strong>AI Assistant</strong>
            <p>
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isProcessing={isProcessing}
          onCancelResponse={handleCancelResponse}
        />
      </div>
    </div>
  );
};

export default ChatPage; 