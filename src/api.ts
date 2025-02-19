interface RequestConfig {
  url: string;
  method?: 'get' | 'post';
  responseType?: 'json' | 'stream';
  data?: any;
  headers?: Record<string, string>;
}


export async function request<T = any>(config: RequestConfig): Promise<T> {
  const response = await window.api.request({
      ...config,
      body: { stream: config.responseType === 'stream' },
  });

  if (!response.success) throw new Error(response.error);
  return response.data;
}

// 监听流数据
export function onStreamData(callback: (data: string) => void) {
  window.api.onStreamData(callback);
}