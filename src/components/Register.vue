<script lang="ts" setup>
import { formPost } from '@/api/request'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { RegisterForm } from '@/ts/interfaces/login.interface'
import Toast from './UI/Toast'
// 表单验证
import type { Rules } from 'async-validator'
import Schema from 'async-validator'

import Vcode from 'vue3-puzzle-vcode'
const props = defineProps<{
	registerDiaVisible: boolean
}>()

const emit = defineEmits<{
	'update:registerDiaVisible': [registerDiaVisible: boolean]
}>()

// vcode滑动验证
const isShow = ref(false)
const onClose = () => {
	isShow.value = !isShow.value
}
const onSuccess = () => {
	// 验证码成功
	formPost<RegisterForm, string>({
		url: '/user/register',
		data: form as RegisterForm
	})
		.then(res => {
			isShow.value = !isShow.value
			emit('update:registerDiaVisible', false)
			Toast.success(res.msg)
		})
		.catch(err => {
			isShow.value = !isShow.value
			Toast.error(err.msg)
		})
}

const staticModal = ref<HTMLDivElement>()
watch(
	() => props.registerDiaVisible,
	() => {
		staticModal.value?.classList.toggle('hidden')
	}
)

// 关闭model
const handleClose = () => {
	emit('update:registerDiaVisible', false)
}

const formRef = ref()
const form = reactive({
	nickName: '',
	realName: '',
	pwd: ''
})

const rules: Rules = {
	nickName: {
		type: 'string', // 使用预设类型校验规则
		required: true // 必填
	},
	realName: {
		type: 'string',
		required: true
	},
	pwd: {
		type: 'string',
		required: true
	}
}
// 创建校验对象
const validator = new Schema(rules)
const handleSubmit = () => {
	validator.validate(form, (errors) => {
		if (errors) {
			console.log(errors)
			Toast.error('字段不符合要求')
		} else {
			isShow.value = !isShow.value
		}
	})
}
</script>

<template>
	<div
		ref="staticModal"
		id="staticModal"
		data-modal-backdrop="static"
		tabindex="-1"
		aria-hidden="true"
		class="model fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
	>
		<div
			class="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-full"
		>
			<!-- Modal content -->
			<div
				class="relative bg-white rounded-lg shadow dark:bg-gray-700"
			>
				<!-- Modal header -->
				<div
					class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
				>
					<h3
						class="text-xl font-semibold text-gray-900 dark:text-white"
					>
						注册属于您的账号😇
					</h3>
					<button
						@click="handleClose"
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="staticModal"
					>
						<svg
							class="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-6 space-y-6">
					<form
						class="space-y-4 md:space-y-6"
						onsubmit="return false"
						ref="formRef"
					>
						<div>
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								昵称
							</label>
							<input
								v-model="form.nickName"
								type="text"
								name="name"
								id="name"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="输入你的昵称"
								required
							/>
						</div>
						<div>
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								真实姓名
							</label>
							<input
								v-model="form.realName"
								type="text"
								name="name"
								id="name"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="输入你的真实姓名"
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

						<button
							type="button"
							@click="handleSubmit"
							class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							提交
						</button>
					</form>
				</div>
				<!-- Modal footer -->
				<div
					class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				></div>
			</div>
		</div>
	</div>

	<Vcode :show="isShow" @success="onSuccess" @close="onClose" />
</template>

<style scoped>
:global(.vue-puzzle-vcode) {
	z-index: 10000;
}
</style>
