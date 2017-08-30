<style scoped>
</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item>首页</Breadcrumb-item>
                <Breadcrumb-item>文章管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="layout-btn-group">
            <router-link to="/post/create">
                <i-button type="primary" size="small"> 添加文章 </i-button>
            </router-link>
        </div>
        <div class="layout-content">
            <div class="layout-table">
                <async-table :columns="columns" :data-url="dataUrl" :filter="formSearch" size="small" ref="asyncTable"></async-table>
            </div>
            <div class="layout-search">
                <Card :bordered="false" dis-hover>
                    <p slot=title> 搜索条件 </p>
                    <i-form ref="formSearch" :model="formSearch" label-position="top">
                        <Form-item label="编号" prop="id">
                            <i-input v-model="formSearch.id"></i-input>
                        </Form-item>
                        <Form-item label="标题" prop=title>
                            <i-input v-model="formSearch.title"></i-input>
                        </Form-item>
                        <Form-item label="创建时间" prop="created_at">
                            <Date-picker type="datetimerange" placement="left-start" v-model="formSearch.created_at" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                        <Form-item label="更新时间" prop="updated_at">
                            <Date-picker type="datetimerange" placement="left-start" v-model="formSearch.updated_at" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"></Date-picker>
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
                loading: false,
                dataUrl: config.getApi(config.api.post.list),
                columns: [
                    {title: "编号", key: "id", width:80, sortable: true},
                    {title: "标题", key: "title", width: 200},
                    {title: "点击数", key: "click_num", width: 120, sortable: true},
                    {title: "创建时间", key: "created_at", width: 150, sortable: true},
                    {title: "最近更新时间", key: "updated_at", width: 150, sortable: true},
                    {title: "是否显示", key: "is_show", width: 100, sortable: true, fixed: "right",
                        render (row, column, index) {
                            if (row.is_show == 1) {
                                return '显示';
                            } else {
                                return '隐藏';
                            }
                        }},
                    {title: "操作", key: "operations", width: 170, fixed: "right",
                        render (row, column, index) {
                            var btns = '';
                            btns += '<i-button type="success" size="small" @click="btnClick(\'goEdit\', '+ row.id +')"> 编辑 </i-button>';
                            if (row.is_show == 1) {
                                btns += ' <i-button type="warning" size="small" @click="btnClick(\'hideItem\', '+ row.id +')">' +
                                            '<span v-if="!loading">隐藏</span><span v-else></span>' +
                                        '</i-button>';
                            } else {
                                btns += ' <i-button type="primary" size="small" @click="btnClick(\'showItem\', '+ row.id +')">' +
                                            '<span v-if="!loading">显示</span><span v-else></span>' +
                                        '</i-button> ';
                            }
                            btns += ' <i-button type="error" size="small" @click="btnClick(\'delItem\', '+ row.id +')">' +
                                        '<span v-if="!loading">删除</span><span v-else></span>' +
                                    '</i-button>';
                            return btns;
                        }},
                ],
                formSearch: {
                    id: '',
                    title: '',
                    created_at: '',
                    updated_at: ''
                },
                userList: {}
            }
        },
        created () {
        },
        methods: {
            refreshData () {
                this.$refs.asyncTable.fetchData();
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
                        this.$http.post(config.getApi(config.api.post.display(id))).then(response => {
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
                        this.$http.post(config.getApi(config.api.post.hide(id))).then(response => {
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
                        this.$http.delete(config.getApi(config.api.post.delete(id))).then(response => {
                            this.$Message.success('操作成功');
                            this.refreshData();
                            this.loading = false;
                        }, response => {
                            this.loading = false;
                        });
                    }
                });
            },
            goEdit (id) {
                this.$router.push({name: 'post-edit', params: {id: id}});
            }
        }
    }
</script>
