import React from "react";
import { Typography, Upload, Card, List, Button } from "antd";
import { InboxOutlined, FileOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./index.scss";

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

const FilePage: React.FC = () => {
  const mockFiles = [
    { name: "Document 1.pdf", size: "2.4 MB", date: "2023-04-15" },
    { name: "Image 5.png", size: "1.7 MB", date: "2023-04-12" },
    { name: "Spreadsheet.xlsx", size: "890 KB", date: "2023-04-10" },
    { name: "Presentation.pptx", size: "4.2 MB", date: "2023-04-08" },
  ];

  return (
    <div className="file-page">
      <div className="file-header">
        <Title level={2}>File Management</Title>
        <Paragraph>Upload, manage and analyze your files</Paragraph>
      </div>
      
      <div className="file-content">
        <div className="upload-section">
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to this area to upload</p>
            <p className="ant-upload-hint">
              Support for single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
        </div>
        
        <Card title="Your Files" className="files-list">
          <List
            itemLayout="horizontal"
            dataSource={mockFiles}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="text" icon={<EyeOutlined />} key="view" />,
                  <Button type="text" danger icon={<DeleteOutlined />} key="delete" />
                ]}
              >
                <List.Item.Meta
                  avatar={<FileOutlined style={{ fontSize: 24 }} />}
                  title={item.name}
                  description={`${item.size} • Uploaded on ${item.date}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default FilePage; 