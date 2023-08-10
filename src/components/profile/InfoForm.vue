<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { UserInfo } from '@/ts/interfaces/userinfo.interface'
import { FormInstance, FormRules, UploadRawFile } from 'element-plus'
import useUserInfoStore from '@/store/userInfoStore'
import { Plus } from '@element-plus/icons-vue'
import { BASE_URL } from '@/constants'
import { ApiResult } from '@/ts/interfaces/request.interface'

const props = defineProps<{
	disabled: boolean
}>()

// const infoForm = reactive<UserInfo>({
const infoForm = reactive<any>({
	id: '',
	nickName: '',
	realName: '',
	headPhoto: ''
})

// 表单的引用对象
const infoFormRef = ref<FormInstance>()
// 表单校验
const infoFormRules = reactive<FormRules<UserInfo>>({
	nickName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	realName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	headPhoto: [{ required: false }]
})

// 挂载用户信息于表单
const userInfoStore = useUserInfoStore()
const userinfo = userInfoStore.userInfo
onBeforeMount(() => {
	Object.assign(infoForm, userinfo)
})

const beforeAvatarUpload = (rawFile: UploadRawFile) => {
	// Awaitable<void | undefined | null | boolean | File | Blob>
	console.log(rawFile)
}

const handleSucess = (response: ApiResult<string>) => {
	infoForm.headPhoto = response.data
}

const handleError = () => {
	console.log('失败')
}
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
		<el-form-item label="头像:" prop="headPhoto">
			<el-upload
				class="avatar-uploader"
				method="post"
				:action="BASE_URL + '/upload'"
				name="image"
				:headers="{
					Authorization: userInfoStore.userInfo.token
				}"
				:multiple="false"
				:on-success="handleSucess"
				:on-error="handleError"
				:show-file-list="false"
				:disabled="props.disabled"
			>
				<img
					v-if="infoForm.headPhoto"
					:src="infoForm.headPhoto"
					class="avatar"
				/>
				<el-icon v-else class="avatar-uploader-icon">
					<Plus />
				</el-icon>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<div>
				<slot
					name="main"
					:infoForm="infoForm"
					:infoFormRef="infoFormRef"
				></slot>
			</div>
		</el-form-item>
	</el-form>
</template>

<style scoped>
:deep(.avatar) {
	width: 178px;
	height: 178px;
	display: block;
}

:deep(.el-upload) {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
	border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
}
</style>
