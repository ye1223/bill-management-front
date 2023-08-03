// 使用表单下拉框重复请求
import { reactive, onMounted } from 'vue'
import { formGet } from '@/api/request'
import { CategoryInfo } from '@/ts/interfaces/catogory.interface'

const useSelectForm = () => {
	let selectForm: any = reactive([])
	onMounted(() => {
		formGet<CategoryInfo[]>({
			url: '/nature/selectAll'
		}).then(res => {
			selectForm.push(...res.data)
		})
	})
    return {
        selectForm
    }
}

export default useSelectForm
