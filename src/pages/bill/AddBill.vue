<script lang="ts" setup>
import { appJsonPost, formGet } from '@/api/request'
import { BillInfo } from '@/ts/interfaces/bill.ineterface'
import { CategoryInfo } from '@/ts/interfaces/catogory.interface'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const formData = reactive<BillInfo>({
	billTime: '',
	categoryId: '',
	amountMoney: '',
	remarks: ''
})

// 表单的引用对象
const formRef = ref<FormInstance>()
// 表单校验
const rules = reactive<FormRules>({
	billTime: [
		{ required: true, message: '请输入账单时间', trigger: 'blur' }
	],
	categoryId: [
		{ required: true, message: '请选择账单分类', trigger: 'blur' }
	],
	amountMoney: [{ required: true, message: '请输入金额', trigger: 'blur' }]
})

const selectForm: any = reactive([])
onMounted(() => {
	formGet<CategoryInfo[]>({
		url: '/category/selectAll'
	}).then(res => {
		selectForm.push(...res.data)
	})
})

const handleBack = () => {
	router.back()
}

const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid, fields) => {
		if (valid) {
			appJsonPost<BillInfo, any>({
				url: '/bill/add',
				data: { ...formData }
			})
				.then(res => {
					ElMessage.success(res.data)
                    router.back()
				})
				.catch(err => {
					ElMessage.error(err.msg)
				})
		} else {
			console.log('error submit!', fields)
		}
	})
}
</script>

<template>
	<el-row>
		<el-col :span="11">
			<!--label-width:设置form-item的label的宽度,字符串类型,
                        不设置的话label和表单项不在一行-->
			<el-form
				:rules="rules"
				:model="formData"
				label-width="100px"
				label-position="right"
				ref="formRef"
			>
				<el-form-item label="账单时间:" prop="billTime">
					<el-date-picker
						v-model="formData.billTime"
						type="datetime"
						:editable="false"
						value-format="YYYY-MM-DD HH:mm:ss"
						clearable
						placeholder="选择日期"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="账单分类:" prop="amountMoney">
					<el-select
						v-model="formData.categoryId"
						placeholder="选择分类"
					>
						<el-option
							v-for="one in selectForm"
							:label="one.name"
							:value="one.id"
							:key="one.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="金额(元):" prop="amountMoney">
					<el-input
						v-model="formData.amountMoney"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="备注:">
					<el-input
						v-model="formData.remarks"
						clearable
					></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" size="mini" @click="handleBack"
						>返回</el-button
					>
					<el-button
						type="primary"
						size="mini"
						@click="onSubmit(formRef)"
						>添加</el-button
					>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<style lang=""></style>
