<style>
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: rgb(101, 113, 128);
  }
  .title {
    font-size: 16px; font-weight: bold; color: rgb(70, 76, 91);
  }
  .sub-title {
    font-size: 14px; font-weight: bold; color: rgb(70, 76, 91);
  }
  .small-title {
    font-size: 12px; font-weight: bold; color: rgb(70, 76, 91);
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout .log-out-btn {
    float: right;
    margin-right: 210px;
    margin-top: 12px;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 500px;
    margin: 15px;
    background: #fff;
    border-radius: 4px;
    position: relative;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    float: left;
    background: #464c5b;
    position: fixed;
    height: 100%;
  }
  .layout-menu-left.has-text {
    width: 200px;
  }
  .layout-menu-left.only-icon {
    width: 80px;
  }
  .layout-right {
    width: 100%;
  }
  .layout-right.has-text {
    margin-left: 200px;
  }
  .layout-right.has-text .layout-content {
    margin-right: 215px;
  }
  .layout-right.only-icon .layout-content {
    margin-right: 95px
  }
  .layout-right.only-icon {
    margin-left: 80px;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .layout-breadcrumb {
    display: inline-block;
  }
  .layout-btn-group {
    display: inline-block;
    float: right;
    margin-right: 465px;
    margin-top: 8px;
  }
  .layout-table {
    margin-right: 250px;
  }
  .layout-search {
    width: 250px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
  }
  .layout-search .ivu-form-item {
    margin-bottom: 10px;
  }
  .layout-search .ivu-form-label-top .ivu-form-item-label {
    padding-bottom: 2px;
  }
  .layout-page {
    padding: 15px;
    margin-bottom: 80px;
  }
</style>

<template>
  <div class="layout" :class="{ 'layout-hide-text': isHideText }">
    <div type="flex">
      <Affix>
        <div class="layout-menu-left" :class="isHideText ? 'only-icon' : 'has-text'">
          <Menu :active-name="activeKey" theme="dark" width="auto">
            <div class="layout-logo-left"></div>
            <router-link to="/post">
              <Menu-item name="post-index">
                <Icon type="ios-paper" :size="iconSize"></Icon>
                <span class="layout-text">文章管理</span>
              </Menu-item>
            </router-link>
          </Menu>
        </div>
      </Affix>
      <div class="layout-right" :class="isHideText ? 'only-icon' : 'has-text'">
        <Affix>
          <div class="layout-header">
            <i-button type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </i-button>
            <i-button @click="logout" class="log-out-btn" type="text" icon="log-out">登出</i-button>
          </div>
        </Affix>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                isHideText: false,
                activeKey: this.$route.name,
                authUser: {
                    name: ''
                }
            }
        },
        computed: {
            iconSize () {
                return this.isHideText ? 24 : 14;
            },
        },
        created () {
            if (window.innerWidth <= 768) {
                this.isHideText = true;
            }

            this.fetchUserData();
        },
        methods: {
            toggleClick () {
                this.isHideText = ! this.isHideText;
            },
            fetchUserData () {
                this.$http.get(config.getApi(config.api.user_info)).then(response => {
                    this.authUser.name = response.body.data.name;
                });
            },
            logout () {
                this.$http.post(config.getApi(config.api.logout)).then(response => {
                    window.location.href = config.login_url;
                });
            }
        }
    }
</script>
