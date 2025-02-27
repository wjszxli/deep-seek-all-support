import { StoreProvider } from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import { ITheme } from "@/typings";
import Index from "@/pages/Index";

const App = () => {
  return (
    <StoreProvider>
      <ThemeProvider defaultTheme={ITheme.light}>
        <AntdProvider>
          <Index />
        </AntdProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
