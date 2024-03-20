const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const os = require("os");
const ytdl = require("ytdl-core");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#093F6C",
      symbolColor: "#FFFFFF",
      height: 28
    },
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: isDev
        ? path.join(app.getAppPath(), "./public/preload.js")
        : path.join(app.getAppPath(), "./build/preload.js")
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.openDevTools({
        mode: "detach"
      })
    });
  };
};

app.setPath(
  "userData",
  isDev
    ? path.join(app.getAppPath(), "userData/")
    : path.join(process.resourcesPath, "userData/")
);

app.whenReady()
  .then(async () => {
    await createWindow();
  });

app.on("activate", () => {
  if (mainWindow.getAllWindows().length === 0) {
    createWindow();
  };
});

process.on("uncaughtException", (error) => {
  console.log(`Exemption ${error}`);
  if (process.platform !== "darwin") {
    app.quit();
  };
});

ipcMain.on("URLYoutube", async (event, message) => {
  try {
    ytdl.getInfo(message).then((data) => {
      const format = ytdl.chooseFormat(data.formats, { quality: "18" });
      const outputFilePath = `${data.videoDetails.title}.mp4`;
      const outputFilePathConverted = outputFilePath.replace(/\?/g, "");
      const appPath = path.join(os.homedir(), "Downloads");
      const fileName = path.join(appPath, outputFilePathConverted);
      const outputStream = fs.createWriteStream(fileName);

      ytdl.downloadFromInfo(data, { format: format }).pipe(outputStream);

      outputStream.on("finish", () => {
        console.log(`Finished downloading: ${outputFilePath}`);
      });
    }).catch((err) => {
      console.error(err);
    });
  } catch (error) {
    console.log(error);
  };
});
