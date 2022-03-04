import { defineStore } from 'pinia'
import { getDownLoadingLists } from '@/utils/utils'

export const downloadStore = defineStore('downloadProcess', {
    state: () => {
        return { downlistArr: getDownLoadingLists() }
    },
    actions: {
        copyDownlist(newVal: any) {
            this.downlistArr = newVal
        }
    },
})