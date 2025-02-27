export interface ProviderConfig {
  name: string; // 当前服务商的名称
  apiKey: string | null; // 当前服务商的 API Key
  models: { label: string; value: string }[]; // 该服务商支持的模型列表
  apiKeyUrl?: string; // 获取 API Key 的 URL
}


export interface IMessage {
    role: string;
    content: string;
}

export enum ITheme {
  light = 'light',
  dark = 'dark',
  auto = 'auto'
}

export type ILanguage = 'zh-CN' | 'zh-TW' | 'en-US' | 'ru-RU' | 'ja-JP'
