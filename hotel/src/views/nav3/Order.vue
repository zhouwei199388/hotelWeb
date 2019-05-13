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
				<el-table-column prop="user.nickname" label="预订用户" min-width="100" >
				</el-table-column>
				<el-table-column prop="user.phone" label="手机号" min-width="100" >
				</el-table-column>
				<el-table-column prop="price" label="支付金额" min-width="100" >
				</el-table-column>
				<el-table-column prop="startdate" label="入住时间" min-width="100" >
				</el-table-column>
				<el-table-column prop="enddate" label="离店时间" min-width="100" >
				</el-table-column>
				<el-table-column prop="roomnumber" label="入住房间" min-width="100" >
				</el-table-column>
				<el-table-column prop="status" label="订单状态" min-width="100" :formatter="status">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">入住</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">退店</el-button>
					</template>
				</el-table-column>
			</el-table>


			<!--编辑界面-->
			<el-dialog title="入住" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="房号" prop="roomNumber" auto-complete="off">
						<el-input v-model="editForm.roomNumber" ></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>
		</template>
	</section>
</template>
<script>
    import {getOrderList, setRoomNumber} from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
                editForm: {
                    orderId: 0,
					adminId:0,
                    roomNumber:"",
                },
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    hotelname: [
                        { required: true, message: '请输入房号', trigger: 'blur' }
                    ]
                },
				loading: false,
				orders: [],

			}
		},
		methods: {
            //显示编辑界面
            handleEdit: function (index, row) {
                console.log(row);
                if(row.status==1||row.status==4){
                    this.editFormVisible = true;
                    this.editForm.orderId = row.id;
                    console.log(this.editForm);
                    return;
				}
                this.$message({
                    message: "仅供修改待入住和入住客户",
                    type: 'error'
                });

            },
            //订单状态
            status: function (row, column) {
                const status = ["待支付", "待入住", "支付超时", "已取消","已入住","入住超时"];
                return status[row.status];
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            const user = JSON.parse(sessionStorage.getItem('user'));
                            this.editForm.adminId = user.id;
                            let para = Object.assign({}, this.editForm);
                            setRoomNumber(para).then((res) => {
                                console.log(res);
                                this.editLoading = false;
                                //NProgress.done();
                                let message = res.code === 0 ? '提交成功' : '提交失败';
                                this.$message({
                                    message: message,
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getOrder();
                            })
                        });
                    }
                });
            },
			//获取订单列表
            getOrder() {
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
			this.getOrder();
		}
	};

</script>

<style scoped>

</style>