import { ReactNode, useEffect } from "react";
import { LoggerAPI, LogLevel } from "@/utils/logger";

interface LogProviderProps {
  children: ReactNode;
}

// Get environment from browser context
const getEnvironment = (): string => {
  // For development environments
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    return "development";
  }

  // For production environments
  return "production";
};

/**
 * Initializes and configures the application logging system
 */
export function LogProvider({ children }: LogProviderProps) {
  useEffect(() => {
    // Set up logger based on environment
    const env = getEnvironment();

    if (env === "production") {
      LoggerAPI.configure({
        minLevel: LogLevel.INFO,
        enableStackTrace: false,
      });
    } else if (env === "development") {
      LoggerAPI.configure({
        minLevel: LogLevel.DEBUG,
        enableStackTrace: true,
      });
    } else if (env === "test") {
      LoggerAPI.configure({
        minLevel: LogLevel.NONE, // Disable logging during tests
      });
    }

    // Check for URL parameters that might control logging
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const logLevel = urlParams.get("log_level");
      if (logLevel) {
        const levelName = logLevel.toUpperCase();
        const level = LogLevel[levelName as keyof typeof LogLevel];
        if (level !== undefined) {
          LoggerAPI.setLevel(level);
        }
      }
    } catch (e) {
      // Ignore URL parameter errors
    }
  }, []);

  return <>{children}</>;
}
