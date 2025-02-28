import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import "./index.scss";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="page-transition-container">
      <div
        key={location.pathname}
        className="page-content page-fade"
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition; 