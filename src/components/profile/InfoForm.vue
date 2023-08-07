<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { UserInfo } from '@/ts/interfaces/userinfo.interface'
import { FormInstance, FormRules } from 'element-plus'
import useUserInfoStore from '@/store/userInfoStore'

const props = defineProps<{
	disabled: boolean
}>()

const infoForm = reactive<UserInfo>({
	id: '',
	nickName: '',
	realName: ''
})

// 表单的引用对象
const infoFormRef = ref<FormInstance>()
// 表单校验
const infoFormRules = reactive<FormRules<UserInfo>>({
	nickName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	realName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
})

// 挂载用户信息于表单
const userInfoStore = useUserInfoStore()
const userinfo = userInfoStore.userInfo
onBeforeMount(() => {
	Object.assign(infoForm, userinfo)
})
</script>

<template>
	<el-form
		:rules="infoFormRules"
		:model="infoForm"
		label-width="100px"
		label-position="right"
		ref="infoFormRef"
	>
		<el-form-item label="用户编号:">
			<el-input v-model="infoForm.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="昵称:" prop="nickName">
			<el-input
				v-model="infoForm.nickName"
				clearable
				:disabled="props.disabled"
			></el-input>
		</el-form-item>
		<el-form-item label="姓名:" prop="realName">
			<el-input
				v-model="infoForm.realName"
				clearable
				:disabled="props.disabled"
			></el-input>
		</el-form-item>
		<el-form-item>
			<div>
				<slot name="main" :infoForm="infoForm" :infoFormRef="infoFormRef"></slot>
			</div>
		</el-form-item>
	</el-form>
</template>
