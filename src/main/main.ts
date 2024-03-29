// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const path = require('path')
const { mainWindowIpcStart: mainIpcStart } = require("./libs/ipcMain")
let winURL = path.resolve(__dirname, "../../dist/index.html");
function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1500,
    height: 888,
    // 是否全屏显示，去掉控制中心。
    frame: false,
    show: false,
    icon:path.resolve(__dirname, './images/logo.png'),
    backgroundColor:'#2e2c29',
    webPreferences: {
      // 资源跨域解决方法，但是是不安全的方法。
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      // webviewTag: true
      preload: path.join(__dirname, '/preload.js')
    },
  })

  if(app.isPackaged) {
    console.log("文件已经打包了")
    win.loadFile(winURL)
    // 注册快捷键
    registryShortcut()
  } else {
    win.loadFile(winURL)
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => { win.show() })
  return win
}
// 快捷键注册
function registryShortcut() {
  globalShortcut.register('CommandOrControl+J+K', () => {
    // 获取当前窗口
    BrowserWindow.getFocusedWindow().webContents.openDevTools();
  });
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  // createWindow()
  let mainWindow = createWindow()
  mainIpcStart(mainWindow)
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
