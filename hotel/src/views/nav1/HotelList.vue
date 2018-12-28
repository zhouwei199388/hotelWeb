<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getHotel">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table  :data="hotels" @cell-click="onItemClick" highlight-current-row v-loading="listLoading" border @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="hotelname" label="酒店名" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="hoteladdress" label="地址" min-width="100">
			</el-table-column>
			<el-table-column prop="facility" label="设施" min-width="100">
			</el-table-column>
			<el-table-column prop="minprice" label="起步价" min-width="100">
			</el-table-column>
			<el-table-column prop="phone" label="客服" min-width="120">
			</el-table-column>
			<el-table-column prop="hoteltext" label="简介" min-width="180">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="修改" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="酒店名称" prop="hotelname" auto-complete="off">
					<el-input v-model="editForm.hotelname" ></el-input>
				</el-form-item>
				<el-form-item label="酒店地址" >
					<el-input v-model="editForm.hoteladdress" ></el-input>
				</el-form-item>
				<el-form-item label="酒店配置" >
					<el-input v-model="editForm.facility" ></el-input>
				</el-form-item>
				<el-form-item label="起步价" >
					<el-input v-model="editForm.minprice" ></el-input>
				</el-form-item>
				<el-form-item label="酒店客服" >
					<el-input v-model="editForm.phone" ></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload
							class="upload-demo"
							ref="upload"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:auto-upload="false"
							:file-list="editForm.hotelImages"
							:on-change="onEditFileChange"
							list-type="picture">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>

						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="酒店介绍">
					<el-input type="textarea" v-model="editForm.hoteltext"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" size="mini" :rules="addFormRules" ref="addForm">
				<el-form-item label="酒店名称" prop="hotelname">
					<el-input v-model="addForm.hotelname" ></el-input>
				</el-form-item>
				<el-form-item label="酒店地址" >
					<el-input v-model="addForm.hoteladdress" ></el-input>
				</el-form-item>
				<el-form-item label="酒店配置" >
					<el-input v-model="addForm.facility" ></el-input>
				</el-form-item>
				<el-form-item label="起步价" >
					<el-input v-model="editForm.minprice" ></el-input>
				</el-form-item>
				<el-form-item label="酒店客服" >
					<el-input v-model="addForm.phone" ></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload
							class="upload-demo"
							ref="upload"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:auto-upload="false"
							:file-list="addForm.hotelImages"
							:on-change="onAddFileChange"
							list-type="picture">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
						</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="酒店介绍">
					<el-input type="textarea" v-model="addForm.hoteltext"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
    import {
        batchRemoveUser,
        editUser,
        getHotelList,
        addHotelInfo, deleteHotel, updateHotel
    } from '../../api/api';
    import AliOSSUtil from '../../api/AliOSSUtil'

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
                hotels: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
                    hotelname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
                    hotelname: '',
                    hoteladdress: "",
					hotelImages:[],
					minprice:0.00,
                    phone: "",
                    facility: '',
                    hoteltext: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
                    hotelname: [
						{ required: true, message: '请输入酒店名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					hotelname: '',
					hoteladdress: "",
                    hotelImages:[],
                    minprice:0.00,
					phone: "",
					facility: '',
					hoteltext: ''
				}

			}
		},
		methods: {


            submitUpload(param){
                console.log(param.file);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            onAddFileChange(file, fileList) {
                console.log(file);
                AliOSSUtil.uploadHotelFile("hotelRoom/", file.raw, file.name,
                    (progress) => {
                        console.log(progress);
                    },
                    (resultUrl) => {
                        this.addForm.hotelImages.push({
                            name: file.name,
                            url: resultUrl
                        });
                        console.log(this.addForm.hotelImages);
                    },
                    (err) => {
                        console.log(err);
                    })
            },
            onEditFileChange(file, fileList) {
                console.log(file);
                AliOSSUtil.uploadHotelFile("hotelRoom/", file.raw, file.name,
                    (progress) => {
                        console.log(progress);
                    },
                    (resultUrl) => {
                        this.editForm.hotelImages.push({
                            name: file.name,
                            url: resultUrl
                        });
                        console.log(this.editForm.hotelImages);
                    },
                    (err) => {
                        console.log(err);
                    })
            },

			// //性别显示转换
			// formatSex: function (row, column) {
			// 	return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			// },
			onItemClick(row,cloumn){
			    if(cloumn.property===undefined){
			        return;
				}
                this.$router.push({
					path: '/roomList',
                    query: {
                        id: row.id,
                    }
                });
    },
    handleCurrentChange(val) {
        this.page = val;
        this.getHotel();
    },

    getHotel(){
        this.listLoading = true;
        //NProgress.start();
        getHotelList().then((res) => {
            // this.total = res.data.total;
            console.log(res);
            this.hotels = res.hotelModels;
            this.listLoading = false;
            //NProgress.done();
        }).catch((e)=>{
            this.listLoading = false;
        });
    },

    // //获取用户列表
    // getUsers() {
    // 	let para = {
    // 		page: this.page,
    // 		name: this.filters.name
    // 	};
    // 	this.listLoading = true;
    // 	//NProgress.start();
    // 	getUserListPage(para).then((res) => {
    // 		this.total = res.data.total;
    // 		this.users = res.data.users;
    // 		this.listLoading = false;
    // 		//NProgress.done();
    // 	});
    // },
    //删除
    handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
            type: 'warning'
        }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let para = { id: row.id };
            deleteHotel(row.id).then((res) => {
                this.listLoading = false;
                console.log(res);
                //NProgress.done();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getHotel();
            });
        }).catch(() => {

        });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
        console.log(row);
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        console.log(this.editForm);
    },
    //显示新增界面
    handleAdd: function () {
        this.addFormVisible = true;
        // this.addForm = {
        // 	name: '',
        // 	sex: -1,
        // 	age: 0,
        // 	birth: '',
        // 	addr: ''
        // };
    },
    //编辑
    editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
            if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    //NProgress.start();
                    let para = Object.assign({}, this.editForm);

                      updateHotel(para).then((res) =>{
                          this.editLoading = false;
                          //NProgress.done();
                          let  message = res.code===0?'提交成功':'提交失败';
                          this.$message({
                              message: message,
                              type: 'success'
                          });
                          this.$refs['editForm'].resetFields();
                          this.editFormVisible = false;
                          this.getHotel();
                      })
                    // editUser(para).then((res) => {
                    // 	this.editLoading = false;
                    // 	//NProgress.done();
                    // 	this.$message({
                    // 		message: '提交成功',
                    // 		type: 'success'
                    // 	});
                    // 	this.$refs['editForm'].resetFields();
                    // 	this.editFormVisible = false;
                    // 	this.getHotel();
                    // });
                });
            }
        });
    },
    //新增
    addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
            if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.addLoading = true;
                    console.log(this.addForm);
                    addHotelInfo(this.addForm).then((res)=>{
                        this.addLoading = false;
                        console.log(res);
                        //NProgress.done();
                        if(res.code===0){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                        }
                        this.addFormVisible = false;
                        this.getHotel();
                    })
                    // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                    // addUser(para).then((res) => {
                    // 	this.addLoading = false;
                    // 	//NProgress.done();
                    // 	this.$message({
                    // 		message: '提交成功',
                    // 		type: 'success'
                    // 	});
                    // 	this.$refs['addForm'].resetFields();
                    // 	this.addFormVisible = false;
                    // 	this.getUsers();
                    // });
                });
            }
        });
    },
    selsChange: function (sels) {
        this.sels = sels;
    },
    //批量删除
    batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
        }).then(() => {
            this.listLoading = true;
            //NProgress.start();
            let para = { ids: ids };
            batchRemoveUser(para).then((res) => {
                this.listLoading = false;
                //NProgress.done();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getHotel();
            });
        }).catch(() => {

        });
    }
},
mounted() {
    this.getHotel();
}
}

</script>

<style scoped>

</style>