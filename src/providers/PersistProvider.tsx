import { PropsWithChildren, useEffect, useState } from "react";
import { configurePersistable } from "mobx-persist-store";
import { stores } from "@/stores";

// 配置持久化
configurePersistable({
  storage: window.localStorage,
  debugMode: false,
});

export const PersistProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 等待所有store都从storage中恢复
    Promise.all([
      stores.themeStore.hydrate?.() || Promise.resolve(true),
      stores.languageStore.hydrate?.() || Promise.resolve(true),
    ]).then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};
