import { useEffect, useState } from "react";
import { avatarStore } from "../stores/avatarStore";
import { reaction } from "mobx";

export function useAvatar() {
  // 本地状态用于触发重渲染
  const [avatar, setAvatar] = useState(avatarStore.avatar);

  useEffect(() => {
    // 监听MobX store中avatar的变化
    const disposer = reaction(
      () => avatarStore.avatar,
      (newAvatar) => {
        setAvatar(newAvatar);
      }
    );

    return () => {
      disposer(); // 清理reaction
    };
  }, []);

  // 返回当前头像和设置头像的方法
  return {
    avatar,
    setAvatar: (newAvatar: string) => avatarStore.setAvatar(newAvatar),
  };
}
