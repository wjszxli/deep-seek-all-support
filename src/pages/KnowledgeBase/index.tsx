import React, { useState } from "react";
import { Typography, Input, Tree, Card, Tabs, List, Tag, Button, Empty } from "antd";
import { 
  SearchOutlined, 
  BookOutlined, 
  FolderOutlined, 
  FileOutlined,
  ClockCircleOutlined,
  StarOutlined,
  PlusOutlined
} from "@ant-design/icons";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { DirectoryTree } = Tree;
const { TabPane } = Tabs;

interface KnowledgeItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  isFavorite?: boolean;
}

const KnowledgeBasePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: 1,
      title: "Getting Started with React",
      summary: "A beginner's guide to React components, state, and props",
      category: "Development",
      tags: ["react", "frontend", "javascript"],
      lastUpdated: "2023-05-15",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      summary: "Learn about advanced types, type guards, and generics",
      category: "Development",
      tags: ["typescript", "advanced"],
      lastUpdated: "2023-06-02",
    },
    {
      id: 3,
      title: "Project Management Best Practices",
      summary: "Key strategies for managing projects effectively",
      category: "Management",
      tags: ["project", "planning", "agile"],
      lastUpdated: "2023-04-20",
      isFavorite: true,
    },
    {
      id: 4,
      title: "Data Visualization Principles",
      summary: "Guidelines for creating effective and informative visualizations",
      category: "Design",
      tags: ["data", "visualization", "charts"],
      lastUpdated: "2023-05-28",
    },
    {
      id: 5,
      title: "Network Security Fundamentals",
      summary: "Basic concepts and practices for securing networks",
      category: "Security",
      tags: ["network", "security", "fundamentals"],
      lastUpdated: "2023-04-10",
    }
  ];
  
  const treeData = [
    {
      title: 'Development',
      key: 'development',
      children: [
        {
          title: 'Frontend',
          key: 'frontend',
          children: [
            {
              title: 'React',
              key: 'react',
              isLeaf: true,
            },
            {
              title: 'Angular',
              key: 'angular',
              isLeaf: true,
            },
          ],
        },
        {
          title: 'Backend',
          key: 'backend',
          children: [
            {
              title: 'Node.js',
              key: 'nodejs',
              isLeaf: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Management',
      key: 'management',
      children: [
        {
          title: 'Project Management',
          key: 'project-management',
          isLeaf: true,
        },
        {
          title: 'Team Leadership',
          key: 'team-leadership',
          isLeaf: true,
        },
      ],
    },
    {
      title: 'Design',
      key: 'design',
      isLeaf: true,
    },
    {
      title: 'Security',
      key: 'security',
      isLeaf: true,
    },
  ];
  
  const filteredItems = knowledgeItems.filter(item => {
    // Apply search filter
    const matchesSearch = searchQuery 
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
      
    // Apply category filter
    const matchesCategory = selectedCategory 
      ? item.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
      
    return matchesSearch && matchesCategory;
  });
  
  const favoriteItems = filteredItems.filter(item => item.isFavorite);
  
  return (
    <div className="knowledge-base-page">
      <div className="knowledge-header">
        <div className="header-content">
          <Title level={2}>Knowledge Base</Title>
          <Paragraph>Search and explore our knowledge repository</Paragraph>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Article
        </Button>
      </div>
      
      <div className="knowledge-search">
        <Search
          placeholder="Search knowledge base..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={value => setSearchQuery(value)}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="knowledge-content">
        <div className="sidebar">
          <Card title={<><BookOutlined /> Categories</>} className="category-tree">
            <DirectoryTree
              defaultExpandAll
              onSelect={(_, info) => {
                // @ts-ignore (info.node.title exists but TypeScript doesn't recognize it)
                setSelectedCategory(info.node.title);
              }}
              treeData={treeData}
            />
          </Card>
        </div>
        
        <div className="main-content">
          <Tabs defaultActiveKey="all">
            <TabPane tab="All Articles" key="all">
              {filteredItems.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={filteredItems}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <span><ClockCircleOutlined /> {item.lastUpdated}</span>,
                        <Button 
                          type="text" 
                          icon={<StarOutlined />} 
                          className={item.isFavorite ? "favorite-btn active" : "favorite-btn"}
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={item.category === "Development" ? <FolderOutlined /> : <FileOutlined />}
                        title={<a href="#">{item.title}</a>}
                        description={item.summary}
                      />
                      <div className="item-tags">
                        {item.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No articles found matching your criteria" />
              )}
            </TabPane>
            <TabPane tab={<><StarOutlined /> Favorites</>} key="favorites">
              {favoriteItems.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={favoriteItems}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <span><ClockCircleOutlined /> {item.lastUpdated}</span>,
                        <Button 
                          type="text" 
                          icon={<StarOutlined />} 
                          className="favorite-btn active"
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={item.category === "Development" ? <FolderOutlined /> : <FileOutlined />}
                        title={<a href="#">{item.title}</a>}
                        description={item.summary}
                      />
                      <div className="item-tags">
                        {item.tags.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No favorite articles found" />
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBasePage; 