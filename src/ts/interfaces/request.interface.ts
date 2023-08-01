import { LoginForm } from "./login.interface"

type TypeId = {
	id: string
}
// 参数
export interface ApiFormGetParams {
	url: string
	params?: TypeId
}

export interface ApiFormPostParams {
	url: string
	data: TypeId
}

export interface ApiAppJsonPostParams {
	url: string
	data: LoginForm
}

// 返回结果
export interface ApiResult<T> {
	code: number
	msg: string
	data: T
}

// ApiResult data 返回结果
export interface AppJsonPostDataResult {
	token: string
}