I using Electron, React and the libraries: "@ffmpeg-installer/ffmpeg", fluent-ffmpeg,
and I have this codes that is working very well:

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ipcMain.on("URLYoutube", async (event, message) => {
  try {
    ytdl.getInfo(message).then((data) => {
      event.sender.send("URLYoutubeResponse", "Downloading...");

      // Choose the format with 1080p video
      const format = ytdl.chooseFormat(data.formats, { quality: "137" });
      const outputFilePath = `${data.videoDetails.title}.mp4`;
      const outputFilePathConverted = outputFilePath.replace(/\?/g, "");
      const appPath = path.join(os.homedir(), "Downloads");
      const videoFileName = path.join(appPath, outputFilePathConverted + "_video.mp4");
      const audioFileName = path.join(appPath, outputFilePathConverted + "_audio.m4a");
      console.log("Video file path:", videoFileName); // Add this line for debugging
      console.log("Audio file path:", audioFileName); // Add this line for debugging


      // Download video and audio separately
      const videoStream = ytdl.downloadFromInfo(data, { format: format });
      const audioStream = ytdl.downloadFromInfo(data, { quality: "highestaudio", filter: "audioonly", format: "m4a" });

      const videoOutput = fs.createWriteStream(videoFileName);
      const audioOutput = fs.createWriteStream(audioFileName);

      videoStream.pipe(videoOutput);
      audioStream.pipe(audioOutput);

      // Wait for both video and audio to finish downloading
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
            .save(`${outputFilePathConverted}.mp4`)
            .on("error", (error) => {
              console.error("Error merging audio and video:", error);
              event.sender.send("URLYoutubeResponse", "Error merging audio and video");
            })
            .on("end", () => {
              fs.unlinkSync(videoFileName);
              fs.unlinkSync(audioFileName);
              console.log(`Finished downloading and merging: ${outputFilePathConverted}`);
              event.sender.send("URLYoutubeResponse", "Download finished");
            });
        }
      });

      audioOutput.on("finish", () => {
        audioFinished = true;
        if (videoFinished) {
          ffmpeg()
            .input(videoFileName)
            .input(audioFileName)
            .outputOptions("-c:v copy")
            .audioCodec("aac")
            .save(`${outputFilePathConverted}.mp4`)
            .on("error", (error) => {
              console.error("Error merging audio and video:", error);
              event.sender.send("URLYoutubeResponse", "Error merging audio and video");
            })
            .on("end", () => {
              fs.unlinkSync(videoFileName);
              fs.unlinkSync(audioFileName);
              console.log(`Finished downloading and merging: ${outputFilePathConverted}`);
              event.sender.send("URLYoutubeResponse", "Download finished");
            });
        }
      });
    }).catch((error) => {
      console.error(error);
      event.sender.send("URLYoutubeResponse", "This YouTube link is incorrect");
    });
  } catch (error) {
    console.log(error);
  };
});

The code is workings, the only problem isn't saving in the Dowloads folder, it's saving in the application folder


This is my logs:

[1] App Path: C:\Users\rodrigo.brentano\Downloads
[1] Video File Path: C:\Users\rodrigo.brentano\Downloads\Audioslave - Be Yourself (Album Version, Closed Captioned).mp4_video.mp4
[1] Audio File Path: C:\Users\rodrigo.brentano\Downloads\Audioslave - Be Yourself (Album Version, Closed Captioned).mp4_audio.m4a
[1] Finished downloading and merging: Audioslave - Be Yourself (Album Version, Closed Captioned).mp4

Have not errors, the path is right in the logs, but the video isn't saving in the Dowloads folder, is saving in the application folder


// This code donwload videos with 360p

ipcMain.on("URLYoutube", async (event, message) => {
  try {
    ytdl.getInfo(message).then((data) => {
      event.sender.send("URLYoutubeResponse", "Downloading...");

      const format = ytdl.chooseFormat(data.formats, { quality: "18" });
      const outputFilePath = `${data.videoDetails.title}.mp4`;
      const outputFilePathConverted = outputFilePath.replace(/\?/g, "");
      const appPath = path.join(os.homedir(), "Downloads");
      const fileName = path.join(appPath, outputFilePathConverted);
      const outputStream = fs.createWriteStream(fileName);

      ytdl.downloadFromInfo(data, { format: format }).pipe(outputStream);

      outputStream.on("finish", () => {
        console.log(`Finished downloading: ${outputFilePath}`);
        event.sender.send("URLYoutubeResponse", "Download finished");
      });
    }).catch((error) => {
      console.error(error);
      event.sender.send("URLYoutubeResponse", "This YouTube link is incorrect");
    });
  } catch (error) {
    console.log(error);
  };
});

// This code donwload musics in the mp3 format

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

And now I need a code to download videos with 1080p, but in in videos with 1080p the audio isn't together, so I need a code to merge the video and the audio


Video file path: C:\Users\rodrigo.brentano\Downloads\Audioslave - Be Yourself (Album Version, Closed Captioned)_video.mp4

Audio file path: C:\Users\rodrigo.brentano\Downloads\Audioslave - Be Yourself (Album Version, Closed Captioned)_audio.m4a

I get this logs, but isn't saving in my Downloads folder, it's saving in the folder of the application