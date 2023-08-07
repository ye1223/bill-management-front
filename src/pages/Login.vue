<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import usePaeticles from '@/hooks/useParticles'
import { appJsonPost } from '@/api/request'
import { LoginForm } from '@/ts/interfaces/login.interface'
import { LoginResult } from '@/ts/interfaces/request.interface'
import { TOKEN_KEY } from '@/constants'
import { setItem } from '@/util/storage'
import useUserInfoStore from '@/store/userInfoStore'
import { useRouter } from 'vue-router'
import Register from '@/components/Register.vue'

//表单绑定的响应式对象
const loginForm = reactive<LoginForm>({
	name: '111',
	pwd: '111'
})

// 表单的引用对象
const loginFormRef = ref<FormInstance>()
// 表单校验
const loginRules = reactive<FormRules<LoginForm>>({
	name: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位用户名', trigger: 'blur' }
	],
	pwd: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 3, max: 10, message: '请输入3-10位密码', trigger: 'blur' }
	]
})

const userInfoStore = useUserInfoStore()
const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			appJsonPost<LoginForm, LoginResult>({
				url: '/user/login',
				data: { ...loginForm }
			})
				.then(res => {
					userInfoStore.changeUserInfo(res.data)
					setItem(TOKEN_KEY, res.data.token)
					router.replace('/category/manage')
				})
				.catch(err => {
					ElMessage.error(err.msg)
				})
		} else {
			console.log('error submit!', fields)
		}
	})
}

const { options, particlesInit, particlesLoaded } = usePaeticles()

const registerDiaVisible = ref(false)
const openRegisterDia = () => {
	registerDiaVisible.value = true
}
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
				<el-form-item label="用户名" prop="name">
					<el-input
						v-model="loginForm.name"
						type="text"
						autocomplete="off"
					/>
				</el-form-item>

				<el-form-item label="密码" prop="pwd">
					<el-input
						v-model="loginForm.pwd"
						type="password"
						autocomplete="off"
					/>
				</el-form-item>

				<div style="text-align: right; margin: -15px 0 15px 0">
					<el-link
						@click.native="openRegisterDia"
						type="primary"
					>
						还没有账号，立即注册
					</el-link>
				</div>

				<el-form-item>
					<el-button
						type="primary"
						@click="submitForm(loginFormRef)"
						>登录</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<Register v-model:registerDiaVisible="registerDiaVisible" />
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

:deep .el-form-item__label {
	font-size: 15px;
}
</style>
