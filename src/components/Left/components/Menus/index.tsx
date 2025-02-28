import { Tooltip } from "antd";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import {
  ChatIcon,
  TranslateIcon,
  FileIcon,
  MiniAppIcon,
  KnowledgeBaseIcon,
  AgentIcon,
  SettingIcon,
} from "@/utils/constant";
import { getLogger } from "@/utils/logger";

import "./index.scss";

const logger = getLogger("LeftMenu");

const menusList = [
  {
    icon: ChatIcon,
    title: "chat",
    path: "/chat",
  },
  {
    icon: TranslateIcon,
    title: "translate",
    path: "/translate",
  },
  {
    icon: FileIcon,
    title: "file",
    path: "/file",
  },
  {
    icon: MiniAppIcon,
    title: "miniApp",
    path: "/miniApp",
  },
  {
    icon: KnowledgeBaseIcon,
    title: "knowledgeBase",
    path: "/knowledgeBase",
  },
  {
    icon: AgentIcon,
    title: "agent",
    path: "/agent",
  },
  {
    icon: SettingIcon,
    title: "setting",
    path: "/setting",
  },
];

const MainMenus: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // Determine active menu item based on current path
  const activePath = useMemo(() => {
    const currentPath = location.pathname;
    // Find the menu that matches the current path
    // If the current path is a sub-path (e.g., /chat/123), it will still match the parent path (/chat)
    return menusList.find(menu => 
      currentPath === menu.path || currentPath.startsWith(`${menu.path}/`)
    )?.path || "/chat"; // Default to chat if no match
  }, [location.pathname]);

  const handleMenuClick = (path: string) => {
    logger.debug(`Menu item clicked: ${path}`);
    navigate(path);
  };

  return (
    <div className="left-menus">
      {menusList.map((item) => {
        const isActive = item.path === activePath;
        return (
          <Tooltip
            key={item.title}
            title={t(`${item.title}.title`)}
            mouseEnterDelay={0.8}
            placement="left"
          >
            <div 
              className={`left-link ${isActive ? 'left-link-active' : ''}`} 
              onClick={() => handleMenuClick(item.path)}
              aria-label={t(`${item.title}.title`)}
            >
              <div className="menu-icon-container">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="menu-icon"
                />
                {isActive && <div className="active-indicator" />}
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default MainMenus;
