import path from "path";

import { config } from "dotenv";
import { app, ipcMain } from "electron";
import serveNextAt from "next-electron-server";

import { createWindow } from "@main/helpers/createWindow";


// Load environment variables from .env file (shared between main and renderer processes)
config({ path: ".env" });

// Determine whether we are running in production or development mode
const isProd = process.env.NODE_ENV === "production";

// Start the Next.js server
serveNextAt("next://app", {
    outputDir: "./app",
    port: 8888
});

(async () => {
    await app.whenReady();

    const mainWindow = createWindow("main", {
        title: "Nextron Boilerplate",
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (isProd) {
        await mainWindow.loadURL("next://app/home");
    } else {
        await mainWindow.loadURL("next://app/home");
        mainWindow.webContents.openDevTools();
    }
})();

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("message", async (event, arg) => {
    event.reply("message", `${arg} World!`);
});
