const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

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
