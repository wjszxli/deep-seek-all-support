import { observer } from "mobx-react-lite";
import { PropsWithChildren } from "react";
import { ITheme } from "@/typings";
import { themeStore } from "@/stores/theme.store";

interface IThemeProviderProps extends PropsWithChildren {
  defaultTheme?: ITheme;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = observer(({
  children,
  defaultTheme = ITheme.light,
}) => {
  // 初始化主题
  if (defaultTheme) {
    themeStore.setTheme(defaultTheme);
  }

  return (
    <div className={`theme-${themeStore.theme}`}>
      {children}
    </div>
  );
});

// 创建一个 hook 来使用主题
export const useTheme = () => {
  return {
    theme: themeStore.theme,
    toggleTheme: themeStore.toggleTheme,
    setTheme: themeStore.setTheme,
  };
};
