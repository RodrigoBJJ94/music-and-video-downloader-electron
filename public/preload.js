const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getURLYoutube: (args) => ipcRenderer.send("URLYoutube", args)
});
