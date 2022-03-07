const {
  contextBridge,
  ipcRenderer
} = require("electron");
const validChannels = ['downloadItemState']
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('icp', {
  send: (channel, data) => {
    // 事件白名单，懒的话可以不写直接send
    ipcRenderer.send(channel, data);
  },
  receive: (channel, callback) => {
    if (validChannels.includes(channel)) {
      // Filtering the event param from ipcRenderer
      const newCallback = (_, data) => callback(data);
      ipcRenderer.on(channel, newCallback);
    }
  }
}
);