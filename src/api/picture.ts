import request from '@/utils/request'

export const getHotPicture = () => {
    return request('/api/v1', 'get')
}