import { themeStore } from "./theme.store";
import { languageStore } from "./language.store";

export const stores = {
  themeStore,
  languageStore,
};

export type TStores = typeof stores;
