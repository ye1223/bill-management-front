<script lang="ts" setup>
import { ref, reactive, onBeforeMount, computed } from 'vue'
import { appJsonPost, formGet } from '@/api/request'
import { CategoryInfo } from '@/ts/interfaces/catogory.interface'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { BillInfo } from '@/ts/interfaces/bill.ineterface';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute()
const updateid = computed(()=>{
    return route.query.id
})
const formData = reactive({
	id: updateid,
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
// 获取分类
onBeforeMount(() => {
	formGet<CategoryInfo[]>({
		url: '/category/selectAll'
	}).then(res => {
		console.log(res)
		selectForm.push(...res.data)
	})
})

const router = useRouter()
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid, fields) => {
		if (valid) {
			appJsonPost<BillInfo, any>({
				url: '/bill/updateById',
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
		<el-col :span="8">
			<!--label-width:设置form-item的label的宽度,字符串类型,
                        不设置的话label和表单项不在一行-->
			<el-form
				:rules="rules"
				:model="formData"
				label-width="100px"
				label-position="right"
				ref="formRef"
			>
				<el-form-item label="用户编号:">
					<el-input
						v-model="formData.id"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="账单时间:" prop="billTime">
					<el-date-picker
						v-model="formData.billTime"
						type="datetime"
						:editable="true"
						prefix-icon="el-icon-date"
						value-format="YYYY-MM-DD HH:mm:ss"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="账单分类:" prop="amountMoney">
					<el-select v-model="formData.categoryId">
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
					<el-button
						type="primary"
						size="mini"
						@click="onSubmit(formRef)"
						>修改</el-button
					>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<style lang=""></style>
