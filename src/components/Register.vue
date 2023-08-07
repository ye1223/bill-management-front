<script lang="ts" setup>
import { formPost } from '@/api/request'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { RegisterForm } from '@/ts/interfaces/login.interface'
import Vcode from 'vue3-puzzle-vcode'
const props = defineProps<{
	registerDiaVisible: boolean
}>()

const emit = defineEmits<{
	'update:registerDiaVisible': [registerDiaVisible: boolean]
}>()

const handleCancel = () => {
	emit('update:registerDiaVisible', false)
}

//表单绑定的响应式对象
const formData = reactive({
	nickName: '',
	realName: '',
	pwd: ''
})

// 表单的引用对象
const formRef = ref()
// 表单校验
const rules = reactive({
	nickName: [
		{ required: true, message: '请输入昵称', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位昵称', trigger: 'blur' }
	],
	realName: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位用户名', trigger: 'blur' }
	],
	pwd: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位密码', trigger: 'blur' }
	]
})

const onClose = () => {
	isShow.value = !isShow.value
}
const onSuccess = () => {
	// 验证码成功
	formPost<RegisterForm, string>({
		url: '/user/register',
		data: { ...formData }
	})
		.then(res => {
			isShow.value = !isShow.value
			ElMessage.success(res.data)
		})
		.catch(err => {
			isShow.value = !isShow.value
			ElMessage.error(err.msg)
		})
}

const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid, fields) => {
		if (valid) {
			isShow.value = !isShow.value
		} else {
			console.log('error submit!', fields)
		}
	})
}

const isShow = ref(false)
</script>

<template>
	<el-dialog
		title="用户注册"
		v-model="props.registerDiaVisible"
		:before-close="handleCancel"
	>
		<el-form :rules="rules" :model="formData" ref="formRef">
			<el-form-item label="昵称:" label-width="120" prop="nickName">
				<el-input v-model="formData.nickName" />
			</el-form-item>
			<el-form-item label="姓名:" label-width="120" prop="realName">
				<el-input v-model="formData.realName" />
			</el-form-item>
			<el-form-item label="密码:" label-width="120" prop="pwd">
				<el-input v-model="formData.pwd" show-password />
			</el-form-item>
			<div>
				<el-button @click="handleCancel">取 消</el-button>
				<el-button type="primary" @click="onSubmit(formRef)">
					确 定
				</el-button>
			</div>
		</el-form>
	</el-dialog>
	<Vcode :show="isShow" @success="onSuccess" @close="onClose" />
</template>

<style lang="scss" scoped>
:global(.vue-puzzle-vcode) {
	z-index: 10000;
}
</style>
