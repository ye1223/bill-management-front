import {
	ApiAppJsonPostParams,
	ApiFormGetParams,
	ApiFormPostParams,
	ApiResult
} from '@/ts/interfaces/request.interface'
import {
	formGetInstance,
	formPostInstance,
	appJsonPostInstance
} from '@/util/request'
// import { AxiosResponse } from 'axios'

export async function formGet<T>(
	config: ApiFormGetParams
): Promise<ApiResult<T>> {
	const response = await formGetInstance.get<ApiResult<T>>(config.url, {
		params: config.params,
		headers: {
			Authorization: config.Authorization,
			"Content-Type": config.contentType
		},
		responseType: config.responseType as any,
		responseEncoding: 'utf8'
	})
	console.log(config)
	//@ts-ignore
	return response
}

export async function formPost<P, T>(
	config: ApiFormPostParams<P>
): Promise<ApiResult<T>> {
	const response = await formPostInstance.post<ApiResult<T>>(
		config.url,
		config.data
	)
	// @ts-ignore
	return response
}

// P 发送的data参数类型
// T 返回data数据的类型
export async function appJsonPost<P, T>(
	config: ApiAppJsonPostParams<P>
): Promise<ApiResult<T>> {
	const response = await appJsonPostInstance.post<ApiResult<T>>(
		config.url, // 请求地址
		config.data // payload参数
	)
	// @ts-ignore
	return response
}
