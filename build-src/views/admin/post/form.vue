<style scoped lang="less">

</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item v-link="{ path: '/' }">首页</Breadcrumb-item>
                <Breadcrumb-item v-link="{ path: '/post' }">文章管理</Breadcrumb-item>
                <Breadcrumb-item>{{ curTitle }}</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="index">
                <h1>文章表单</h1>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                id: this.$route.params['id'] || 0,
                curTitle: this.id ? '编辑' : '添加'
            }
        }
    }
</script>