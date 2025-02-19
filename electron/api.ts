import { ipcMain } from "electron";
import axios, { AxiosRequestConfig } from "axios";

declare global {
  // eslint-disable-next-line no-var
  var mainWindow: Electron.BrowserWindow | undefined;
}

export function setupRequestHandlers() {
  ipcMain.handle(
    "http-request",
    async (_, config: AxiosRequestConfig & { body?: any }) => {
      try {
        const { body, ...axiosConfig } = config;
        console.log('📡 发送请求:', body);

        if (body?.stream === true) {
          const response = await axios({
            ...axiosConfig,
            responseType: "stream",
          });

          response.data.on("data", (chunk: Buffer) => {
            global.mainWindow?.webContents.send(
              "stream-data",
              chunk.toString()
            );
          });

          return { success: true };
        }

        const response = await axios(axiosConfig);
        return { success: true, data: response.data };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  );
}
