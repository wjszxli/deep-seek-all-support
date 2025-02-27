import { makeObservable, observable, action, computed } from "mobx";
import { getLogger } from "@/utils/logger";

// Initialize logger for this module
const logger = getLogger("FileStore");

// File metadata interface
export interface FileData {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string | ArrayBuffer; // Base64 string for images/files or raw data
  createdAt: number;
  updatedAt: number;
}

export type FileCategory = "images" | "documents" | "other";

class FileStore {
  files: Record<FileCategory, Record<string, FileData>> = {
    images: {},
    documents: {},
    other: {},
  };

  storageLimits: Record<FileCategory, number> = {
    images: 20 * 1024 * 1024,
    documents: 20 * 1024 * 1024,
    other: 10 * 1024 * 1024,
  };

  constructor() {
    makeObservable(this, {
      files: observable,
      storageLimits: observable,
      addFile: action,
      removeFile: action,
      updateFile: action,
      clearCategory: action,
      clearAllFiles: action,
      setStorageLimit: action,
      totalStorageUsed: computed,
      getCategorySize: computed,
    });
    logger.info("FileStore initialized");
  }

  // Get the appropriate category based on file type
  private getFileCategory(fileType: string): FileCategory {
    if (fileType.startsWith("image/")) return "images";
    if (
      fileType.includes("document") ||
      fileType.includes("text") ||
      fileType.endsWith("pdf")
    )
      return "documents";
    return "other";
  }

  addFile(
    file: Omit<FileData, "id" | "createdAt" | "updatedAt">
  ): string | null {
    const category = this.getFileCategory(file.type);

    if (
      this.getCategorySize[category] + file.size >
      this.storageLimits[category]
    ) {
      logger.warn(`Storage limit exceeded for category: ${category}`, {
        fileSize: file.size,
        categorySize: this.getCategorySize[category],
        limit: this.storageLimits[category]
      });
      return null;
    }

    const id = `file_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const timestamp = Date.now();

    this.files[category][id] = {
      ...file,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    logger.debug(`File added to category ${category}`, { id, name: file.name });
    return id;
  }

  removeFile(id: string, category?: FileCategory): boolean {
    if (category) {
      if (this.files[category][id]) {
        delete this.files[category][id];
        logger.debug(`File removed: ${id}`);
        return true;
      }
      logger.debug(`Failed to remove file: ${id} - not found`);
      return false;
    }

    for (const cat of Object.keys(this.files) as FileCategory[]) {
      if (this.files[cat][id]) {
        delete this.files[cat][id];
        logger.debug(`File removed: ${id}`);
        return true;
      }
    }

    logger.debug(`Failed to remove file: ${id} - not found`);
    return false;
  }

  updateFile(
    id: string,
    updatedData: Partial<Omit<FileData, "id" | "createdAt" | "updatedAt">>
  ): boolean {
    for (const category of Object.keys(this.files) as FileCategory[]) {
      if (this.files[category][id]) {
        this.files[category][id] = {
          ...this.files[category][id],
          ...updatedData,
          updatedAt: Date.now(),
        };
        return true;
      }
    }
    return false;
  }

  getFile(id: string): FileData | null {
    for (const category of Object.keys(this.files) as FileCategory[]) {
      if (this.files[category][id]) {
        return this.files[category][id];
      }
    }
    return null;
  }

  getFilesByCategory(category: FileCategory): FileData[] {
    return Object.values(this.files[category]);
  }

  getAllFiles(): FileData[] {
    const allFiles: FileData[] = [];
    for (const category of Object.keys(this.files) as FileCategory[]) {
      allFiles.push(...Object.values(this.files[category]));
    }
    return allFiles;
  }

  clearCategory(category: FileCategory): void {
    this.files[category] = {};
  }

  clearAllFiles(): void {
    this.files = {
      images: {},
      documents: {},
      other: {},
    };
  }

  setStorageLimit(category: FileCategory, limitInBytes: number): void {
    this.storageLimits[category] = limitInBytes;
  }

  get totalStorageUsed(): number {
    let total = 0;
    for (const category of Object.keys(this.files) as FileCategory[]) {
      total += this.getCategorySize[category];
    }
    return total;
  }

  get getCategorySize(): Record<FileCategory, number> {
    const sizes: Record<FileCategory, number> = {
      images: 0,
      documents: 0,
      other: 0,
    };

    for (const category of Object.keys(this.files) as FileCategory[]) {
      sizes[category] = Object.values(this.files[category]).reduce(
        (sum, file) => sum + file.size,
        0
      );
    }

    return sizes;
  }
}

export const fileStore = new FileStore();
