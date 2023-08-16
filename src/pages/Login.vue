<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { appJsonPost } from '@/api/request'
import { LoginForm } from '@/ts/interfaces/login.interface'
import { LoginResult } from '@/ts/interfaces/request.interface'
import useUserInfoStore from '@/store/userInfoStore'
import { TOKEN_KEY } from '@/constants'
import { useRouter } from 'vue-router'
import { setItem } from '@/util/storage'
import Toast from '@/components/UI/Toast/index'
import Register from '@/components/Register.vue'

const formRef = ref()
const form = reactive<LoginForm>({
	name: '',
	pwd: ''
})


const userInfoStore = useUserInfoStore()
const router = useRouter()
const handleLogin = () => {
	// todo 引入表单校验
	appJsonPost<LoginForm, LoginResult>({
		url: '/user/login',
		data: form
	})
		.then(res => {
			userInfoStore.changeUserInfo(res.data)
			setItem(TOKEN_KEY, res.data.token)
			router.replace('/category/manage')
			Toast.success('欢迎进入账单管理系统!')
		})
		.catch(err => {
			Toast.error(err.msg)
		})
}

const registerDiaVisible = ref(false)
const openRegisterDia = () => {
	registerDiaVisible.value = true
}
</script>

<template>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div
			class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
		>
			<a
				href='javascript:;'
				class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
			>
				<!-- <img class="w-8 h-8 mr-2" alt="logo" /> -->
				💵 账单管理系统
			</a>
			<div
				class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
			>
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1
						class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
					>
						登入你的账号
					</h1>
					<form
						class="space-y-4 md:space-y-6"
						action="#"
						ref="formRef"
					>
						<div>
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								账号
							</label>
							<input
								v-model="form.name"
								type="text"
								name="name"
								id="name"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="输入你的账号🌟"
								required
							/>
						</div>
						<div>
							<label
								for="pwd"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								密码
							</label>
							<input
								v-model="form.pwd"
								type="passwrd"
								name="pwd"
								id="pwd"
								placeholder="••••••••"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
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
										:required="false"
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
							>
								忘记密码？
							</a>
						</div>
						<button
							@click="handleLogin"
							class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							登录
						</button>
						<p
							class="text-sm font-light text-gray-500 dark:text-gray-400"
						>
							还没有账号？
							<a
								href='javascript:;'
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								@click="openRegisterDia"
							>
								注册
							</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>



	<Register v-model:registerDiaVisible="registerDiaVisible" />
</template>

<style scoped></style>