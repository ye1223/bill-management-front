import { LoginForm } from "./login.interface"
import { UserInfo } from "./userinfo.interface"

type TypeId = {
	id: number
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

export interface ApiAppJsonPostParams<P> {
	url: string
	data: P
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
export interface LoginResult extends UserInfo {}