import { IpcRendererEvent } from "electron";

interface RequestConfig {
  url: string;
  method?: "get" | "post";
  responseType?: "json" | "stream";
  body?: any;
  headers?: Record<string, string>;
}

export async function request<T = any>(config: RequestConfig): Promise<T> {
  const response = await window.ipcRenderer.invoke("http-request", {
    ...config,
  });

  if (!response.success) throw new Error(response.error);
  return response.data;
}

// 监听流数据
export function onStreamData(
  listener: (event: IpcRendererEvent, message: string) => void
) {
  window.ipcRenderer.on("update-message", listener);
}
