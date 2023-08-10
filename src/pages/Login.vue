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
		<!-- <vue-particles
			id="tsparticles"
			:particlesInit="particlesInit"
			:particlesLoaded="particlesLoaded"
			:options="options"
		></vue-particles> -->
		<section class="bg-gray-50 dark:bg-gray-900">
			<div
				class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
			>
				<a
					href="#"
					class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						class="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Flowbite
				</a>
				<div
					class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
				>
					<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
						>
							Sign in to your account
						</h1>
						<form
							class="space-y-4 md:space-y-6"
							action="#"
						>
							<div>
								<label
									for="email"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Your email</label
								>
								<input
									type="email"
									name="email"
									id="email"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required="true"
								/>
							</div>
							<div>
								<label
									for="password"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Password</label
								>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required="true"
								/>
							</div>
							<div
								class="flex items-center justify-between"
							>
								<div class="flex items-start">
									<div
										class="flex items-center h-5"
									>
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required="true"
										/>
									</div>
									<div class="ml-3 text-sm">
										<label
											for="remember"
											class="text-gray-500 dark:text-gray-300"
										>
											记住我
										</label>
									</div>
								</div>
								<a
									href="#"
									class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
									>忘记密码?</a
								>
							</div>
							<button
								type="submit"
								class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								登入
							</button>
							<p
								class="text-sm font-light text-gray-500 dark:text-gray-400"
							>
								还没有账号吗？
								<a
									href="#"
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>注册</a
								>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
		<!-- <div class="formContainer">
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
		</div> -->
		<Register v-model:registerDiaVisible="registerDiaVisible" />
	</div>
</template>

<style lang="scss" scoped>
/* .formContainer {
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
} */
</style>
