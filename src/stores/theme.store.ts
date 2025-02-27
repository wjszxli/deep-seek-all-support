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
  };

  changeTheme = () => {
    this.theme = this.theme === ITheme.light ? ITheme.dark : ITheme.light;
  };
}

export const themeStore = new ThemeStore();
