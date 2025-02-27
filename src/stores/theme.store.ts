import { makeAutoObservable } from "mobx";
import { ITheme } from "@/typings";

export class ThemeStore {
  theme: ITheme = ITheme.auto;

  constructor() {
    makeAutoObservable(this);
  }

  setTheme = (theme: ITheme) => {
    this.theme = theme;
  };

  toggleTheme = () => {
    this.theme = this.theme === ITheme.light ? ITheme.dark : ITheme.light;
  };
}

export const themeStore = new ThemeStore();
