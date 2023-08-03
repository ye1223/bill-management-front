<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import AddCategory from '@/components/category/AddCategory.vue'
import { appJsonPost } from '@/api/request'
import { SearchForm, TableData, TableList } from '@/ts/interfaces/catogory.interface'

let addDialogShow = ref(false)
const openAddDialog = () => {
	addDialogShow.value = true
}

const searchFormData = reactive<SearchForm>({
	pageNow: 1,
	pageSize: 10,
	searchWord: ''
})

onMounted(()=>{
	loadTable()
})

const loadTable = () => {
	appJsonPost<SearchForm, TableList[]>({
		url: '/category/selectPage',
		data: searchFormData
	}).then(res => {
		tableData.list.push(...res.data)
	})
}
const handleSearch = () => {
	loadTable()
}
const tableData = reactive<TableData>({
	total: 0,
	list: []
})


const handleEdit = () => {

}

const handleDelete = () => {

}
</script>

<template>
	<section class="title-bar">
		<el-row>
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
			size="mini"
			style="width: 100%"
		>
			<el-table-column prop="id" label="系统编号" width="180">
			</el-table-column>
			<el-table-column prop="name" label="账单分类名称">
			</el-table-column>
			<el-table-column prop="natureName" label="所属大分类">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						type="primary"
						size="mini"
						icon="el-icon-edit"
						@click="handleEdit()"
						>编辑
					</el-button>
					<el-button
						type="danger"
						size="mini"
						icon="el-icon-delete"
						@click="
							handleDelete()
						"
						>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
	<AddCategory v-model:addDialogShow="addDialogShow" />
</template>

<style lang=""></style>
