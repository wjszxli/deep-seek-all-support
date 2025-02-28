import React from "react";
import { Typography, Card, Select, Button, Input, Space } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const TranslatePage: React.FC = () => {
  return (
    <div className="translate-page">
      <div className="translate-header">
        <Title level={2}>Translate</Title>
        <Paragraph>Translate text between languages</Paragraph>
      </div>
      
      <div className="translate-container">
        <Card className="translate-card">
          <div className="language-selector">
            <Select defaultValue="en" style={{ width: 120 }}>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
              <Option value="zh">Chinese</Option>
              <Option value="ja">Japanese</Option>
            </Select>
          </div>
          <TextArea 
            rows={6} 
            placeholder="Enter text to translate"
            className="translate-input"
          />
        </Card>
        
        <div className="swap-button">
          <Button shape="circle" icon={<SwapOutlined />} size="large" />
        </div>
        
        <Card className="translate-card">
          <div className="language-selector">
            <Select defaultValue="es" style={{ width: 120 }}>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
              <Option value="zh">Chinese</Option>
              <Option value="ja">Japanese</Option>
            </Select>
          </div>
          <TextArea 
            rows={6} 
            placeholder="Translation will appear here"
            className="translate-output"
            readOnly
          />
        </Card>
      </div>
      
      <div className="translate-actions">
        <Button type="primary" size="large">Translate</Button>
      </div>
    </div>
  );
};

export default TranslatePage; 