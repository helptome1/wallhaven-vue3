import {ajax} from '@/utils/ajax'

export const getHotPicture = () => {
    return ajax('search?&categories=111&purity=100&sorting=hot&page=1')
}