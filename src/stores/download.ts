import { defineStore } from 'pinia'

export const downloadStore = defineStore('downloadProcess', {
    state: () => {
        return { downlistArr: [] }
    },
    actions: {
        copyDownlist(newVal: any) {
            this.downlistArr = newVal
        }
    },
})