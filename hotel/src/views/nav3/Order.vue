<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="orders" highlight-current-row v-loading="loading" border style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="ordernumber" label="订单号" min-width="100" sortable>
				</el-table-column>
				<el-table-column prop="people" label="预订用户" min-width="100" >
				</el-table-column>
				<el-table-column prop="phone" label="手机号" min-width="100" >
				</el-table-column>
				<el-table-column prop="price" label="支付金额" min-width="100" >
				</el-table-column>
				<el-table-column prop="startdate" label="入住时间" min-width="100" >
				</el-table-column>
				<el-table-column prop="enddate" label="离店时间" min-width="100" >
				</el-table-column>
				<el-table-column prop="status" label="订单状态" min-width="100" :formatter="status">
				</el-table-column>
			</el-table>
		</template>
	</section>
</template>
<script>
	import { getOrderList } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				orders: [],

			}
		},
		methods: {
            //性别显示转换
            status: function (row, column) {
                const status = ["待支付","待入住","已入住"];
                return status[row.status];
            },
			//获取订单列表
			getUser() {
				this.loading = true;
				//NProgress.start();
				getOrderList().then((res) => {
				    console.log(res);
					this.orders = res.orders;
					this.loading = false;
					//NProg.
					// ress.done();
				}).catch(e=>{
                    this.loading = false;
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>