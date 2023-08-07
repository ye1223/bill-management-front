<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BillTableData, BillTableInfo } from '@/ts/interfaces/bill.ineterface'
import { appJsonPost, formGet } from '@/api/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const toAdd = () => {
	router.push('/bill/toAdd')
}

const tableData = reactive<BillTableData>({
	total: 0,
	list: [],
	totalIn: -1,
	totalOut: -1,
	sectionRemain: -1
})

const searchFormData = reactive({
	pageNow: 1,
	pageSize: 10,
	timeRangeArr: []
})
const handleSearch = () => {
	loadTable()
}

const loadTable = () => {
	tableData.list = []
	const data = { ...searchFormData }
	// 存在且选中两个
	if (data.timeRangeArr.length === 2) {
		// 新增属性
		// @ts-ignore
		;[data['startDate'], data['endDate']] = [
			searchFormData.timeRangeArr[0],
			searchFormData.timeRangeArr[1]
		]
	}
	appJsonPost<any, BillTableInfo[]>({
		url: '/bill/selectPage',
		data: data
	}).then(res => {
		console.log(res.data, res)
		tableData.list.push(...res.data)
		tableData.total = res.total
		tableData.totalIn = res.attributes ? res.attributes.totalIn : 0 // 收入
		tableData.totalOut = res.attributes ? res.attributes.totalOut : 0 // 支出
		tableData.sectionRemain = res.attributes
			? res.attributes.sectionRemain
			: 0 // 区间结余
	})
}
onMounted(() => {
	loadTable()
})

const handleEdit = (_: number, row: BillTableInfo) => {
	router.push(`/bill/toUpdate?id=${row.id}`)
}

const handleDelete = (_: number, row: BillTableInfo) => {
	formGet({
		url: '/bill/deleteById',
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

// 一页显示条数
const handlePageSizeChange = (val: number) => {
	searchFormData.pageSize = val
	loadTable()
}
// 当前页
const handlePageNowChange = (val: number) => {
	searchFormData.pageNow = val
	loadTable()
}
</script>

<template>
	<section class="title-bar">
		<el-row>
			<el-col :span="2">
				<el-button
					@click="toAdd"
					type="primary"
					size="mini"
					icon="el-icon-plus"
				>
					新增
				</el-button>
			</el-col>
			<el-col :span="22">
				<el-form
					:model="searchFormData"
					:inline="true"
					size="small"
				>
					<el-form-item
						label="选择区间:"
						label-width="120px"
					>
						<el-date-picker
							v-model="searchFormData.timeRangeArr"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:editable="false"
							prefix-icon="el-icon-date"
							value-format="YYYY-MM-DD"
							:unlink-panels="true"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							size="mini"
							@click="handleSearch"
							icon="el-icon-search"
							>查询
						</el-button>
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
			<el-table-column prop="billTime" label="账单时间">
			</el-table-column>
			<el-table-column label="大类-子类">
				<template #default="scope">
					<span>
						<el-tag
							:type="
								scope.row.natureName === '收入'
									? 'success'
									: 'danger'
							"
							>{{ scope.row.natureName }}</el-tag
						>
						<!-- {{ scope.row.natureName }} -->
						-
						{{ scope.row.categoryName }}
					</span>
				</template>
			</el-table-column>
			<el-table-column label="金额(元)">
				<template #default="scope">
					<b v-if="scope.row.natureName === '收入'">
						{{ scope.row.amountMoney }}
					</b>
					<b style="color: red" v-else>
						-{{ scope.row.amountMoney }}
					</b>
				</template>
			</el-table-column>
			<el-table-column prop="remarks" label="备注">
			</el-table-column>

			<el-table-column label="操作">
				<template #default="scope">
					<el-button
						type="primary"
						size="small"
						icon="el-icon-edit"
						@click="handleEdit(scope.$index, scope.row)"
						>编辑
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
		<div class="summary">
			<el-tag type="success">收入:{{ tableData.totalIn }}</el-tag>
			<el-tag type="warning">支出:{{ tableData.totalOut }}</el-tag>
			<el-tag type="danger">
				区间结余:{{ tableData.sectionRemain }}
			</el-tag>
		</div>
	</section>

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
</template>

<style lang=""></style>
