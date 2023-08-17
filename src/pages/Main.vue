<script lang="ts" setup>
import Header from '@/components/Main/Header.vue'
import Menu from '@/components/Main/Menu.vue'
</script>

<template>
	<el-container class="layout-container">
		<el-header height="4rem">
			<Header />
		</el-header>
		<el-container>
			<aside
				id="sidebar-multi-level-sidebar"
				class="fixed top-18 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<Menu />
			</aside>

			<main class="p-4 sm:ml-64">
				<router-view />
			</main>

		</el-container>
		<!-- <update-pwd :updateDiaVisible.sync="updateDiaVisible"></update-pwd> -->
	</el-container>
</template>

<style scoped>
.layout-container {
	height: 100%;
}

.layout-container .el-header {
	background-color: rgb(23, 26, 37);
	color: #fff;
	padding-left: 0;
}

.layout-container .el-aside {
	background-color: rgb(23, 26, 37);
	height: calc(100vh - 60px);
}

.layout-container .el-main {
	padding: 10px;
}

/* 侧边栏背景 */
aside ul,
aside li {
	background-color: rgb(23, 26, 37);
}

/*侧边栏悬浮时的背景*/
</style>
