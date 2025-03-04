import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Tooltip } from 'antd';
import { SendOutlined, PauseOutlined, CloseOutlined } from '@ant-design/icons';
import './ChatInput.scss';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  onCancelResponse?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isProcessing = false, 
  onCancelResponse 
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pausedMessage, setPausedMessage] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const inputRef = useRef<any>(null);
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // When a user types, set typing state
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handlePause = () => {
    setPausedMessage(message);
    setMessage('');
    setIsTyping(false);
    setIsPaused(true);
  };
  
  const handleResume = () => {
    setMessage(pausedMessage);
    setPausedMessage('');
    setIsPaused(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleCancel = () => {
    if (isProcessing && onCancelResponse) {
      onCancelResponse();
    } else {
      setMessage('');
      setPausedMessage('');
      setIsTyping(false);
      setIsPaused(false);
    }
  };
  
  return (
    <div className="chat-input-container">
      {isPaused ? (
        <div className="paused-message-container">
          <div className="paused-message">
            <span>Message paused</span>
            <div className="paused-actions">
              <Button 
                type="link" 
                size="small" 
                onClick={handleResume}
              >
                Resume
              </Button>
              <Button 
                type="link" 
                danger 
                size="small" 
                onClick={handleCancel}
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="input-area">
        <Input.TextArea 
          ref={inputRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={isProcessing || isPaused}
        />
        
        <div className="input-actions">
          {isTyping && !isProcessing && (
            <Tooltip title="Pause message">
              <Button 
                icon={<PauseOutlined />} 
                shape="circle" 
                type="text"
                onClick={handlePause}
              />
            </Tooltip>
          )}
          
          {isProcessing && (
            <Tooltip title="Cancel response">
              <Button 
                icon={<CloseOutlined />} 
                shape="circle" 
                type="text" 
                danger
                onClick={handleCancel}
              />
            </Tooltip>
          )}
          
          <Button 
            type="primary" 
            shape="circle" 
            icon={<SendOutlined />} 
            onClick={handleSend}
            disabled={!isTyping || isProcessing || isPaused}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput; 