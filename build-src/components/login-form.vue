<template>
    <div class="login-content">
        <div class="form-wrapper">
            <div class="header-wrapper">
                <h1 class="page-title"><Icon type="locked" class="page-icon"></Icon> 后台管理系统</h1>
            </div>
            <i-form v-ref:form-model :model="formModel" :rules="formRules" @keyup.enter="handleSubmit('formModel')" label-position="top">
                <Form-item prop="username" label="用户名">
                    <i-input size="large" type="text" :value.sync="formModel.username" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </i-input>
                </Form-item>
                <Form-item prop="password" label="密码">
                    <i-input size="large" type="password" :value.sync="formModel.password" placeholder="密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </i-input>
                </Form-item>
                <Form-item>
                    <i-button size="large" type="success" :loading="loading" @click="handleSubmit('formModel')" long>
                        <span v-if="!loading">登录</span>
                        <span v-else>Loading...</span>
                    </i-button>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
    import config from '../config/admin-config';

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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$http.post('/api/admin/login', this.formModel).then(response => {
                            if (response.headers.map.Authorization !== undefined) {
                                window.localStorage.setItem(config.token_name, response.headers.map.Authorization[0]);
                            }

                            this.$Message.success('登录成功！');
                            setTimeout(() => {
                                window.location.href = '/admin/index.html';
                            }, 1000);
                        }, response => {
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

<style>
    html, body {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
        background-color: #253B48;
    }

    .login-content {
        width:100%;
        height: 50%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .login-content .header-wrapper {
        text-align: center;
        margin-bottom: 20px;
    }

    .login-content .page-icon {
        font-size: 25px;
    }

    .login-content .form-wrapper {
        width: 400px;
        margin: 0 auto;
        padding: 15px 30px;
    }
</style>