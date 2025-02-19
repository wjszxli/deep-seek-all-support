import { BrowserWindow, ipcMain } from "electron";
import axios, { AxiosRequestConfig } from "axios";

export function setupRequestHandlers(win: BrowserWindow) {
  ipcMain.handle(
    "http-request",
    async (_, config: AxiosRequestConfig & { body?: Record<string, unknown> }) => {
      try {
        const { body, ...axiosConfig } = config;
        console.log("📡 发送请求:", config);
        axiosConfig.data = JSON.stringify(body);

        if (body?.stream === true) {
          const response = await axios({
            ...axiosConfig,
            responseType: "stream",
          });

          response.data.on("data", (chunk: Buffer) => {
            const str = chunk.toString();
            console.log("📡 接收流式数据:", str);
            win.webContents.send("update-message", str);
          });

          return { success: true };
        }

        const response = await axios(axiosConfig);
        console.log("📡 接收的响应数据:", response.data);
        return { success: true, data: response.data };
      } catch (error) {
        console.log("📡 请求错误:", error);
        return { success: false, error: (error as Error).message };
      }
    }
  );
}
