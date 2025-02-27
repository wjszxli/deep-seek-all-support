import { ConfigProvider, theme } from "antd";
import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/providers/StoreProvider";
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import ruRU from 'antd/locale/ru_RU'
import zhCN from 'antd/locale/zh_CN'
import zhTW from 'antd/locale/zh_TW'
import { ILanguage, ITheme } from "@/typings";

export const AntdProvider: React.FC<PropsWithChildren> = observer(
  ({ children }) => {
    const { themeStore, languageStore } = useStores();

    const algorithm =
      themeStore.theme === ITheme.dark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm;

    return (
      <ConfigProvider
        theme={{
          algorithm: algorithm,
          token: {
            colorPrimary: "#1677ff",
          },
        }}
        locale={getAntdLocale(languageStore.locale)}
      >
        {children}
      </ConfigProvider>
    );
  }
);

function getAntdLocale(language: ILanguage) {
  switch (language) {
    case "zh-CN":
      return zhCN;
    case "zh-TW":
      return zhTW;
    case "en-US":
      return enUS;
    case "ru-RU":
      return ruRU;
    case "ja-JP":
      return jaJP;

    default:
      return zhCN;
  }
}
