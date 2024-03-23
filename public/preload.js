const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getURLYoutube: (args) => ipcRenderer.send("URLYoutube", args),
  getURLYoutubeResponse: (callback) => ipcRenderer.on("URLYoutubeResponse",
    (event, data) => {
      callback(data)
    }),
  getURLMusicYoutube: (args) => ipcRenderer.send("URLMusicYoutube", args),
  getURLMusicYoutubeResponse: (callback) => ipcRenderer.on("URLMusicYoutubeResponse",
    (event, data) => {
      callback(data)
    }),
  getURLTikTok: (args) => ipcRenderer.send("URLTikTok", args),
  getURLTikTokResponse: (callback) => ipcRenderer.on("URLTikTokResponse",
    (event, data) => {
      callback(data)
    })
});
