import { USER_INFO_KEY } from '@/constants'
import { UserInfo } from '@/ts/interfaces/userinfo.interface'
import { getItem } from '@/util/storage'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useUserInfoStore = defineStore('userInfo', () => {
	// 如果回话存储没有USER_INFO_KEY，使用默认的
	const userInfo = reactive<UserInfo>(
		getItem(USER_INFO_KEY)
			? JSON.parse(getItem(USER_INFO_KEY) as string)
			: {
					id: -1,
					nickName: '',
					realName: ''
			  }
	)
	const changeUserInfo = (payload: any) => {
		Object.assign(userInfo, payload)
	}
	return {
		userInfo,
		changeUserInfo
	}
})

export default useUserInfoStore
