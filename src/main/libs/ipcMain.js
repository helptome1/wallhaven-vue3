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

    // 下载图片
    ipcMain.on("download-img", function (e, data) {
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
        console.log("url",url)
        win.webContents.downloadURL(url)
    }

    // 监听下载的文件
    // 监听 will-download
    win.webContents.session.on('will-download', (event, item, webContents) => {
        try {
            console.log("event", event);
            console.log("item", item);
            console.log("webContents", webContents);
            // 监听下载进行中时的事件
            item.on('updated',(event, state)=>{})
            // 下载完成时的事件
            item.on('done', (event, state) => {

            })
        } catch {

        }
    })
}

module.exports = {
    mainWindowIpcStart
}