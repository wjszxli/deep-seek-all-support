import { ILanguage } from "@/typings";
import { makeAutoObservable } from "mobx";

export class LanguageStore {
  locale: ILanguage = "zh-CN";

  constructor() {
    makeAutoObservable(this);
  }

  setLocale = (locale: ILanguage) => {
    this.locale = locale;
  };
}

export const languageStore = new LanguageStore();
