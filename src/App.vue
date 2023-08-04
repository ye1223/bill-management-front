<template>
	<div>
		<!-- App -->
		<!-- <ElConfigProvider :locale="zhCn"> -->
			<router-view></router-view>
		<!-- </ElConfigProvider> -->
		
	</div>
</template>
<script lang="ts" setup>
// import { ElConfigProvider } from 'element-plus'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { onMounted } from 'vue'
import useUserInfoStore from './store/userInfoStore'
import { setItem } from './util/storage'
import { USER_INFO_KEY } from './constants'
const store = useUserInfoStore()
onMounted(() => {
	// 防止pinia状态中的数据刷新后清空
	window.addEventListener('unload', () => {
		setItem(USER_INFO_KEY, store.userInfo)
	})
})
</script>

<style lang="scss">
html,
body,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
}
</style>
