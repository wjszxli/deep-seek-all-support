import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ChatPage from "@/pages/Chat";
import TranslatePage from "@/pages/Translate";
import FilePage from "@/pages/File";
import MiniAppPage from "@/pages/MiniApp";
import KnowledgeBasePage from "@/pages/KnowledgeBase";
import AgentPage from "@/pages/Agent";
import SettingPage from "@/pages/Setting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "translate",
        element: <TranslatePage />,
      },
      {
        path: "file",
        element: <FilePage />,
      },
      {
        path: "miniApp",
        element: <MiniAppPage />,
      },
      {
        path: "knowledgeBase",
        element: <KnowledgeBasePage />,
      },
      {
        path: "agent",
        element: <AgentPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/chat" replace />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter; 