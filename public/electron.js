const { app, BrowserWindow, ipcMain } = require("electron");
const contextMenu = require("electron-context-menu");
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const os = require("os");
const https = require("https");
const ytdl = require("ytdl-core");
const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg")
  .path.replace("app.asar", "app.asar.unpacked");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

contextMenu({});

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
      event.sender.send("URLYoutubeResponse", "Downloading...");

      const format = ytdl.chooseFormat(data.formats, { quality: "highestvideo" });
      const outputFilePath = `${data.videoDetails.title}`;
      const outputFilePathConverted = outputFilePath.replace(/\?/g, "");
      const appPath = path.join(os.homedir(), "Downloads");
      const videoFileName = path.join(appPath, outputFilePathConverted + "_video.mp4");
      const audioFileName = path.join(appPath, outputFilePathConverted + "_audio.m4a");

      const videoStream = ytdl.downloadFromInfo(data, { format: format });
      const audioStream = ytdl.downloadFromInfo(data, {
        quality: "highestaudio",
        filter: "audioonly",
        format: "m4a"
      });

      const videoOutput = fs.createWriteStream(videoFileName);
      const audioOutput = fs.createWriteStream(audioFileName);

      videoStream.pipe(videoOutput);
      audioStream.pipe(audioOutput);

      let videoFinished = false;
      let audioFinished = false;

      videoOutput.on("finish", () => {
        videoFinished = true;
        if (audioFinished) {
          ffmpeg()
            .input(videoFileName)
            .input(audioFileName)
            .outputOptions("-c:v copy")
            .audioCodec("aac")
            .save(path.join(appPath, `${outputFilePathConverted}.mp4`))
            .on("error", (error) => {
              console.error("Error merging audio and video:", error);
              event.sender.send("URLYoutubeResponse", error);
            })
            .on("end", () => {
              fs.unlinkSync(videoFileName);
              fs.unlinkSync(audioFileName);
              console.log(`Finished downloading and merging: ${outputFilePathConverted}`);
              event.sender.send("URLYoutubeResponse", "Download finished");
            });
        };
      });

      audioOutput.on("finish", () => {
        audioFinished = true;
        if (videoFinished) {
          ffmpeg()
            .input(videoFileName)
            .input(audioFileName)
            .outputOptions("-c:v copy")
            .audioCodec("aac")
            .save(path.join(appPath, `${outputFilePathConverted}.mp4`))
            .on("error", (error) => {
              console.error("Error merging audio and video:", error);
              event.sender.send("URLYoutubeResponse", error);
            })
            .on("end", () => {
              fs.unlinkSync(videoFileName);
              fs.unlinkSync(audioFileName);
              console.log(`Finished downloading and merging: ${outputFilePathConverted}`);
              event.sender.send("URLYoutubeResponse", "Download finished");
            });
        };
      });
    }).catch((error) => {
      console.error(error);
      event.sender.send("URLYoutubeResponse", "This YouTube link is incorrect");
    });
  } catch (error) {
    console.log(error);
  };
});

ipcMain.on("URLMusicYoutube", async (event, message) => {
  try {
    ytdl.getInfo(message).then((data) => {
      event.sender.send("URLMusicYoutubeResponse", "Downloading...");

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
            event.sender.send("URLMusicYoutubeResponse", error);
          })
          .on("end", () => {
            fs.unlinkSync(fileName);
            console.log(`Finished downloading and converting: ${outputFilePath}`);
            event.sender.send("URLMusicYoutubeResponse", "Download finished");
          })
          .save(`${fileName}.mp3`);
      });
    }).catch((error) => {
      console.error(error);
      event.sender.send("URLMusicYoutubeResponse", "This YouTube link is incorrect");
    });
  } catch (error) {
    console.log(error);
  };
});

ipcMain.on("URLTikTok", async (event, message) => {
  try {
    event.sender.send("URLTikTokResponse", "Downloading...");

    TiktokDownloader(message, {
      version: "v3"
    }).then((data) => {
      const url = data.result.video_hd;
      const nickname = data.result.author.nickname;
      const appPath = path.join(os.homedir(), "Downloads");
      const dateNow = new Date(Date.now());
      const dateID = dateNow.getTime();
      const fileName = path.join(appPath, `${nickname}_${dateID}.mp4`);
      const fileStream = fs.createWriteStream(fileName);

      fileStream.on("finish", () => {
        console.log("Download finished");
        event.sender.send("URLTikTokResponse", "Download finished");
      });

      try {
        https.get(url, res => res.pipe(fileStream));
      } catch (error) {
        console.log(error);
      };
    }).catch((error) => {
      console.error(error);
      event.sender.send("URLTikTokResponse", "This TikTok link is incorrect");
    });
  } catch (error) {
    console.log(error);
  };
});
