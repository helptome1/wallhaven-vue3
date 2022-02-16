// 数据懒加载
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// 1、参数一target表示被监听的DOM元素
// 2、参数二是回调函数，用于通知监听的动作（回调函数的第一个形参isIntersecting表示被监听的元素已经进入了可视区）
// 3、参数三 表示配置选项

export const useLazyData = (apiFn: Function) => {
    const result = ref([])
    const target = ref(null)
    // stop 是停止观察是否进入或移出可视区域的行为
    const { stop } = useIntersectionObserver(
        // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
        target,
        // isIntersecting 是否进入可视区域，true是进入 false是移出
        // observerElement 被观察的dom
        ([{ isIntersecting }], observerElement) => {
            // 在此处可根据isIntersecting来判断，然后做业务
            if (isIntersecting) {
                console.log('进入可视区域')
                // stop()
                // 调用API函数获取数据。
                apiFn().then(({ data }) => {
                    result.value = data.data
                })
            }
        },
        // 配置选项，相交的比例大于0就触发。
        {
            threshold: 0
        }
    )
    return { result, target }
}