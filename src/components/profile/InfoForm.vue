<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { UserInfo } from '@/ts/interfaces/userinfo.interface'
import { FormInstance, FormRules } from 'element-plus'

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

// const onSubmit = () => {
//     // 表单验证提交
// }

// const emit = defineEmits<{
// 	// change: [id: number] // 具名元组语法
// 	updateData: []
// }>()
</script>

<template>
	<el-form
		:rules="infoFormRules"
		:model="infoForm"
		label-width="100px"
		label-position="right"
		ref="updateForm"
	>
		<el-form-item label="用户编号:">
			<el-input v-model="infoForm.id" disabled></el-input>
		</el-form-item>
		<el-form-item label="昵称:" prop="nickName">
			<el-input v-model="infoForm.nickName" clearable></el-input>
		</el-form-item>
		<el-form-item label="姓名:" prop="realName">
			<el-input v-model="infoForm.realName" clearable></el-input>
		</el-form-item>
		<el-form-item>
			<div>
				<slot :infoForm="infoForm"></slot>
			</div>
		</el-form-item>
	</el-form>
</template>
