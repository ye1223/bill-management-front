<script lang="ts" setup>
import { ref } from 'vue'
import InfoForm from '@/components/profile/InfoForm.vue'


const onSubmit = (props: any) => {
    console.log(props.infoForm)
}

const handleEdit = () => {

}

const show = ref(true)

</script>

<template>
	<el-card>
        <InfoForm :v-show="show">
            <el-button type="primary" @click="handleEdit()">修改</el-button>
        </InfoForm>

		<InfoForm v-slot="slotProps" :v-show="!show">
			<el-button type="primary" @click="onSubmit(slotProps)">提交</el-button>
			<el-button type="info">取消</el-button>
		</InfoForm>

	</el-card>
</template>

<style lang=""></style>
