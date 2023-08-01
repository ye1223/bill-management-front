<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import usePaeticles from '@/hooks/useParticles'
import { appJsonPost } from '@/api/request'
import { LoginForm } from '@/ts/interfaces/login.interface'
import { AppJsonPostDataResult } from '@/ts/interfaces/request.interface'


//表单绑定的响应式对象
const loginForm = reactive<LoginForm>({
	username: '',
	password: ''
})

//表单的引用对象
const loginFormRef = ref<FormInstance>()

const loginRules = reactive<FormRules<LoginForm>>({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位用户名', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位密码', trigger: 'blur' }
	]
})

//提交表单函数
/* const submitForm = () => {
	//1.校验表单
	loginFormRef.value.validate(valid => {})
	//2.拿到表单内容，提交后台
	//3.设置token值
	//localStorage.setItem('token','this is just a test token')
} */


const submitForm = async (formEl: FormInstance | undefined) => {
	console.log('1111', loginFormRef)
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			// console.log('submit!', valid, fields, loginForm)
			appJsonPost<AppJsonPostDataResult>({
				url: '/api/user/login',
				data: loginForm
			}).then((res) => {
				console.log(res.data.token)
			}).catch(err=>{
				console.log(err)
			})
		} else {
			console.log('error submit!', fields)
		}
	})
}

const { options, particlesInit, particlesLoaded } = usePaeticles()
</script>

<template>
	<div>
		<vue-particles
			id="tsparticles"
			:particlesInit="particlesInit"
			:particlesLoaded="particlesLoaded"
			:options="options"
		></vue-particles>
		<div class="formContainer">
			<h1>记账系统</h1>
			<el-form
				ref="loginFormRef"
				:model="loginForm"
				:rules="loginRules"
				status-icon
				label-width="80px"
				class="loginForm"
			>
				<el-form-item label="用户名" prop="username">
					<el-input
						v-model="loginForm.username"
						type="text"
						autocomplete="off"
					/>
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input
						v-model="loginForm.password"
						type="password"
						autocomplete="off"
					/>
				</el-form-item>

				<el-form-item>
					<el-button
						type="primary"
						@click="submitForm(loginFormRef)"
						>登录</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.formContainer {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	width: 600px;
	height: 400px;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba($color: #fafafa, $alpha: 0.6);
	color: 050505;
	text-align: center;
	border-radius: 40px;

	h1 {
		margin-top: 20px;
	}
	.loginForm {
		margin: 30px;
	}
}

.el-form {
	display: block;
}

::v-deep .el-form-item__label {
	font-size: 15px;
}
</style>
