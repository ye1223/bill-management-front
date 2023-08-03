<script lang="ts" setup>
import Header from '@/components/Main/Header.vue'
import Menu from '@/components/Main/Menu.vue'
</script>

<template>
	<el-container class="layout-container">
		<el-header height="60px">
			<Header />
		</el-header>
		<el-container>
			<el-aside width="200px">
				<Menu />
			</el-aside>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
		<!-- <update-pwd :updateDiaVisible.sync="updateDiaVisible"></update-pwd> -->
	</el-container>
</template>

<style lang="scss" scoped>
.layout-container {
	height: 100%;

	.el-header {
		background-color: $color-base;
		color: #fff;
		padding-left: 0;
	}

	.el-aside {
		background-color: $color-base;
		height: $aside-height;
	}
	.el-main {
		padding: 10px;
	}
}

/* 侧边栏背景 */
aside ul,
:deep aside li {
	background-color: $color-base;
}

/*侧边栏悬浮时的背景*/
</style>
