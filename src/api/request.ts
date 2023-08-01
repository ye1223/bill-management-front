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

export async function formGet<T>(
	config: ApiFormGetParams
): Promise<ApiResult<T>> {
	const response = await formGetInstance.get<ApiResult<T>>(config.url, {
		params: config.params
	})
	return response.data
}

export async function formPost<T>(
	config: ApiFormPostParams
): Promise<ApiResult<T>> {
	const response = await formPostInstance.post<ApiResult<T>>(config.url, {
		params: config.data
	})
	return response.data
}

export async function appJsonPost<T>(
	config: ApiAppJsonPostParams
): Promise<ApiResult<T>> {
	const response = await appJsonPostInstance.post<ApiResult<T>>(
		config.url,
		{
			params: config.data
		}
	)
	return response.data
}
