import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUpdatePwdStore = defineStore('updatePwd', () => {
	const visibility = ref(false)
	const changeVisibility = () => {
		visibility.value = !visibility.value
	}
	return {
		visibility,
		changeVisibility
	}
})

export default useUpdatePwdStore
