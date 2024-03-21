const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const os = require("os");
const ytdl = require("ytdl-core");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

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
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.log(error);
  };
});

ipcMain.on("URLMusicYoutube", async (event, message) => {
  try {
    ytdl.getInfo(message).then((data) => {
      const format = ytdl.chooseFormat(data.formats, {
        quality: "highestaudio",
        filter: "audioonly",
        format: "m4a"
      });

      const outputFilePath = `${data.videoDetails.title}`;
      const outputFilePathConverted = outputFilePath.replace(/\?/g, "");
      const appPath = path.join(os.homedir(), "Downloads");
      const fileName = path.join(appPath, outputFilePathConverted);
      const audioStream = ytdl.downloadFromInfo(data, { format: format });
      const outputStream = fs.createWriteStream(fileName);

      audioStream.pipe(outputStream);

      outputStream.on("finish", () => {
        ffmpeg(fileName)
          .toFormat("mp3")
          .on("error", (error) => {
            console.error("Error converting:", error);
          })
          .on("end", () => {
            fs.unlinkSync(fileName);
            console.log(`Finished downloading and converting: ${outputFilePath}`);
          })
          .save(`${fileName}.mp3`);
      });
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.log(error);
  }
});
