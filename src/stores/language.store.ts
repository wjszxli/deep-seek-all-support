import { ILanguage } from "@/typings";
import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

export interface PersistableStore {
  hydrate?: () => Promise<boolean>;
}

export class LanguageStore implements PersistableStore {
  locale: ILanguage = 'zh-CN';
  hydrate?: () => Promise<boolean>;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'LanguageStore',
      properties: ['locale'],
      storage: window.localStorage,
    });
  }

  setLocale = (locale: ILanguage) => {
    this.locale = locale;
  };
  toggleLocale = () => {
    this.locale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
  };
}

export const languageStore = new LanguageStore();
