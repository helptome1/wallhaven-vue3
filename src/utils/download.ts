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
/**
 * 更新下载状态，从主进程中获取到下载的状态。
 */

export const downloadState = (callback: Function) => {
    window.icp.receive('downloadItemState', (data: any) => {
        callback(data)
    })
}