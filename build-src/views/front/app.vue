<style>
    /* fallback */
    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v21/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
    }
    #app {

    }
    .app-title .mu-item-title, #app .mu-item-title {
        color: white;
    }
    .page-content {
        margin-top: 25px;
    }
    #app .add-post-btn, #app .refresh-page-btn, #app .go-back-btn {
        position: fixed;
        right: 30px;
        bottom: 150px;
    }
    #app .add-post-btn {
        bottom: 150px;
    }
    #app .refresh-page-btn {
        margin-bottom: 70px;
    }
    #app .go-back-btn {
        margin-bottom: 70px;
    }
</style>
<template>
    <div id="app">
        <mu-appbar title="Blog" titleClass="app-title" :zDepth="barDepth">
        </mu-appbar>
        <div class="page-content">
            <transition name="slide-left">
                <router-view></router-view>
            </transition>
        </div>
        <mu-dialog :open="dialog" title="登录">
            <form id="login-form" onsubmit="return false;">
                <mu-text-field label="账号" labelFloat/><br/>
                <mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat/><br/>
            </form>
            <mu-flat-button label="确定" slot="actions" primary @click="close"/>
        </mu-dialog>
        <router-link :to="{ name: 'post-create' }">
            <mu-float-button icon="add" class="add-post-btn" />
        </router-link>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                barDepth: 2,
                authUser: {},
                avatar: config.avatar_404
            }
        },
        computed: {

        },
        created () {
        },
        methods: {
            goLogin () {
                this.dialog = true;
            },
            toggleClick () {
                this.isHideText = ! this.isHideText;
            },
            fetchUserData () {
                this.$http.get('/api/admin/userInfo').then(response => {
                    this.authUser = response.body.data;
                });
            },
            logout () {
                this.$http.post('/api/admin/logout').then(response => {
                    this.$cookie.delete('admin-token');
                    window.location.href = '/admin/login.html';
                });
            },
            goBack () {
                this.$router.back();
            }
        }
    }
</script>
