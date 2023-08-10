<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useUpdatePwdStore from '@/store/useUpdatePwdStore'
import { ElMessage, FormInstance } from 'element-plus'
import { appJsonPost } from '@/api/request'

interface UpdatePwd {
	oldPwd: string
	newPwd: string
}

const updatePwdStore = useUpdatePwdStore()
const handleCancel = () => {
	updatePwdStore.changeVisibility()
}

const formData = reactive({
	oldPwd: '',
	newPwd: ''
})
const formRef = ref()
const rules = reactive({
	oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
	newPwd: [
		{ required: true, message: '请输入新密码密码', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位密码', trigger: 'blur' }
	]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			appJsonPost<UpdatePwd, string>({
				url: '/user/updatePwd',
				data: { ...formData }
			})
				.then(res => {
					updatePwdStore.changeVisibility()
					ElMessage.success(res.data)
				})
				.catch(err => {
					ElMessage.error(err.msg)
				})
		} else {
			console.log('error submit!', fields)
		}
	})
}
</script>

<template>
	<el-dialog
		title="修改密码"
		v-model="updatePwdStore.visibility"
		:before-close="handleCancel"
	>
		<el-form :rules="rules" :model="formData" ref="formRef">
			<el-form-item
				label="原始密码:"
				label-width="120"
				prop="oldPwd"
			>
				<el-input
					v-model="formData.oldPwd"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item label="新密码:" label-width="120" prop="newPwd">
				<el-input
					v-model="formData.newPwd"
					show-password
				></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="handleCancel">取 消</el-button>
			<el-button type="primary" @click="onSubmit(formRef)"
				>确 定</el-button
			>
		</div>
	</el-dialog>
</template>

<style scoped></style>
