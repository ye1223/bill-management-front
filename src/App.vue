<template>
	<div>
		<!-- App -->
		<router-view></router-view>
	</div>
</template>
<script lang="ts" setup>
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
