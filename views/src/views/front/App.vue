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
</style>
<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>