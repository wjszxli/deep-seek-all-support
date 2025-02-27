import { makeObservable, observable, action } from "mobx";
import { getLogger } from "@/utils/logger";

const logger = getLogger("UserStore");

const USER_NAME_KEY = "app_user_name";
const USER_AVATAR_KEY = "app_user_avatar";

class UserStore {
  userName: string = "";
  avatar: string = "";

  constructor() {
    makeObservable(this, {
      userName: observable,
      avatar: observable,
      setUserName: action,
      setAvatar: action,
      loadUserData: action,
    });

    this.loadUserData();
    logger.info("UserStore initialized");
  }

  loadUserData() {
    logger.debug("Loading user data from localStorage");
    try {
      const storedName = localStorage.getItem(USER_NAME_KEY);
      if (storedName) {
        this.userName = storedName;
        logger.debug("Username loaded from localStorage");
      }

      const storedAvatar = localStorage.getItem(USER_AVATAR_KEY);
      if (storedAvatar) {
        this.avatar = storedAvatar;
        logger.debug("Avatar loaded from localStorage");
      }
    } catch (error) {
      logger.error("Error loading user data from localStorage", error);
    }
  }

  setUserName(name: string) {
    this.userName = name;
    try {
      localStorage.setItem(USER_NAME_KEY, name);
      logger.debug("Username saved to localStorage", { name });
    } catch (error) {
      logger.error("Failed to save username to localStorage", error);
    }
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
    try {
      localStorage.setItem(USER_AVATAR_KEY, avatar);
      logger.debug("Avatar saved to localStorage");
    } catch (error) {
      logger.error("Failed to save avatar to localStorage", error);
    }
  }
}

const userStore = new UserStore();
export default userStore;
