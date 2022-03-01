/**
 * 下载文件
 * @param {*} obj 
 */
export const downloadImage = (obj: any) => {
    // window.icp.send('down-file', obj)
    /* return new Promise((resolve, reject) => {
        ipcRenderer.once(`down-file-${obj.id}`, (e, data) => resolve(data))
    }) */
    window.icp.send('download-img', obj)
}