import { LoginForm } from "./login.interface"
import { UserInfo } from "./userinfo.interface"

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
	attributes: any
	code: number
	data: T
	failed: boolean
	success: boolean
	msg: string
	total: any
}

// ApiResult data 返回结果
export interface AppJsonPostDataResult extends UserInfo {
}