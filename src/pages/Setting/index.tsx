import React from "react";
import { Typography, Card, Switch, Radio, Select, Button, Divider, List } from "antd";
import { useTheme } from "@/providers/ThemeProvider";
import { ITheme } from "@/typings";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const SettingPage: React.FC = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="setting-page">
      <div className="setting-header">
        <Title level={2}>Settings</Title>
        <Paragraph>Configure your application preferences</Paragraph>
      </div>
      
      <div className="settings-container">
        <Card title="Appearance" className="setting-card">
          <List>
            <List.Item
              actions={[
                <Switch 
                  checked={theme === ITheme.dark} 
                  onChange={(checked) => changeTheme()} 
                />
              ]}
            >
              <List.Item.Meta
                title="Dark Mode"
                description="Toggle between light and dark theme"
              />
            </List.Item>
            
            <List.Item>
              <List.Item.Meta
                title="Font Size"
                description="Adjust the size of text throughout the application"
              />
              <Radio.Group defaultValue="medium">
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="medium">Medium</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </List.Item>
          </List>
        </Card>
        
        <Card title="Language" className="setting-card">
          <List>
            <List.Item>
              <List.Item.Meta
                title="Interface Language"
                description="Select your preferred language"
              />
              <Select defaultValue="en" style={{ width: 120 }}>
                <Option value="en">English</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
                <Option value="de">German</Option>
                <Option value="zh">Chinese</Option>
              </Select>
            </List.Item>
          </List>
        </Card>
        
        <Card title="Account" className="setting-card">
          <div className="account-info">
            <div className="info-item">
              <Typography.Text strong>Email:</Typography.Text>
              <Typography.Text>user@example.com</Typography.Text>
            </div>
            <div className="info-item">
              <Typography.Text strong>Account Type:</Typography.Text>
              <Typography.Text>Premium</Typography.Text>
            </div>
          </div>
          <Divider />
          <div className="account-actions">
            <Button>Change Password</Button>
            <Button type="primary" danger>Log Out</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingPage; 