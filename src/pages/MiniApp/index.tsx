import React from "react";
import { Typography, Card, Row, Col, Badge, Tag, Button } from "antd";
import { AppstoreAddOutlined, RocketOutlined, StarOutlined } from "@ant-design/icons";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const MiniAppPage: React.FC = () => {
  const miniApps = [
    {
      id: 1,
      title: "PDF Summarizer",
      description: "Extract key insights from PDF documents automatically",
      icon: "📄",
      featured: true,
      tags: ["productivity", "documents"],
    },
    {
      id: 2,
      title: "Image Generator",
      description: "Create custom images using AI",
      icon: "🖼️",
      featured: false,
      tags: ["creative", "visual"],
    },
    {
      id: 3,
      title: "Code Assistant",
      description: "Get help with coding and debugging",
      icon: "💻",
      featured: true,
      tags: ["development", "productivity"],
    },
    {
      id: 4,
      title: "Data Visualizer",
      description: "Transform data into beautiful visualizations",
      icon: "📊",
      featured: false,
      tags: ["data", "visual"],
    },
    {
      id: 5,
      title: "Meeting Summarizer",
      description: "Automatic summaries of your meetings",
      icon: "🗣️",
      featured: false,
      tags: ["productivity", "meetings"],
    },
    {
      id: 6,
      title: "Mind Mapper",
      description: "Organize thoughts and ideas visually",
      icon: "🧠",
      featured: false,
      tags: ["creative", "productivity"],
    },
  ];

  return (
    <div className="miniapp-page">
      <div className="miniapp-header">
        <div className="header-content">
          <Title level={2}>Mini Applications</Title>
          <Paragraph>Discover powerful tools to enhance your productivity</Paragraph>
        </div>
        <Button type="primary" icon={<AppstoreAddOutlined />}>
          Create Custom App
        </Button>
      </div>

      <div className="featured-apps">
        <Title level={4} className="section-title">
          <StarOutlined className="section-icon" /> Featured Apps
        </Title>
        <Row gutter={[16, 16]}>
          {miniApps
            .filter(app => app.featured)
            .map(app => (
              <Col xs={24} sm={12} key={app.id}>
                <Badge.Ribbon text="Featured" color="gold">
                  <Card hoverable className="app-card featured-card">
                    <div className="app-icon">{app.icon}</div>
                    <Meta 
                      title={app.title} 
                      description={app.description} 
                    />
                    <div className="app-tags">
                      {app.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <Button type="primary" className="app-button">Launch</Button>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
        </Row>
      </div>

      <div className="all-apps">
        <Title level={4} className="section-title">
          <RocketOutlined className="section-icon" /> All Applications
        </Title>
        <Row gutter={[16, 16]}>
          {miniApps
            .filter(app => !app.featured)
            .map(app => (
              <Col xs={24} sm={12} md={8} key={app.id}>
                <Card hoverable className="app-card">
                  <div className="app-icon">{app.icon}</div>
                  <Meta 
                    title={app.title} 
                    description={app.description} 
                  />
                  <div className="app-tags">
                    {app.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <Button type="primary" className="app-button">Launch</Button>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default MiniAppPage; 