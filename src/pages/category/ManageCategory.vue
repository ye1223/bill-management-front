<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import AddCategory from '@/components/category/AddCategory.vue'
import UpdateCategory from '@/components/category/UpdateCategory.vue'
import { appJsonPost, formGet } from '@/api/request'
import {
	SearchForm,
	TableData,
	TableList
} from '@/ts/interfaces/catogory.interface'
import { ElMessage, ElTable } from 'element-plus'

let addDialogShow = ref(false)
const openAddDialog = () => {
	addDialogShow.value = true
}

const searchFormData = reactive<SearchForm>({
	pageNow: 1,
	pageSize: 10,
	searchWord: ''
})

onMounted(() => {
	loadTable()
})

const loadTable = () => {
	tableData.list = []
	appJsonPost<SearchForm, TableList[]>({
		url: '/category/selectPage',
		data: searchFormData
	}).then(res => {
		tableData.list.push(...res.data)
		//@ts-ignore
		tableData.total = res.total
	})
}
const handleSearch = () => {
	loadTable()
}
const tableData = reactive<TableData>({
	total: 0,
	list: []
})

const updateId = ref(-1)
const handleEdit = (_: number, row: any) => {
	updateDialogShow.value = true
	updateId.value = row.id
}

const updateDialogShow = ref(false)
const handleUpdateRefresh = () => {
	updateDialogShow.value = false
	loadTable()
}

const handleAddRefresh = () => {
	loadTable()
}

const handleDelete = (_: number, row: any) => {
	formGet({
		url: '/category/deleteById',
		params: { id: row.id }
	})
		.then(res => {
			ElMessage.success(res.msg)
			loadTable()
		})
		.catch(err => {
			ElMessage.error(err.msg)
		})
}

// 分页
const handlePageSizeChange = (val: number) => {
	searchFormData.pageSize = val
	loadTable()
}
const handlePageNowChange = (val: number) => {
	searchFormData.pageNow = val
	loadTable()
}

const multipleSelection = ref<TableList[]>([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: TableList[]) => {
	if (rows) {
		rows.forEach((row: TableList) => {
			// TODO: improvement typing when refactor table
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			multipleTableRef.value!.toggleRowSelection(row, undefined)
		})
	} else {
		multipleTableRef.value!.clearSelection()
	}
}
const handleSelectionChange = (val: TableList[]) => {
	multipleSelection.value = val
	console.log(multipleSelection.value)
}

const deleteSelection = () => {
	// ?1,3,4 这种格式的querystring
	const deleteQueryId = multipleSelection.value
		.map(item => item.id)
		.join(',')
	formGet({
		url: `/category/deleteById?id=${deleteQueryId}`
	})
		.then(res => {
			ElMessage.success(res.msg)
			loadTable()
		})
		.catch(err => {
			ElMessage.error(err.msg)
		})
}
</script>

<template>
	<section class="title-bar">
		<el-row justify="space-around">
			<el-col :span="2">
				<el-button
					@click="openAddDialog"
					type="primary"
					size="middle"
				>
					<el-icon><Upload /></el-icon>新增
				</el-button>
			</el-col>
			<el-col :span="22">
				<el-form
					:model="searchFormData"
					:inline="true"
					size="middle"
				>
					<el-form-item
						label="账单分类名称"
						label-width="120"
					>
						<el-input
							v-model="searchFormData.searchWord"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							size="middle"
							@click="handleSearch"
							>查询</el-button
						>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</section>
	<section>
		<el-table
			:data="tableData.list"
			stripe
			border
			size="default"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			ref="multipleTableRef"
		>
			<el-table-column type="selection" width="55" />
			<el-table-column prop="id" label="系统编号" width="180">
			</el-table-column>
			<el-table-column prop="name" label="账单分类名称">
			</el-table-column>
			<el-table-column prop="natureName" label="所属大分类">
			</el-table-column>
			<el-table-column label="操作" fixed="right">
				<template #default="scope">
					<el-button
						type="primary"
						size="small"
						@click="handleEdit(scope.$index, scope.row)"
					>
						编辑
					</el-button>
					<el-popconfirm
						title="确定删除此项?"
						confirm-button-text="是"
						cancel-button-text="否"
						@confirm="
							handleDelete(scope.$index, scope.row)
						"
					>
						<template #reference>
							<el-button type="danger" size="small">
								删除
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 20px">
			<!-- !待完善 -->
			<el-button
				:disabled="true"
				size="small"
				@click="
					toggleSelection([
						tableData.list[1],
						tableData.list[2]
					])
				"
				>Toggle列表</el-button
			>
			<el-button size="small" @click="toggleSelection()">
				清空多选
			</el-button>

			<el-button
				size="small"
				type="danger"
				@click="deleteSelection()"
			>
				删除多选
			</el-button>
		</div>
	</section>

	<!--分页-->
	<section class="page">
		<el-pagination
			@size-change="handlePageSizeChange"
			@current-change="handlePageNowChange"
			:current-page="searchFormData.pageNow"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="searchFormData.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="tableData.total"
		>
		</el-pagination>
	</section>

	<AddCategory
		v-model:addDialogShow="addDialogShow"
		@refreshTable="handleAddRefresh"
	/>
	<UpdateCategory
		v-model:updateDialogShow="updateDialogShow"
		:updateId="updateId"
		@refreshTable="handleUpdateRefresh"
	/>
</template>

<style lang=""></style>
