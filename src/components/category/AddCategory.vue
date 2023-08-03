<script lang="ts" setup>
import { formGet } from '@/api/request'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import {
	CategoryInfo,
	AddCategoryForm
} from '@/ts/interfaces/catogory.interface'
import { appJsonPost } from '@/api/request'
const props = defineProps<{
	addDialogShow: boolean
}>()
const emit = defineEmits<{
	'update:addDialogShow': [addDialogShow: boolean] // 具名元组语法
}>()

// 关闭dialog
const handleClose = (done: () => void) => {
	// ! bug 没有reset表格
	done()
	emit('update:addDialogShow', false)
}

const formData = reactive<AddCategoryForm>({
	natureId: '',
	name: ''
})

// 表单的引用对象
const formRef = ref<FormInstance>()
// 表单校验
const rules = reactive<FormRules<AddCategoryForm>>({
	name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
	natureId: [{ required: true, message: '请选择大类', trigger: 'blur' }]
})

let selectForm: any = reactive([])
onMounted(() => {
	formGet<CategoryInfo[]>({
		url: '/nature/selectAll'
	}).then(res => {
		selectForm.push(...res.data)
	})
})

const handleCancel = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	emit('update:addDialogShow', false)
	formEl.resetFields()
}

const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid, fields) => {
		if (valid) {
			appJsonPost<AddCategoryForm, any>({
				url: '/category/add',
				data: { ...formData }
			})
				.then(res => {
					ElMessage.success(res.data)
					emit('update:addDialogShow', false)
				})
				.catch(err => {
					ElMessage.error(err.data)
				})
		} else {
			console.log('error submit!', fields)
		}
	})
}
</script>

<template>
	<el-dialog
		v-model="props.addDialogShow"
		title="新增分类"
		width="40%"
		:before-close="handleClose"
		:show-close="true"
	>
		<el-form
			ref="formRef"
			:rules="rules"
			:model="formData"
			label-width="120px"
		>
			<el-form-item label="选择大分类:" prop="natureId">
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
			<el-form-item label="类别名称" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
		</el-form>

		<template #footer class="dialog-footer">
			<el-button @click="handleCancel(formRef)">取 消</el-button>
			<el-button type="primary" @click="onSubmit(formRef)"
				>确 定</el-button
			>
		</template>
	</el-dialog>
</template>

<style lang=""></style>
