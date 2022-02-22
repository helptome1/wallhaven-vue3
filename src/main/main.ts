// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { mainWindowIpcStart: mainIpcStart } = require("./libs/ipcMain")

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    // 是否全屏显示，去掉控制中心。
    // frame: false,
    show: false,
    icon:path.resolve(__dirname, './images/logo.png'),
    backgroundColor:'#2e2c29',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      // webviewTag: true
      preload: path.join(__dirname, '/preload.js')
    },
  })
  if(app.isPackaged) {
    win.loadURL('dist/index.html')
  } else {
    win.loadURL("http://localhost:3000/")
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => { win.show() })
  /**
   * 监听关闭事件
   */
  ipcMain.on("close", function () {
    console.log("close");
    win.close();
  })
  return win
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
  // let mainWindow = createWindow()
  // mainIpcStart(mainWindow)
  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
