<style scoped>
  .page-content {
    text-align: center;
    margin-top: 35px;
  }
  .page-content .content {
    margin-top: 15px;
  }
  .page .back {
    display: block;
  }
  .page .back i {
    padding: 8px 14px;
  }
</style>

<template>
  <div class="page">
    <Row>
      <iCol :xs="1" :sm="4" :md="5" :lg="6">&nbsp;</iCol>
      <iCol :xs="22" :sm="16" :md="14" :lg="12">
        <div class="page-content">
          <p class="title">{{ post.title }}</p>
          <p class="small-title">{{ post.created_at }}</p>
          <p class="content">{{ post.content }}</p>
        </div>
      </iCol>
      <iCol :xs="1" :sm="4" :md="5" :lg="6">&nbsp;</iCol>
    </Row>
    <Back-top></Back-top>
    <Back-top class="back" :bottom="80" @on-click="goBack">
      <div class="ivu-back-top-inner"><Icon type="android-arrow-back" size="24"></Icon></div>
    </Back-top>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        post: {}
      }
    },
    created () {
      this.getPost();
    },
    methods: {
      getPost () {
        this.$http.get(config.getApi(config.api.post.show(this.id))).then(response => {
          var data = response.body.data;
          this.post = data;
        });
      },
      goBack () {
        this.$router.back();
      }
    },
    filters: {
    }
  }
</script>
