import { isMac } from "@/utils";
import { useAvatar } from "@/hooks/useAvatar";
import { Avatar } from "antd";
import { FC, useMemo, useCallback, useState } from "react";

import SetUserAvatar from "@/components/SetUserAvatar";

import "./index.scss";

const LeftContainer: FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <div id="app-sidebar" className="left-container" style={style}>
      {children}
    </div>
  );
};

const AvatarComponent: FC<{ src: string }> = ({ src }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Avatar
        src={src}
        draggable={false}
        className="left-avatar nodrag"
        onClick={handleOpen}
      />
      {open && <SetUserAvatar open={open} setClose={handleClose} />}
    </>
  );
};

const Left: FC = () => {
  const { avatar } = useAvatar();
  const windowStyle = "transparent";

  const macTransparentWindow = isMac && windowStyle === "transparent";

  const leftBgColor = macTransparentWindow
    ? "transparent"
    : "var(--navbar-background)";
  const minAppShow = false;

  const containerStyle = useMemo(
    () => ({
      backgroundColor: leftBgColor,
      zIndex: minAppShow ? 10000 : "initial",
    }),
    [leftBgColor, minAppShow]
  );

  return (
    <LeftContainer style={containerStyle}>
      <AvatarComponent src={avatar} />
    </LeftContainer>
  );
};

export default Left;
