import { defineStore } from 'pinia'
import { getDownLoadingLists,getDownLoadedLists } from '@/utils/utils'

export const downloadStore = defineStore('downloadProcess', {
    state: () => {
        return { 
            downlistArr: getDownLoadingLists(),
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