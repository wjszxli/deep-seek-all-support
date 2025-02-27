import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { PersistProvider } from "./PersistProvider";
import { LogProvider } from "./LogProvider";
import { StoreProvider } from "./StoreProvider";
interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StoreProvider>
      <LogProvider>
        <PersistProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PersistProvider>
      </LogProvider>
    </StoreProvider>
  );
}
