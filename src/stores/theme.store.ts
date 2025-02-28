import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import { ITheme } from "@/typings";

export interface PersistableStore {
  hydrate?: () => Promise<boolean>;
}

export class ThemeStore implements PersistableStore {
  theme: ITheme = ITheme.light;
  hydrate?: () => Promise<boolean>;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'ThemeStore',
      properties: ['theme'],
      storage: window.localStorage,
    });
  }

  setTheme = (theme: ITheme) => {
    this.theme = theme;
    // Apply theme attribute to body for CSS selectors
    document.body.setAttribute('data-theme', theme);
  };

  changeTheme = () => {
    this.theme = this.theme === ITheme.light ? ITheme.dark : ITheme.light;
    // Apply theme attribute to body for CSS selectors
    document.body.setAttribute('data-theme', this.theme);
  };
}

export const themeStore = new ThemeStore();

// For light theme
const lightTheme = {
  // ... existing variables
  '--left-menu-bg': '#f5f5f5',
  '--menu-hover-color': 'rgba(0, 0, 0, 0.05)',
  '--menu-active-bg': 'rgba(24, 144, 255, 0.1)',
  '--border-color': '#e8e8e8',
  '--menu-icon-filter': 'none',
  '--menu-icon-active-filter': 'brightness(1.2)',
};

// For dark theme
const darkTheme = {
  // ... existing variables
  '--left-menu-bg': '#262626',
  '--menu-hover-color': 'rgba(255, 255, 255, 0.1)',
  '--menu-active-bg': 'rgba(24, 144, 255, 0.2)',
  '--border-color': 'rgba(255, 255, 255, 0.1)',
  '--menu-icon-filter': 'brightness(2.5) invert(0.8)',
  '--menu-icon-active-filter': 'brightness(2) invert(0.7) hue-rotate(180deg)',
};
