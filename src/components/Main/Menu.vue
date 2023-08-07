<script lang="ts" setup>
import {
	HomeFilled,
	InfoFilled,
	UserFilled,
	Tools,
	FolderOpened,
	GoodsFilled,
	Shop,
    Unlock
} from '@element-plus/icons-vue'

// 退出
const logout = () => {

}
</script>

<template>
	<el-menu
		default-active="/category/manage"
		text-color="#fff"
		:unique-opened="true"
		:router="true"
	>
		<el-menu-item index="/category/manage">
			<el-icon><HomeFilled /></el-icon>
			<span slot="title">账单分类管理</span>
		</el-menu-item>

		<el-menu-item index="/bill/manage">
			<el-icon><Tools /></el-icon>
			<span slot="title">账单管理</span>
		</el-menu-item>

		<el-sub-menu index="/statistics">
			<template #title>
				<el-icon><InfoFilled /></el-icon>
				<span>统计分析</span>
			</template>

			<el-menu-item index="/statistics/billTrend">
				<el-icon><UserFilled /></el-icon>
				<template #title>每日账单</template>
			</el-menu-item>

			<el-menu-item index="/statistics/costRank">
				<el-icon><FolderOpened /></el-icon>
				<template #title>消费排行榜</template>
			</el-menu-item>

			<el-menu-item index="/statistics/categoryInPie">
				<el-icon><Shop /></el-icon>
				<template #title>收入分类统计</template>
			</el-menu-item>

			<el-menu-item index="/statistics/categoryCostPie">
				<el-icon><GoodsFilled /></el-icon>
				<span slot="title">消费分类统计</span>
			</el-menu-item>
		</el-sub-menu>

		<div @click="logout">
			<el-menu-item>
				<el-icon><Unlock /></el-icon>
				<span slot="title">退出</span>
			</el-menu-item>
		</div>
	</el-menu>
</template>

<style lang="scss" scoped>
/*避免 el-menu-item 多1px*/
.el-menu {
	border-right-width: 0;

	/*css修改element-ui样式不生效,通过>>>深层穿透指定;否则需要去掉scoped*/
	.el-submenu div.el-submenu__title:hover {
		background-color: $color-stress !important;
        color: $color-base;
	}

	/*菜单激活时的背景*/
	.el-menu-item:focus,
	.el-menu-item:hover,
	.el-menu-item.is-active {
		background-color: $color-stress;
        color: $color-base;
	}
}
</style>
