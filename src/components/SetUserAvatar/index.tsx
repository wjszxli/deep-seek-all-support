import { Avatar, Input, Modal, Upload, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAvatar } from "@/hooks/useAvatar";
import { observer } from "mobx-react-lite";
import userStore from "@/stores/userStore";
import { RcFile } from "antd/es/upload";
import { compressImage } from "@/utils";
import { avatarStore } from "@/stores/avatarStore";
import { getLogger } from "@/utils/logger";

import "./index.scss";

const logger = getLogger("SetUserAvatar");

interface UserPopupProps {
  open: boolean;
  setClose: () => void;
}

const SetUserAvatarContainer: React.FC<UserPopupProps> = observer(
  ({ open, setClose }) => {
    const { avatar } = useAvatar();
    const { t } = useTranslation();

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      userStore.setUserName(e.target.value);
    };

    const handleAvatarUpload = async (file: RcFile) => {
      logger.debug("Avatar upload initiated", {
        fileName: file.name,
        fileSize: file.size,
      });

      try {
        const compressedFile = await compressImage(file, 200);
        logger.debug("Image compressed successfully");

        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            const base64Avatar = e.target.result as string;

            userStore.setAvatar(base64Avatar);
            avatarStore.setAvatar(base64Avatar);

            logger.info("Avatar successfully updated and stored");
            message.success(t("settings.avatar.update_success"));
          }
        };

        reader.onerror = (error) => {
          logger.error("Error reading compressed avatar file", error);
          message.error(t("settings.avatar.update_error"));
        };

        reader.readAsDataURL(compressedFile);
        return false;
      } catch (error) {
        logger.error("Failed to process avatar image", error);
        message.error(t("settings.avatar.update_error"));
        return false;
      }
    };

    return (
      <Modal
        width="300px"
        open={open}
        footer={null}
        onOk={setClose}
        onCancel={setClose}
        destroyOnClose={true}
        maskClosable={true}
        closable={true}
        centered
        className="avatar-modal-content"
      >
        <div className="avatar-upload-container">
          <Upload
            customRequest={() => {}}
            accept="image/png, image/jpeg"
            itemRender={() => null}
            maxCount={1}
            beforeUpload={handleAvatarUpload}
          >
            <Avatar src={userStore.avatar || avatar} className="user-avatar" />
          </Upload>
        </div>

        <div className="username-container">
          <Input
            placeholder={t("settings.general.user_name.placeholder")}
            value={userStore.userName}
            onChange={handleUserNameChange}
            className="username-input"
            maxLength={30}
          />
        </div>
      </Modal>
    );
  }
);

export default SetUserAvatarContainer;
