<script lang="ts" setup>
import { appJsonPost, formGet } from '@/api/request'
// import useSelectForm from '@/hooks/useSelectForm'
import { CategoryInfo, TableList } from '@/ts/interfaces/catogory.interface'
import { ElMessage, FormInstance } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
const props = defineProps<{
	updateDialogShow: boolean
	updateId: number
}>()
const emit = defineEmits<{
	'update:updateDialogShow': [updateDialogShow: boolean],
    'refreshTable': []
}>()

const formData = reactive({
	id: -1,
	natureId: '',
	name: ''
})
const formRef = ref()
const rules = reactive({
	id: [{ required: false }],
	name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
	natureId: [{ required: true, message: '请选择大类', trigger: 'blur' }]
})

// dialog打开时，根据id获取数据
const handleOpen = () => {
	formGet<TableList>({
		url: '/category/selectById',
		params: { id: props.updateId }
	})
		.then(res => {
			Object.assign(formData, res.data)
		})
		.catch(err => {
			ElMessage.error(err.msg)
		})
}
// dialog X 的回调
const handleClose = () => {
	emit('update:updateDialogShow', false)
}

// 获取下拉列表hook
const selectForm: any = reactive([])
onMounted(() => {
	formGet<CategoryInfo[]>({
		url: '/nature/selectAll'
	}).then(res => {
		selectForm.push(...res.data)
	})
})

const handleCancel = () => {
	emit('update:updateDialogShow', false)
}
const onSubmit = (formEl: FormInstance) => {
	formEl.validate((valid, fields) => {
		if (valid) {
			appJsonPost<any, any>({
				url: '/category/updateById',
				data: { ...formData }
			})
				.then(res => {
                    emit('update:updateDialogShow', false)
                    emit('refreshTable')
					ElMessage.success(res.data)
				})
				.catch(err => {
					ElMessage.error(err.mag)
				})
		} else {
			console.log('error submit!', fields)
		}
	})
}
</script>
<template>
	<el-dialog
		title="编辑分类"
		v-model="props.updateDialogShow"
		@open="handleOpen"
		:before-close="handleClose"
	>
		<el-form
			:rules="rules"
			:model="formData"
			label-width="120px"
			ref="formRef"
		>
			<el-form-item label="编号">
				<el-input v-model="formData.id" disabled></el-input>
			</el-form-item>
			<el-form-item label="大分类名:" prop="natureId">
				<el-select
					v-model="formData.natureId"
					placeholder="支出"
					:fit-input-width="true"
				>
					<el-option
						v-for="one in selectForm"
						:label="one.name"
						:value="one.id"
						:key="one.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="名称:" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
		</el-form>
		<template #footer class="dialog-footer">
			<el-button @click="handleCancel">取 消</el-button>
			<el-button type="primary" @click="onSubmit(formRef)"
				>确 定</el-button
			>
		</template>
	</el-dialog>
</template>

<style lang=""></style>
