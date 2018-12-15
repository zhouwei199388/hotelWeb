<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getRoom">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="rooms" highlight-current-row v-loading="listLoading" border
                  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" cell-click="" label="房型" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="window" label="窗户" min-width="100">
            </el-table-column>
            <el-table-column prop="image" label="图片" min-width="100">
            </el-table-column>
            <el-table-column prop="price" label="价格" min-width="120">
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
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="修改" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="房型" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="editForm.price"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input v-model="editForm.image"></el-input>
                </el-form-item>
                <el-form-item label="窗户">
                    <el-radio-group v-model="editForm.window">
                        <el-radio :label="0">有窗</el-radio>
                        <el-radio :label="1">无窗</el-radio>
                    </el-radio-group>
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
                <el-form-item label="房型" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="addForm.price"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input v-model="addForm.image"></el-input>
                </el-form-item>
                <el-form-item label="窗户">
                    <el-radio-group v-model="addForm.window">
                        <el-radio :label="0">有窗</el-radio>
                        <el-radio :label="1">无窗</el-radio>
                    </el-radio-group>
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
        addHotelInfo, deleteHotel, updateHotel, getRoomList, addRoom, updateRoom, deleteRoom
    } from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                rooms: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    hotelid: this.hotelId,
                    name: '',
                    price: 0.00,
                    image: "",
                    window: 0,
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入房型', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    price: 0.00,
                    image: "",
                    window: 0,
                },
                hotelId: -1,

            }
        },
        methods: {
            // //性别显示转换
            // formatSex: function (row, column) {
            // 	return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            // },
            getParams() {
                // 取到路由带过来的参数
                let routerParams = this.$router.params.id;
                console.log(routerParams);
                // 将数据放在当前组件的数据内
                this.hotelId = routerParams
            },
            // onItemClick(e) {
            //     this.$router.push({
            //         path: '/user',
            //         params: {
            //             id: e.id,
            //         }
            //     });
            // },
            handleCurrentChange(val) {
                this.page = val;
                this.getRoom();
            },

            getRoom() {
                this.listLoading = true;
                //NProgress.start();
                getRoomList(this.hotelId).then((res) => {
                    console.log(res);
                    this.rooms = res.rooms;
                    this.listLoading = false;
                }).catch((e) => {
                    this.listLoading = false;
                });
            },

            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    // let para = {id: row.id};
                    deleteRoom(row.id).then((res) => {
                        this.listLoading = false;
                        console.log(res);
                        //NProgress.done();
                        if(res.code===0){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getRoom();
                        }
                    });
                }).catch(() => {
                    this.listLoading = false;
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
                this.addForm = {
                    hotelid: this.hotelId,
                    name: '',
                    price: 0.00,
                    image: "",
                    window: 0,
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);

                            updateRoom(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                let message = res.code === 0 ? '提交成功' : '提交失败';
                                this.$message({
                                    message: message,
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getRoom();
                            })
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
                            addRoom(this.addForm).then((res) => {
                                this.addLoading = false;
                                console.log(res);
                                //NProgress.done();
                                if (res.code === 0) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                }
                                this.addFormVisible = false;
                                this.getRoom();
                            }).catch((e) => {
                                this.addLoading = false;
                            })
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
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getRoom();
                    });
                }).catch(() => {

                });
            }
        },
        watch: {
            '$router': 'getParams'
        },
        mounted() {
            // 取到路由带过来的参数
            let routerParams = this.$route.query.id;
            console.log(routerParams);
            // 将数据放在当前组件的数据内
            this.hotelId = routerParams;
            this.getRoom();
        }
    }

</script>

<style scoped>

</style>