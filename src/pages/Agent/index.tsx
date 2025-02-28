import React, { useState } from "react";
import { Typography, Card, Row, Col, Progress, Switch, Button, Timeline, Statistic, Badge } from "antd";
import { 
  RobotOutlined, 
  ApiOutlined, 
  PieChartOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SyncOutlined
} from "@ant-design/icons";
import "./index.scss";

const { Title, Paragraph, Text } = Typography;

interface Agent {
  id: number;
  name: string;
  description: string;
  status: "online" | "offline" | "busy";
  progress: number;
  lastRun: string;
  tasksCompleted: number;
  active: boolean;
}

const AgentPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: "Data Processor",
      description: "Automatically processes and categorizes incoming data files",
      status: "online",
      progress: 100,
      lastRun: "2 hours ago",
      tasksCompleted: 143,
      active: true,
    },
    {
      id: 2,
      name: "Content Summarizer",
      description: "Creates summaries of long documents and reports",
      status: "busy",
      progress: 68,
      lastRun: "Running now",
      tasksCompleted: 89,
      active: true,
    },
    {
      id: 3,
      name: "Email Assistant",
      description: "Drafts and sends scheduled email responses",
      status: "offline",
      progress: 0,
      lastRun: "Yesterday, 8:30 PM",
      tasksCompleted: 56,
      active: false,
    },
    {
      id: 4,
      name: "Analytics Reporter",
      description: "Generates weekly analytics reports from multiple sources",
      status: "online",
      progress: 100,
      lastRun: "5 hours ago",
      tasksCompleted: 27,
      active: true,
    },
  ]);

  const activities = [
    {
      time: "09:32 AM",
      task: "Data Processor completed daily log analysis",
      type: "success",
    },
    {
      time: "08:14 AM",
      task: "Content Summarizer started summarizing quarterly report",
      type: "processing",
    },
    {
      time: "Yesterday",
      task: "Email Assistant scheduled 5 responses",
      type: "success",
    },
    {
      time: "Yesterday",
      task: "Analytics Reporter failed to connect to data source",
      type: "error",
    },
    {
      time: "2 days ago",
      task: "Data Processor identified 3 anomalies in server logs",
      type: "warning",
    },
  ];

  const toggleAgentStatus = (id: number) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === id ? { ...agent, active: !agent.active } : agent
      )
    );
  };

  const getStatusBadge = (status: Agent["status"]) => {
    switch (status) {
      case "online":
        return <Badge status="success" text="Online" />;
      case "busy":
        return <Badge status="processing" text="Busy" />;
      case "offline":
        return <Badge status="default" text="Offline" />;
    }
  };

  return (
    <div className="agent-page">
      <div className="agent-header">
        <div className="header-content">
          <Title level={2}>AI Agents</Title>
          <Paragraph>Manage your automated AI assistants</Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          Create New Agent
        </Button>
      </div>

      <div className="agent-dashboard">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <Card className="stat-card">
              <Statistic 
                title="Active Agents" 
                value={agents.filter(a => a.active).length} 
                suffix={`/ ${agents.length}`}
                valueStyle={{ color: '#1890ff' }}
                prefix={<RobotOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} lg={6}>
            <Card className="stat-card">
              <Statistic 
                title="Tasks Completed Today" 
                value={42} 
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} lg={6}>
            <Card className="stat-card">
              <Statistic 
                title="Tasks In Progress" 
                value={3} 
                valueStyle={{ color: '#faad14' }}
                prefix={<SyncOutlined spin />}
              />
            </Card>
          </Col>
          <Col xs={24} lg={6}>
            <Card className="stat-card">
              <Statistic 
                title="API Requests" 
                value={1243} 
                valueStyle={{ color: '#722ed1' }}
                prefix={<ApiOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="agent-content">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Title level={4} className="section-title">
              <RobotOutlined className="section-icon" /> Agents
            </Title>
            <Row gutter={[16, 16]}>
              {agents.map(agent => (
                <Col xs={24} sm={12} key={agent.id}>
                  <Card className={`agent-card ${!agent.active ? 'inactive' : ''}`}>
                    <div className="agent-header">
                      <div className="agent-info">
                        <Text strong>{agent.name}</Text>
                        <div className="agent-status">
                          {getStatusBadge(agent.status)}
                        </div>
                      </div>
                      <Switch 
                        checked={agent.active} 
                        onChange={() => toggleAgentStatus(agent.id)}
                      />
                    </div>
                    <Paragraph className="agent-description">{agent.description}</Paragraph>
                    
                    {agent.status === "busy" && (
                      <div className="agent-progress">
                        <Progress percent={agent.progress} size="small" status="active" />
                      </div>
                    )}
                    
                    <div className="agent-stats">
                      <div className="stat-item">
                        <ClockCircleOutlined /> Last run: {agent.lastRun}
                      </div>
                      <div className="stat-item">
                        <CheckCircleOutlined /> Tasks: {agent.tasksCompleted}
                      </div>
                    </div>
                    
                    <div className="agent-actions">
                      <Button size="small">Edit</Button>
                      <Button size="small" type="primary">Run Now</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          
          <Col xs={24} lg={8}>
            <div className="activity-section">
              <Title level={4} className="section-title">
                <ClockCircleOutlined className="section-icon" /> Recent Activity
              </Title>
              <Card className="activity-timeline">
                <Timeline>
                  {activities.map((activity, index) => (
                    <Timeline.Item 
                      key={index} 
                      color={
                        activity.type === 'success' ? 'green' : 
                        activity.type === 'processing' ? 'blue' : 
                        activity.type === 'error' ? 'red' : 
                        'orange'
                      }
                    >
                      <div className="timeline-content">
                        <Text strong>{activity.task}</Text>
                        <div className="timeline-time">{activity.time}</div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
              
              <Title level={4} className="section-title" style={{ marginTop: 24 }}>
                <PieChartOutlined className="section-icon" /> Task Distribution
              </Title>
              <Card className="stats-card">
                <div className="stats-grid">
                  <div className="stat-box success">
                    <div className="stat-value">68%</div>
                    <div className="stat-label">Success</div>
                  </div>
                  <div className="stat-box processing">
                    <div className="stat-value">17%</div>
                    <div className="stat-label">In Progress</div>
                  </div>
                  <div className="stat-box warning">
                    <div className="stat-value">10%</div>
                    <div className="stat-label">Warnings</div>
                  </div>
                  <div className="stat-box error">
                    <div className="stat-value">5%</div>
                    <div className="stat-label">Errors</div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AgentPage; 