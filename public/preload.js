const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getURLYoutubeHD: (args) => ipcRenderer.send("URLYoutubeHD", args),
  getURLYoutubeHDResponse: (callback) => ipcRenderer.on("URLYoutubeHDResponse",
    (event, data) => {
      callback(data)
    }),
  getURLYoutube: (args) => ipcRenderer.send("URLYoutube", args),
  getURLYoutubeResponse: (callback) => ipcRenderer.on("URLYoutubeResponse",
    (event, data) => {
      callback(data)
    }),
  getURLYoutubeMusic: (args) => ipcRenderer.send("URLYoutubeMusic", args),
  getURLYoutubeMusicResponse: (callback) => ipcRenderer.on("URLYoutubeMusicResponse",
    (event, data) => {
      callback(data)
    }),
  getURLTikTokHD: (args) => ipcRenderer.send("URLTikTokHD", args),
  getURLTikTokHDResponse: (callback) => ipcRenderer.on("URLTikTokHDResponse",
    (event, data) => {
      callback(data)
    }),
  getURLTikTok: (args) => ipcRenderer.send("URLTikTok", args),
  getURLTikTokResponse: (callback) => ipcRenderer.on("URLTikTokResponse",
    (event, data) => {
      callback(data)
    }),
  getURLTikTokAudio: (args) => ipcRenderer.send("URLTikTokAudio", args),
  getURLTikTokAudioResponse: (callback) => ipcRenderer.on("URLTikTokAudioResponse",
    (event, data) => {
      callback(data)
    })
});
