<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BillTableData, BillTableInfo } from '@/ts/interfaces/bill.ineterface'
import { appJsonPost, formGet } from '@/api/request'
import { ElMessage, ElTable, UploadRawFile } from 'element-plus'
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { InfoFilled, UploadFilled } from '@element-plus/icons-vue'
import useUserInfoStore from '@/store/userInfoStore'
import { BASE_URL } from '@/constants'
// @ts-ignore
// import * as Worker from '@/util/exportToExcel.worker'

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

// 导出Excel表格
const handleExport = () => {
	// 处理表格数据
	const excelTable = tableData.list.map(item => {
		return {
			系统编号: item.id,
			账单时间: item.billTime,
			类型: item.natureName === '收入' ? '收入' : '支出',
			金额:
				item.natureName === '收入'
					? item.amountMoney
					: -item.amountMoney,
			备注: item.remarks
		}
	})
	const worksheet = XLSX.utils.json_to_sheet(excelTable)
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
	const excelBuffer = XLSX.write(workbook, {
		bookType: 'xlsx',
		type: 'array'
	})
	const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' })
	setTimeout(() => {
		FileSaver.saveAs(blob, '账单') // 下载文件 文件名
	}, 500)
}

// 表格多选
const multipleSelection = ref<BillTableInfo[]>([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: BillTableInfo[]) => {
	if (rows) {
		rows.forEach((row: BillTableInfo) => {
			// TODO: improvement typing when refactor table
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			multipleTableRef.value!.toggleRowSelection(row, undefined)
		})
	} else {
		multipleTableRef.value!.clearSelection()
	}
}
const handleSelectionChange = (val: BillTableInfo[]) => {
	multipleSelection.value = val
}

const deleteSelection = () => {
	// ?1,3,4 这种格式的querystring
	const deleteQueryId = multipleSelection.value
		.map(item => item.id)
		.join(',')
	formGet({
		url: `/bill/deleteById?id=${deleteQueryId}`
	})
		.then(res => {
			ElMessage.success(res.msg)
			loadTable()
		})
		.catch(err => {
			ElMessage.error(err.msg)
		})
}

// 批量导入
const importDialogVisible = ref(false)
const handleImport = () => {
	importDialogVisible.value = true
}
const uploadDisabed = ref(false)

const userInfoStore = useUserInfoStore()
const handleExcelTemplate = () => {
	formGet<BlobPart>({
		url: 'bill/downloadTemplate',
		Authorization: userInfoStore.userInfo.token,
		responseType: 'blob',
		contentType: 'application/octet-stream'
	})
		.then(res => {
			// @ts-ignore
			return new Promise(resolve => {
				resolve(res)
			})
		})
		.then(res => {
			// @ts-ignore
			const blob = new Blob([res], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			})
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'bill_template.xlsx'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		})
		.catch(err => {
			const blob = new Blob([err], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			})
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'bill_template.xlsx'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		})
}
// excel导入之前校验
const handleBeforeFileUpload = (rawFile: UploadRawFile) => {
	//xlsx 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	const isExcel = rawFile.type === 'application/vnd.ms-excel' || rawFile.type=== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	const isLt2M = rawFile.size / 1024 / 1024 < 2
	if (!isExcel) {
		ElMessage.error('上传Excel文件只能是 xls/x格式')
	}
	if (!isLt2M) {
		ElMessage.error('上传Excel大小不能超过 2MB!')
	}
}
const handleFileSuccess = (response: any) => {
	importDialogVisible.value = false
	ElMessage.success(response.data)
	loadTable()
}

const handleFileError = (error: Error) => {
	ElMessage.error(`${error}`)
	// 抛出异常，终端之后上传的逻辑
	throw new Error(`${error}`)
}
</script>

<template>
	<section class="title-bar">
		<el-row>
			<el-col :span="2">
				<el-button @click="toAdd" type="primary" size="mini">
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
							size="default"
							@click="handleSearch"
							>查询
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-button
							type="success"
							size="default"
							@click="handleImport"
						>
							批量导入
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							size="default"
							@click="handleExport"
						>
							导出表格
						</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-dialog v-model="importDialogVisible" width="30%">
			<el-upload
				drag
				method="post"
				name="file"
				:action="BASE_URL+'/bill/upload'"
				:headers="{
					Authorization: userInfoStore.userInfo.token
				}"
				:auto-upload="true"
				:multiple="false"
				:show-file-list="false"
				:disabled="uploadDisabed"
				:before-upload="handleBeforeFileUpload"
				:on-success="handleFileSuccess"
				:on-error="handleFileError"
			>
				<el-icon class="el-icon--upload">
					<upload-filled />
				</el-icon>
				<div class="el-upload__text">
					将文件拖动于此或<em>点击上传</em>
				</div>
				<template #tip>
					<div class="el-upload__tip">
						<el-button @click="handleExcelTemplate"
							>下载上传模版</el-button
						>
						<br />
						<span style="color: red"
							>*必须使用上传模版否则会出错误</span
						>
					</div>
				</template>
			</el-upload>
		</el-dialog>
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
						>
							{{ scope.row.natureName }}
						</el-tag>
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
			<el-button
				size="small"
				@click="toggleSelection([...tableData.list])"
			>
				Toggle列表
			</el-button>
			<el-button size="small" @click="toggleSelection()">
				清空多选
			</el-button>

			<el-popconfirm
				width="220"
				confirm-button-text="是"
				cancel-button-text="否"
				:icon="InfoFilled"
				icon-color="#626AEF"
				title="确定删除选中的部分?"
				@confirm="deleteSelection"
			>
				<template #reference>
					<el-button size="small" type="danger">
						删除多选
					</el-button>
				</template>
			</el-popconfirm>
		</div>
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

<style lang="scss" scoped>
.el-upload__tip {
	text-align: center;
}
</style>
