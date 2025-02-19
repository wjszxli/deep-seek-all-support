import {
  Bubble,
  BubbleProps,
  Conversations,
  Prompts,
  Sender,
  Suggestion,
  XProvider,
} from "@ant-design/x";
import { Divider, Flex, message } from "antd";
import { useEffect, useState } from "react";

import {
  AlipayCircleOutlined,
  BulbOutlined,
  GithubOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { fetchChatStream } from "./services/chatService";

interface IBubbleListProps extends BubbleProps {
  key: number;
}

const fooAvatar: React.CSSProperties = {
  color: "#f56a00",
  backgroundColor: "#fde3cf",
};

const barAvatar: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#87d068",
};

const App = () => {
  const [messages, setMessages] = useState<string | undefined>("");
  const [bubbleList, setBubbleList] = useState<IBubbleListProps[]>([]);
  const [loading, setLoading] = useState(false);

  const initData = async () => {
    try {
      // await storage.remove('chatHistory');
      // const config = await storage.getConfig();
      // if (!config.selectedProvider) return;

      // const provider = PROVIDERS_DATA[config.selectedProvider];
      // if (!provider) return;

      // setIsSelectProvider(true);

      const bubble: IBubbleListProps = {
        key: Date.now(),
        placement: "start",
        // messageRender: renderMarkdown,
        // content: `我是大模型 ${provider.name} AI 助手，可以回答你的任何的问题`,
        content: `我是大模型 AI 助手，可以回答你的任何的问题`,
        loading: false,
        avatar: { icon: <UserOutlined />, style: fooAvatar },
      };

      setBubbleList([bubble]);
    } catch (error) {
      console.error("Failed to initialize data:", error);
    }
  };

  const sendChat = async () => {
    if (!messages) {
      message.error("请输入你要问的问题！");
      return;
    }

    const userBubble: IBubbleListProps = {
      key: Date.now() + 1,
      placement: "end",
      // messageRender: renderMarkdown,
      content: messages,
      loading: false,
      avatar: { icon: <UserOutlined />, style: barAvatar },
    };

    const loadingBubble: IBubbleListProps = {
      key: Date.now() + 2,
      placement: "start",
      // messageRender: renderMarkdown,
      loading: true,
      content: "",
      avatar: { icon: <UserOutlined />, style: fooAvatar },
    };

    setBubbleList((prevBubbleList) => [
      ...prevBubbleList,
      userBubble,
      loadingBubble,
    ]);

    try {
      setLoading(true);

      // const previousMessages: IMessage[] =
      //   (await storage.get("chatHistory")) || [];
      const previousMessages = [];

      const sendMessage = [
        { role: "user", content: messages },
      ];
      await fetchChatStream(sendMessage, (chunk) => {
        console.log('chunk', chunk)
      });
      // let content = "";
      // let reasoningContent = "";
      setMessages("AI 在思考中");

      // let isReasoning = false;

      // chatAIStream(sendMessage, async (chunk) => {
      //   const { data, done } = chunk;
      //   const { selectedProvider } = await storage.getConfig();
      //   if (isLocalhost(selectedProvider)) {
      //     const tagPattern = new RegExp(`<(${tags.join("|")})>`, "i");
      //     const closeTagPattern = new RegExp(`</(${tags.join("|")})>`, "i");

      //     const openTagMatch = data.match(tagPattern);
      //     const closeTagMatch = data.match(closeTagPattern);

      //     if (!isReasoning && openTagMatch) {
      //       isReasoning = true;
      //     } else if (isReasoning && !closeTagMatch) {
      //       reasoningContent += data;
      //     } else if (isReasoning && closeTagMatch) {
      //       isReasoning = false;
      //     } else if (!isReasoning && !done) {
      //       content += data;
      //     }
      //   } else if (!done) {
      //     if (!data.startsWith("data: ")) return;

      //     const chunkStringData = data.slice(6);
      //     const chunkData = JSON.parse(chunkStringData);
      //     const { choices } = chunkData;
      //     if (choices?.[0]?.delta?.content) {
      //       content += chunkData.choices[0].delta.content;
      //     } else if (choices?.[0]?.delta?.reasoning_content) {
      //       reasoningContent += chunkData.choices[0].delta.reasoning_content;
      //     }
      //   }

      //   if (done) {
      //     const updatedMessages = [
      //       ...sendMessage,
      //       { role: "assistant", content: content },
      //     ];
      //     await storage.set("chatHistory", updatedMessages);

      //     setMessages(undefined);
      //     setLoading(false);
      //     setBubbleList((prevBubbleList) =>
      //       prevBubbleList.map((bubble) =>
      //         bubble.key === loadingBubble.key
      //           ? {
      //               ...bubble,
      //               footer: (
      //                 <Space>
      //                   <Button
      //                     color="default"
      //                     variant="text"
      //                     size="small"
      //                     icon={<CopyOutlined />}
      //                     onClick={() => copyToClipboard(content)}
      //                   />
      //                   <Button
      //                     color="default"
      //                     variant="text"
      //                     size="small"
      //                     icon={<SyncOutlined />}
      //                     onClick={() => regenerateResponse(content)}
      //                   />
      //                 </Space>
      //               ),
      //             }
      //           : bubble
      //       )
      //     );
      //     return;
      //   } else {
      //     setBubbleList((prevBubbleList) =>
      //       prevBubbleList.map((bubble) =>
      //         bubble.key === loadingBubble.key
      //           ? {
      //               ...bubble,
      //               content: content,
      //               loading: content ? false : true,
      //               header: reasoningContent ? (
      //                 <Think context={reasoningContent} />
      //               ) : null,
      //             }
      //           : bubble
      //       )
      //     );
      //   }
      // });
    } catch (error) {
      message.error(error instanceof Error ? error.message : String(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <XProvider>
        <Flex style={{ height: 500 }} gap={12}>
          <Conversations
            style={{ width: 200 }}
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Conversation - 1",
                icon: <GithubOutlined />,
              },
              {
                key: "2",
                label: "Conversation - 2",
                icon: <AlipayCircleOutlined />,
              },
            ]}
          />
          <Divider type="vertical" style={{ height: "100%" }} />
          <Flex vertical style={{ flex: 1 }} gap={8}>
            <Bubble.List style={{ flex: 1 }} items={bubbleList} />
            <Prompts
              items={[
                {
                  key: "1",
                  icon: <BulbOutlined style={{ color: "#FFD700" }} />,
                  label: "Ignite Your Creativity",
                },
                {
                  key: "2",
                  icon: <SmileOutlined style={{ color: "#52C41A" }} />,
                  label: "Tell me a Joke",
                },
              ]}
            />
            <Suggestion items={[{ label: "Write a report", value: "report" }]}>
              {({ onTrigger, onKeyDown }) => {
                return (
                  <Sender
                    value={messages}
                    loading={loading}
                    disabled={loading}
                    onChange={(nextVal: string) => {
                      if (nextVal === "/") {
                        onTrigger();
                      } else if (!nextVal) {
                        onTrigger(false);
                      }
                      setMessages(nextVal);
                    }}
                    onKeyDown={onKeyDown}
                    onSubmit={() => {
                      sendChat();
                    }}
                    placeholder="请输入你想要问的问题"
                  />
                );
              }}
            </Suggestion>
          </Flex>
        </Flex>
      </XProvider>
    </>
  );
};

export default App;
