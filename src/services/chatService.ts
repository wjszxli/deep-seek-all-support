import { request, onStreamData } from "../api";
import { IMessage } from "../typings";

export async function fetchChatStream(
  messages: IMessage[],
  callback: (chunk: string) => void
) {
  const data = {
    model: "deepseek-r1:latest",
    messages: [
      { role: "system", content: "你是一个 AI 助手，请回答用户的问题" },
      ...messages,
    ],
    stream: true,
  };

  await request({
    url: "http://127.0.0.1:11434/api/chat",
    method: "post",
    responseType: "stream",
    data: data,
  });
  // 监听流式数据
  onStreamData(callback);
}
