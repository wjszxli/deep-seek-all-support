/**
 * Application Logging System
 * Provides structured logging capabilities with different log levels,
 * module tagging, and formatter options.
 */

// Log levels in order of severity
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4, // Used to disable logging
}

// Configuration interface for the logger
export interface LoggerConfig {
  minLevel: LogLevel;
  consoleOutput: boolean;
  moduleFilter?: string[];
  showTimestamp: boolean;
  showLevel: boolean;
  enableStackTrace: boolean;
}

// Helper to detect environment safely
const isProduction = (): boolean => {
  try {
    return (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    );
  } catch (e) {
    return false;
  }
};

// Default configuration
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: isProduction() ? LogLevel.INFO : LogLevel.DEBUG,
  consoleOutput: true,
  showTimestamp: true,
  showLevel: true,
  enableStackTrace: !isProduction(),
};

// Global configuration (can be updated at runtime)
let globalConfig: LoggerConfig = { ...DEFAULT_CONFIG };

// Format the log message with additional information
function formatLogMessage(
  level: LogLevel,
  module: string,
  message: string,
  data?: unknown
): string {
  const parts: string[] = [];

  // Add timestamp if enabled
  if (globalConfig.showTimestamp) {
    parts.push(`[${new Date().toISOString()}]`);
  }

  // Add log level if enabled
  if (globalConfig.showLevel) {
    parts.push(`[${LogLevel[level]}]`);
  }

  // Add module name
  parts.push(`[${module}]`);

  // Add message
  parts.push(message);

  // Format and add data if provided
  if (data !== undefined) {
    try {
      if (data instanceof Error) {
        parts.push(`\nError: ${data.message}`);
        if (globalConfig.enableStackTrace && data.stack) {
          parts.push(`\nStack: ${data.stack}`);
        }
      } else if (typeof data === "object") {
        parts.push(`\nData: ${JSON.stringify(data, null, 2)}`);
      } else {
        parts.push(`\nData: ${String(data)}`);
      }
    } catch (error) {
      parts.push(`\nData: [Could not stringify data: ${error}]`);
    }
  }

  return parts.join(" ");
}

// The main logger class
export class Logger {
  private moduleName: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  /**
   * Log a debug message
   */
  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Log an info message
   */
  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Log a warning message
   */
  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: unknown): void {
    this.log(LogLevel.ERROR, message, error);
  }

  /**
   * Generic log method that handles filtering and output
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    // Skip if log level is below minimum or module is filtered out
    if (
      level < globalConfig.minLevel ||
      (globalConfig.moduleFilter &&
        globalConfig.moduleFilter.length > 0 &&
        !globalConfig.moduleFilter.includes(this.moduleName))
    ) {
      return;
    }

    const formattedMessage = formatLogMessage(
      level,
      this.moduleName,
      message,
      data
    );

    // Output to console if enabled
    if (globalConfig.consoleOutput) {
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.ERROR:
          console.error(formattedMessage);
          break;
      }
    }

    // In the future, you could add file logging or remote logging here
  }
}

// API for configuring the logging system
export const LoggerAPI = {
  /**
   * Update the global logger configuration
   */
  configure(config: Partial<LoggerConfig>): void {
    globalConfig = { ...globalConfig, ...config };
  },

  /**
   * Reset the logger configuration to defaults
   */
  resetConfig(): void {
    globalConfig = { ...DEFAULT_CONFIG };
  },

  /**
   * Set the minimum log level
   */
  setLevel(level: LogLevel): void {
    globalConfig.minLevel = level;
  },

  /**
   * Filter logs to only show specific modules
   */
  filterModules(modules: string[]): void {
    globalConfig.moduleFilter = modules;
  },

  /**
   * Clear module filters
   */
  clearModuleFilter(): void {
    globalConfig.moduleFilter = undefined;
  },

  /**
   * Get the current configuration
   */
  getConfig(): LoggerConfig {
    return { ...globalConfig };
  },
};

/**
 * Create a new logger for a specific module
 */
export function getLogger(moduleName: string): Logger {
  return new Logger(moduleName);
}
