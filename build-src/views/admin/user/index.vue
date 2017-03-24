<style scoped>
</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item v-link="{ path: '/' }">首页</Breadcrumb-item>
                <Breadcrumb-item v-link="{ name: 'user-index' }">用户管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!--<div class="layout-btn-group">-->
        <!--<i-button type="primary" v-link="{name: 'user-create'}"> 添加 </i-button>-->
        <!--</div>-->
        <div class="layout-content">
            <div class="layout-table">
                <async-table :columns="columns" :data-url="dataUrl" :filter="formSearch" @on-sort-change="sort" size="small" v-ref:table></async-table>
            </div>
            <div class="layout-search">
                <Card :bordered="false" dis-hover>
                    <p slot="title"> 搜索条件 </p>
                    <i-form v-ref:form-search :model="formSearch" label-position="top">
                        <Form-item label="编号" prop="id">
                            <i-input :value.sync="formSearch.id"></i-input>
                        </Form-item>
                        <Form-item label="用户名" prop="username">
                            <i-input :value.sync="formSearch.username"></i-input>
                        </Form-item>
                        <Form-item label="昵称" prop="nickname">
                            <i-input :value.sync="formSearch.nickname"></i-input>
                        </Form-item>
                        <Form-item label="邮箱地址" prop="email">
                            <i-input :value.sync="formSearch.email"></i-input>
                        </Form-item>
                        <Form-item label="状态" prop="status">
                            <i-select :model.sync="formSearch.status" clearable>
                                <i-option value="1">禁用</i-option>
                                <i-option value="2">正常</i-option>
                            </i-select>
                        </Form-item>
                        <Form-item label="创建时间" prop="created_at">
                            <Date-picker type="datetimerange" placement="left-start" :value.sync="formSearch.created_at" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                        <Form-item label="更新时间" prop="updated_at">
                            <Date-picker type="datetimerange" placement="left-start" :value.sync="formSearch.updated_at" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                        <Form-item style="text-align: center">
                            <i-button type="primary" @click="handleSearch('formSearch')"> 搜索 </i-button>
                            <i-button type="ghost" @click="handleReset('formSearch')" style="margin-left: 8px"> 重置 </i-button>
                        </Form-item>
                    </i-form>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
    import asyncTable from '../../../components/async-table.vue';

    export default {
        components: { asyncTable },
        data () {
            return {
                dataUrl: config.api.user.list,
                columns: [
                    {title: "编号", key: "id", width: 80, sortable: true, fixed: "left"},
                    {title: "用户名", key: "username", width: 120},
                    {title: "头像", key: "front_cover", width: 100, render (row, column, index) {
                        if (row.front_cover) {
                            var avatar = config.img_url(row.front_cover);
                        } else {
                            var avatar = config.avatar_404;
                        }
                        return '<img width="50" height="50" src="'+ avatar +'" />';
                    }},
                    {title: "昵称", key: "nickname", width: 150},
                    {title: "邮箱地址", key: "email", width: 180},
                    {title: "牛x的话", key: "powerful_words", width: 250},
                    {title: "注册时间", key: "created_at", width: 150, sortable: true},
                    {title: "最近更新时间", key: "updated_at", width: 150, sortable: true},
                    {title: "状态", key: "status", width: 80, sortable: true, fixed: "right",
                        render (row, column, index) {
                            if (row.status == 1) {
                                return '禁用';
                            } else if (row.status == 2) {
                                return '正常';
                            }
                        }},
                    {title: "操作", key: "operations", width: 120, fixed: "right",
                        "render" (row, column, index) {
                            var btns = '';
                            if (row.status == 2) {
                                btns += '<i-button type="warning" size="small" @click="this.$parent.forbiddenItem('+ row.id +')">' +
                                    '<span v-if="!loading">禁用</span><span v-else></span>' +
                                    '</i-button>';
                            } else if (row.status == 1) {
                                btns += ' <i-button type="primary" size="small" @click="this.$parent.recoverItem('+ row.id +')">' +
                                    '<span v-if="!loading">恢复</span><span v-else></span>' +
                                    '</i-button> ';
                            }
                            btns += ' <i-button type="error" size="small" @click="this.$parent.delItem('+ row.id +')">' +
                                '<span v-if="!loading">删除</span><span v-else></span>' +
                                '</i-button>';
                            return btns;
                        }},
                ],
                formSearch: {
                    id: '',
                    username: '',
                    nickname: '',
                    email: '',
                    status: '',
                    created_at: '',
                    updated_at: ''
                }
            }
        },
        created () {
        },
        methods: {
            refreshData () {
                this.$refs.table.fetchData();
            },
            handleSearch (name) {
                this.refreshData();
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.refreshData();
            },
            forbiddenItem (id) {
                this.$Modal.confirm({
                    title: '确认操作',
                    content: '你确认要禁用该用户？',
                    onOk: () => {
                        this.loading = true;
                        this.$http.post(config.api.user.forbidden(id)).then(response => {
                            this.$Message.success('操作成功');
                            this.refreshData();
                            this.loading = false;
                        }, response => {
                            this.loading = false;
                        });
                    }
                });
            },
            recoverItem (id) {
                this.$Modal.confirm({
                    title: '确认操作',
                    content: '你确认要恢复该用户？',
                    onOk: () => {
                        this.loading = true;
                        this.$http.post(config.api.user.recover(id)).then(response => {
                            this.$Message.success('操作成功');
                            this.refreshData();
                            this.loading = false;
                        }, response => {
                            this.loading = false;
                        });
                    }
                });

            },
            delItem (id) {
                this.$Modal.confirm({
                    title: '确认操作',
                    content: '你确认要删除该用户？',
                    onOk: () => {
                        this.loading = true;
                        this.$http.delete(config.api.user.delete(id)).then(response => {
                            this.$Message.success('操作成功');
                            this.refreshData();
                            this.loading = false;
                        }, response => {
                            this.loading = false;
                        });
                    }
                });
            }
        }
    }
</script>
