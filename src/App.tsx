import { HashRouter, Route, Routes } from "react-router-dom";

// import Index from "@/pages/Index";

import Left from "@/components/Left";
import { AppProviders } from "./providers";

const App = () => {
  return (
    <AppProviders>
      <HashRouter>
        {/* <NavigationHandler /> */}
        <Left />
        <Routes>{/* <Route path="/" element={<Index />} /> */}</Routes>
      </HashRouter>
    </AppProviders>
  );
};

export default App;
