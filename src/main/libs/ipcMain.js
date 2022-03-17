const { log } = require('console');
const { app, ipcMain, session, shell, DownloadItem, dialog } = require('electron');
const path = require("path")
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
        win.webContents.downloadURL(url)
    }
    // 设置下载路径
    ipcMain.on('set-path', (event, data = {}) => {
        if (data.path) {
            if (data.path !== 'noPath') app.setPath('downloadPath', data.path)
            // 向渲染进程通信
            event.reply('set-path-reply', app.getPath('downloads'))
        }
    })

    // 监听下载的文件
    // 监听 will-download
    win.webContents.session.on('will-download', (event, item, webContents) => {
        try {
            const url = item.getURL()
            let loadInfo = cacheDownItem[url] || {}

            // 无需对话框提示， 直接将文件保存到默认路径
            // app.getPath用来获取系统的基础路径。
            const filePath = path.join(app.getPath("downloads"), item.getFilename())
            console.log("path", filePath);
            item.setSavePath(filePath)

            // 上次监听下载的数据量
            let prevReceivedBytes = 0

            // 监听下载进行中时的事件
            item.on('updated', (event, state) => {
                if (state === 'interrupted') {
                    console.log('Download is interrupted but can be resumed')
                } else if (state === 'progressing') {
                    if (item.isPaused()) {
                        console.log('Download is paused')
                    } else {
                        let receivedBytes = item.getReceivedBytes()
                        // 下载的总字节数。
                        loadInfo.receivedBytes = receivedBytes
                        // 下载的速度
                        loadInfo.speedBytes = receivedBytes - prevReceivedBytes
                        // 下载状态
                        loadInfo.state = 'loading'
                        // 下载地址
                        loadInfo.loadPath = filePath
                        // 记录这次监听接收到的数据是多少
                        prevReceivedBytes = receivedBytes
                        // 通知渲染进程，更新下载状态
                        //  JSON.parse(JSON.stringify(loadInfo)深拷贝，但是有缺陷。
                        win.webContents.send('downloadItemState', JSON.parse(JSON.stringify(loadInfo)))
                    }
                }
            })
            // 下载完成时的事件
            item.once('done', (event, state) => {
                if (state === 'completed') {
                    // 更新下载状态
                    loadInfo.state = 'done'
                    win.webContents.send('downloadItemState', JSON.parse(JSON.stringify(loadInfo)))
                    console.log('Download successfully')
                } else {
                    console.log(`Download failed: ${state}`)
                }
            })
        } catch {

        }
    })
}

module.exports = {
    mainWindowIpcStart
}