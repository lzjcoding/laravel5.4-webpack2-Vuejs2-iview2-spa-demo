<style scoped>
    h1 {
        text-align: center;
        margin-top: 25px;
    }
</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item v-link="{ path: '/' }">首页</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">欢迎登陆</div>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
