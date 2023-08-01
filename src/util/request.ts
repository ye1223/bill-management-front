import axios,
{
    InternalAxiosRequestConfig,
    AxiosRequestConfig,
    AxiosError,
    AxiosInstance,
    AxiosResponse
} from "axios"
import { BASE_URL, TOKEN_KEY } from "@/constants"
import { getItem, clearStorage } from "./storage"
import qs from 'qs'


// axios基本配置
const baseConfig: AxiosRequestConfig = {
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 10, //ms
    headers: {
        "Content-Type": "application/json" //默认内容类型
    }
}

// 配置axios实例拦截器方法
const addInterceptors = (req: AxiosInstance) => {
    // 1.请求拦截器
    req.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        // 让每次请求都携带Authorization请求头
        
        config.headers['Authorization'] = getItem(TOKEN_KEY)
        return config
    }, (error: AxiosError) => {
        console.log("请求发送失败", error)
    })

    // 2.响应拦截器
    req.interceptors.response.use((response: AxiosResponse) => {
        let result = response.data
        if (result.success) {
            return result
        } else {
            if (result.code && result.code === 50001) {
                // 无权限(token校验失败或用户已删除)
                clearStorage()
                window.location.reload()
            }
            return Promise.reject(result)
        }
    })
}


const formGetInstance = axios.create(baseConfig)
addInterceptors(formGetInstance)

const formPostInstance = axios.create({
    ...baseConfig,
    "method": "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformRequest: [function (data) {
        // data:自己传的真正的参数
        return qs.stringify(data)
    }]
})
addInterceptors(formPostInstance)


const appJsonPostInstance = axios.create({
    ...baseConfig,
    method: "post"
});
addInterceptors(appJsonPostInstance)

export {
    formGetInstance,
    formPostInstance,
    appJsonPostInstance
}