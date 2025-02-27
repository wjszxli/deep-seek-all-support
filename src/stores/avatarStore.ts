import { makeObservable, observable, action } from "mobx";
import { UserAvatar } from "@/utils/constant";
import { fileStore } from "./fileStore";
import { getLogger } from "@/utils/logger";

const logger = getLogger("AvatarStore");

class AvatarStore {
  avatar: string = UserAvatar;
  avatarFileId: string | null = null;

  constructor() {
    makeObservable(this, {
      avatar: observable,
      avatarFileId: observable,
      setAvatar: action,
      loadAvatar: action,
    });

    logger.info("AvatarStore initialized");
    this.loadAvatar();
  }

  loadAvatar() {
    logger.debug("Loading avatar from storage");
    const avatarFiles = fileStore
      .getFilesByCategory("images")
      .filter((file) => file.name.startsWith("avatar_"));

    if (avatarFiles.length > 0) {
      const latestAvatar = avatarFiles.sort(
        (a, b) => b.updatedAt - a.updatedAt
      )[0];
      this.avatarFileId = latestAvatar.id;
      this.avatar = latestAvatar.data as string;
      logger.info("Custom avatar loaded", { id: latestAvatar.id });
    } else {
      this.avatar = UserAvatar;
      this.avatarFileId = null;
      logger.info("Using default avatar");
    }
  }

  setAvatar(newAvatar: string) {
    this.avatar = newAvatar;

    if (newAvatar !== UserAvatar) {
      logger.debug("Setting custom avatar");
      if (this.avatarFileId) {
        logger.debug("Removing previous avatar", { id: this.avatarFileId });
        fileStore.removeFile(this.avatarFileId);
      }

      const avatarFileId = fileStore.addFile({
        name: `avatar_${Date.now()}`,
        type: "image/png",
        size: newAvatar.length,
        data: newAvatar,
      });

      if (avatarFileId) {
        this.avatarFileId = avatarFileId;
        logger.info("New avatar saved", { id: avatarFileId });
      } else {
        logger.error("Failed to save avatar");
      }
    } else {
      logger.debug("Setting default avatar");
      if (this.avatarFileId) {
        fileStore.removeFile(this.avatarFileId);
        this.avatarFileId = null;
      }
    }
  }
}

export const avatarStore = new AvatarStore();
