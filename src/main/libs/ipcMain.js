const { app, ipcMain, session, shell, DownloadItem, dialog } = require('electron');
// const path = require("path")
const fs = require('fs');


//缓存下载项
let cacheDownItem = {}


const mainWindowIpcStart = function (win) {
    // 打开调试
    ipcMain.on("toggle_dev_tools", function (event, arg) {
        win.webContents.toggleDevTools();
    })

    // 重启
    ipcMain.on("restart", function () {
        app.relaunch();
        app.exit(0)
    })

    // 最小化
    ipcMain.on("min", function () {
        win.minimize()
    })

    // 最大化
    ipcMain.on("max", function () {
        if (win.isMaximized()) {
            win.unmaximize()
        } else {
            win.maximize()
        }
    })

    // 关闭程序
    ipcMain.on("close", function () {
        console.log("close");
        win.close();
    })

    // 下载
    ipcMain.on("down-file", function (e, data) {
        let { url } = data
        if (!cacheDownItem[url]) {
            cacheDownItem[url] = { ...data }
            downfile(url)
        } else {
            /*   e.sender("down-file", "文件正在下载") */
        }
    })

    // 下载文件
    const downfile = (url) => {
        session.defaultSession.downloadURL(url)
    }
}

module.exports = {
    mainWindowIpcStart
}