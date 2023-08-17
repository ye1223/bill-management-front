<script lang="ts" setup>
import { clearStorage } from '@/util/storage'
import { useRouter } from 'vue-router'

import { ref } from 'vue'

const subMenu = ref<HTMLUListElement>()
const handleSubMenuToggle = () => {
	subMenu.value?.classList.toggle('hidden')
}

const router = useRouter()
// 退出
const logout = () => {
	clearStorage()
	router.replace('/login')
}
</script>

<template>
	<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
		<ul class="space-y-2 font-medium">
			<li>
				<router-link
					to="/category/manage"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<svg
						class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
						/>
					</svg>
					<span class="ml-3">账单分类管理</span>
				</router-link>
			</li>
			<li>
				<router-link
					to="/bill/manage"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<svg
						class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 18"
					>
						<path
							d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
						/>
					</svg>
					<span class="flex-1 ml-3 whitespace-nowrap">
						账单管理
					</span>
				</router-link>
			</li>
			<li>
				<button
					type="button"
					@click="handleSubMenuToggle"
					class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
					aria-controls="dropdown-example"
					data-collapse-toggle="dropdown-example"
				>
					<svg
						class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 21"
					>
						<path
							d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
						/>
						<path
							d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
						/>
					</svg>
					<span
						class="flex-1 ml-3 text-left whitespace-nowrap"
					>
						统计分析
					</span>
					<svg
						class="w-3 h-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 1 4 4 4-4"
						/>
					</svg>
				</button>
				<ul
					ref="subMenu"
					id="dropdown-example"
					class="hidden py-2 space-y-2"
				>
					<li>
						<router-link
							to="/statistics/billTrend"
							class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							每日账单
						</router-link>
					</li>
					<li>
						<router-link
							to="/statistics/costRank"
							class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							消费排行榜
						</router-link>
					</li>
					<li>
						<router-link
							to="/statistics/categoryInPie"
							class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							收入分类统计
						</router-link>
					</li>
					<li>
						<router-link
							to="/statistics/categoryCostPie"
							class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							消费分类统计
						</router-link>
					</li>
				</ul>
			</li>

			<li @click="logout">
				<a
					href="javascript:;"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<svg
						class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
						/>
					</svg>
					<span class="flex-1 ml-3 whitespace-nowrap">
						退出
					</span>
				</a>
			</li>
		</ul>
	</div>

	<!-- <el-menu
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

		<div>
			<el-popconfirm title="确定要退出吗？" @confirm="logout">
				<template #reference>
					<el-menu-item>
						<el-icon><Unlock /></el-icon>
						<span slot="title">退出</span>
					</el-menu-item>
				</template>
			</el-popconfirm>
		</div>
	</el-menu> -->
</template>

<style scoped>
/* 避免 el-menu-item 多1px */
.el-menu {
	border-right-width: 0;
}

/* css修改element-ui样式不生效,通过>>>深层穿透指定;否则需要去掉scoped */
.el-menu .el-submenu div.el-submenu__title:hover {
	background-color: rgb(232, 254, 203) !important;
	color: rgb(23, 26, 37);
}

/* 菜单激活时的背景 */
.el-menu-item:focus,
.el-menu-item:hover,
.el-menu-item.is-active {
	background-color: rgb(232, 254, 203);
	color: rgb(23, 26, 37);
}
</style>
