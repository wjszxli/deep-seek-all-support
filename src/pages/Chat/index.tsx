import React from "react";
import { Typography, Card, Input, Button, Avatar, Space } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ChatPage: React.FC = () => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <Title level={2}>Chat</Title>
        <Paragraph>Start a conversation with the AI assistant</Paragraph>
      </div>
      
      <div className="chat-messages">
        <Card className="message ai-message">
          <Space>
            <Avatar icon={<UserOutlined />} />
            <div>
              <strong>AI Assistant</strong>
              <p>Hello! How can I help you today?</p>
            </div>
          </Space>
        </Card>
        
        <Card className="message user-message">
          <Space>
            <div className="message-content">
              <strong>You</strong>
              <p>I'd like to learn about natural language processing.</p>
            </div>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
          </Space>
        </Card>
        
        <Card className="message ai-message">
          <Space>
            <Avatar icon={<UserOutlined />} />
            <div>
              <strong>AI Assistant</strong>
              <p>Natural Language Processing (NLP) is a branch of artificial intelligence that helps computers understand, interpret, and generate human language. It combines computational linguistics, machine learning, and deep learning models to process human language in text or voice data.</p>
            </div>
          </Space>
        </Card>
      </div>
      
      <div className="chat-input">
        <TextArea rows={3} placeholder="Type your message here..." />
        <Button type="primary" icon={<SendOutlined />} size="large" shape="circle" />
      </div>
    </div>
  );
};

export default ChatPage; 