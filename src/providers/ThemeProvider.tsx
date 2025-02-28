import React, { FC, ReactNode, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { themeStore } from "@/stores/theme.store";
import { ITheme } from "@/typings";

interface ThemeProviderProps {
  children: ReactNode;
}

// Define CSS variables for light and dark themes
const lightThemeVars = {
  '--left-menu-bg': '#f5f5f5',
  '--menu-hover-color': 'rgba(0, 0, 0, 0.05)',
  '--menu-active-bg': 'rgba(24, 144, 255, 0.1)',
  '--border-color': '#e8e8e8',
  '--menu-icon-filter': 'none',
  '--menu-icon-active-filter': 'brightness(1.2)',
  '--primary-color': '#1890ff',
};

const darkThemeVars = {
  '--left-menu-bg': '#262626',
  '--menu-hover-color': 'rgba(255, 255, 255, 0.1)',
  '--menu-active-bg': 'rgba(24, 144, 255, 0.2)',
  '--border-color': 'rgba(255, 255, 255, 0.1)',
  '--menu-icon-filter': 'brightness(2.5) invert(0.8)',
  '--menu-icon-active-filter': 'brightness(2) invert(0.7) hue-rotate(180deg)',
  '--primary-color': '#1890ff',
};

export const ThemeProvider: FC<ThemeProviderProps> = observer(({ children }) => {
  // Apply theme CSS variables and data-theme attribute
  useEffect(() => {
    // Set the theme attribute on body
    document.body.setAttribute('data-theme', themeStore.theme);
    
    // Apply CSS variables based on current theme
    const themeVars = themeStore.theme === ITheme.light ? lightThemeVars : darkThemeVars;
    
    // Apply CSS variables to document root
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [themeStore.theme]);

  return <>{children}</>;
});

// Hook to use theme
export const useTheme = () => {
  return {
    theme: themeStore.theme,
    changeTheme: themeStore.changeTheme,
    setTheme: themeStore.setTheme,
  };
};
