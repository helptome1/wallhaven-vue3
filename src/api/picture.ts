import request  from '@/utils/request'

export const getHotPicture = () => {
    return request('/search?&categories=111&purity=100&sorting=hot&page=1', 'get')
}