<style scoped>
</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item v-link="{ path: '/' }">首页</Breadcrumb-item>
                <Breadcrumb-item v-link="{ name: 'post-index' }">文章管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!--<div class="layout-btn-group">-->
        <!--<i-button type="primary" v-link="{name: 'post-create'}"> 添加 </i-button>-->
        <!--</div>-->
        <div class="layout-content">
            <div class="layout-table">
                <async-table :columns="columns" :data-url="dataUrl" :filter="formSearch" @on-sort-change="sort" size="small" v-ref:table></async-table>
            </div>
            <div class="layout-search">
                <Card :bordered="false" dis-hover>
                    <p slot=title> 搜索条件 </p>
                    <i-form v-ref:form-search :model="formSearch" label-position="top">
                        <Form-item label="编号" prop="id">
                            <i-input :value.sync="formSearch.id"></i-input>
                        </Form-item>
                        <Form-item label="所属用户" prop="user_id">
                            <i-select :model.sync="formSearch.user_id" clearable filterable>
                                <i-option v-for="item in userList" :value="item.id">{{ item.nickname }}</i-option>
                            </i-select>
                        </Form-item>
                        <Form-item label="标题" prop=title>
                            <i-input :value.sync="formSearch.title"></i-input>
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
                dataUrl: config.api.post.list,
                columns: [
                    {title: "编号", key: "id", width:80, sortable: true},
                    {title: "所属用户", key: "user_id", width: 150,
                        render (row, column, index) {
                            return row.user.nickname;
                        }},
                    {title: "标题", key: "title", width: 200},
                    {title: "点击数", key: "click_num", width: 120, sortable: true},
                    {title: "点赞数", key: "like_num", width: 120, sortable: true},
                    {title: "评论数", key: "comment_num", width: 120, sortable: true},
                    {title: "收藏数", key: "collect_num", width: 120, sortable: true},
                    {title: "分享数", key: "share_num", width: 120, sortable: true},
                    {title: "创建时间", key: "created_at", width: 150, sortable: true},
                    {title: "最近更新时间", key: "updated_at", width: 150, sortable: true},
                    {title: "是否显示", key: "is_show", width: 120, sortable: true, fixed: "right",
                        render (row, column, index) {
                            if (row.is_show == 1) {
                                return '显示';
                            } else {
                                return '隐藏';
                            }
                        }},
                    {title: "操作", key: "operations", width: 120, fixed: "right",
                        render (row, column, index) {
                            var btns = '';
                            if (row.is_show == 1) {
                                btns += '<i-button type="warning" size="small" @click="this.$parent.hideItem('+ row.id +')">' +
                                            '<span v-if="!loading">隐藏</span><span v-else></span>' +
                                        '</i-button>';
                            } else {
                                btns += ' <i-button type="primary" size="small" @click="this.$parent.showItem('+ row.id +')">' +
                                            '<span v-if="!loading">显示</span><span v-else></span>' +
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
                    user_id: '',
                    title: '',
                    created_at: '',
                    updated_at: ''
                },
                userList: {}
            }
        },
        created () {
            this.fetchUserData();
        },
        methods: {
            refreshData () {
                this.$refs.table.fetchData();
            },
            fetchUserData () {
                this.$http.get(config.api.user.list + '?pageSize=10000').then(response => {
                    this.userList = response.body.data.data;
                });
            },
            handleSearch (name) {
                this.refreshData();
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.refreshData();
            },
            showItem (id) {
                this.$Modal.confirm({
                    title: '确认操作',
                    content: '你确认要显示这条记录？',
                    onOk: () => {
                        this.loading = true;
                        this.$http.post(config.api.post.show(id)).then(response => {
                            this.$Message.success('操作成功');
                            this.refreshData();
                            this.loading = false;
                        }, response => {
                            this.loading = false;
                        });
                    }
                });
            },
            hideItem (id) {
                this.$Modal.confirm({
                    title: '确认操作',
                    content: '你确认要隐藏这条记录？',
                    onOk: () => {
                        this.loading = true;
                        this.$http.post(config.api.post.hide(id)).then(response => {
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
                    content: '你确认要删除这条记录？',
                    onOk: () => {
                        this.loading = true;
                        this.$http.delete(config.api.post.delete(id)).then(response => {
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
