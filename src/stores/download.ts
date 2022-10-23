import { defineStore } from 'pinia'
import { getDownLoadingLists,getDownLoadedLists } from '@/utils/utils'

export const downloadStore = defineStore('downloadProcess', {
    state: () => {
        return { 
            downlistArr: [] as any[], // 下载列表
            donelist: getDownLoadedLists()
        }
    },
    actions: {
        copyDownlist(newVal: any) {
            this.downlistArr = newVal
        },
        copyDonelist(newVal:any) {
            this.donelist = newVal
        }
    },
})