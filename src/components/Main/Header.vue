<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import useUserInfoStore from '@/store/userInfoStore'
import useUpdatePwdStore from '@/store/useUpdatePwdStore'
import UpdatePwd from '@/components/profile/UpdatePwd.vue'

const store = useUserInfoStore()
const router = useRouter()

const updatePwdStore = useUpdatePwdStore()

// 下拉框选项
const handleCommand = (command: string) => {
	// 参数command绑定的是下拉框item的command属性
	if (command === 'profile') {
		router.replace('/profile/info')
	} else if (command === 'pwd') {
		//
		updatePwdStore.changeVisibility()
	}
}

const avartarUrl = store.userInfo.headPhoto
</script>

<template>
	<el-row style="height: 60px">
		<el-col style="height: 60px" :span="12">
			<h1>记账系统</h1>
		</el-col>
		<el-col
			:span="12"
			class="f-right"
			style="text-align: right; line-height: 60px"
		>
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link">
					欢迎，{{ store.userInfo.realName }}
					<el-icon class="arrow">
						<arrow-down />
					</el-icon>
					<el-avatar
						shape="circle"
						size="middle"
						:src="avartarUrl"
					/>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="profile"
							>个人中心</el-dropdown-item
						>
						<el-dropdown-item command="pwd"
							>修改密码</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</el-col>
	</el-row>
	<UpdatePwd />
</template>

<style scoped>
.arrow {
	margin: 0 0.5em;
}
.el-dropdown-link {
	cursor: pointer;
	color: #fff;
	line-height:60px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
