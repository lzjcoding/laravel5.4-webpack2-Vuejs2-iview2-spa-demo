<style>
    .title {
        font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);
    }
    .page {
        height: 100%;
    }
    .page .top-bg, .page .bottom-bg {
        width: 100%;
        height: 50%;
        position: fixed;
        z-index: -1;
    }
    .page .top-bg {
        background-color: #3091f2;
    }
    .page .bottom-bg {
        top: 50%;
        background-color: #e3e8ee;
    }
    .page .form {
        width: 400px;
        height: 280px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -140px;
        padding: 25px;
        background-color: white;
    }
    .page .form .form-title {
        margin: 0 0 25px;
        text-align: center;
    }
    .page .form div.ivu-form-item {
        margin-bottom: 30px;
    }
</style>

<template>
    <div class="page">
        <div class="top-bg">&nbsp;</div>
        <div class="bottom-bg">&nbsp;</div>
        <div class="form">
            <div class="title form-title">Blog后台管理系统</div>
            <i-form ref="loginForm" :model="formModel" :rules="formRules" @keyup.enter="handleSubmit()" label-position="top">
                <Form-item prop="username">
                    <Input v-model="formModel.username" icon="ios-person-outline" placeholder="用户名" />
                </Form-item>
                <Form-item prop="password">
                    <Input v-model="formModel.password" type="password" icon="ios-locked-outline" placeholder="密码" />
                </Form-item>
                <Form-item>
                    <Button size="large" type="success" :loading="loading" @click="handleSubmit()" long>
                        <span v-if="!loading">登录 <Icon type="arrow-right-c"></Icon></span>
                        <span v-else>Loading...</span>
                    </Button>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formModel: {
                    username: '',
                    password: ''
                },
                loading: false,
                formRules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$http.post(config.getApi(config.api.login), this.formModel).then(response => {
                            if (response.body.status_code === 200) {
                                this.$Message.success('登录成功！');

                                setTimeout(() => {
                                    window.location.href = '/admin.html';
                                }, 1000);
                            } else {
                                this.$Loading.error();
                                this.$Message.error(response.body.msg);
                                this.loading = false;
                            }
                        }, response => {
                            this.$Loading.error();
                            this.$Message.error("发生了未知错误")
                            this.loading = false;
                        });
                    } else {
                        this.$Message.error('表单验证失败！');
                    }
                })
            }
        }
    }
</script>