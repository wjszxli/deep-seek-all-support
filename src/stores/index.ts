import { themeStore } from "./theme.store";
import { languageStore } from "./language.store";
import { fileStore } from './fileStore';

export const stores = {
  themeStore,
  languageStore,
  fileStore
};

export type TStores = typeof stores;
