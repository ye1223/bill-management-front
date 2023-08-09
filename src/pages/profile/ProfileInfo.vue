<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import InfoForm from '@/components/profile/InfoForm.vue'
import { UserInfo } from '@/ts/interfaces/userinfo.interface'
import { appJsonPost } from '@/api/request'
import useUserInfoStore from '@/store/userInfoStore'
import { setItem } from '@/util/storage'
import { TOKEN_KEY } from '@/constants'

interface SlotProps {
	infoFormRef: FormInstance
	infoForm: UserInfo
}

defineSlots<{
	main(props: SlotProps): any
}>()

const show = ref(true)
const switchShow = () => {
	show.value = !show.value
}
const handleCancel = () => {
	switchShow()
}
const handleEdit = () => {
	switchShow()
}

const userInfoStore = useUserInfoStore()

const onSubmit = (props: SlotProps) => {
	props.infoFormRef.validate((valid, fields) => {
		if (valid) {
			console.log(props.infoForm)
			appJsonPost<UserInfo, UserInfo>({
				url: '/user/updateById',
				data: props.infoForm
			})
				.then(res => {
					// 更新用户信息和token信息
					userInfoStore.changeUserInfo(res.data)
					setItem(TOKEN_KEY, res.data.token)
					switchShow()
					ElMessage.success('更新成功')
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
	<el-card>
		<!-- 
			show: 展示哪个组件
			disabled: 控制输入框能否输入的状态
		 -->
		<InfoForm v-if="show" :disabled="true">
			<template #main>
				<el-button type="primary" @click="handleEdit()">
					修改
				</el-button>
			</template>
		</InfoForm>

		<InfoForm v-if="!show" :disabled="false">
			<template #main="slotProps">
				<el-button
					type="primary"
					@click="onSubmit(slotProps as SlotProps)"
				>
					提交
				</el-button>
				<el-button type="info" @click="handleCancel">
					取消
				</el-button>
			</template>
		</InfoForm>
	</el-card>
</template>

<style lang=""></style>
