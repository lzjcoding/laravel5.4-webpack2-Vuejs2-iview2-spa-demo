<style scoped>
  .page .page-title {
    margin: 15px auto 35px;
    text-align: center;
  }
  .post-list {
    min-height: 500px;
  }
  .post-list .post-item .content {
    margin-top: 5px;
  }
  .post-list .post-item .more {
    margin-top: 8px;
  }
  .post-list .post-item .more i {
    vertical-align: bottom;
  }
  .paginate {
    margin: 50px auto 150px;
  }
  .paginate button, .paginate span {
    display: inline-block;
    height: 30px;
    line-height: 45px;
    vertical-align: top;
  }
  .post-list .post-item {
    margin-bottom: 30px;
  }
</style>
<template>
  <div class="page">
    <h1 class="page-title">Spa-Blog</h1>
    <Row>
      <iCol :xs="1" :sm="4" :md="5" :lg="6">&nbsp;</iCol>
      <iCol :xs="22" :sm="16" :md="14" :lg="12">
        <div class="page-content">
          <ul class="post-list">
            <template v-for="post in posts">
              <li class="post-item">
                <p class="title">{{ post.title }}</p>
                <p class="small-title">{{ post.created_at }}</p>
                <p class="content">{{ post.desc }}</p>
                <p class="more">
                  <router-link :to="{name: 'post-show', params: {id: post.id}}">查看全文 <Icon type="ios-arrow-thin-right" size="20"></Icon></router-link>
                </p>
              </li>
            </template>
          </ul>
          <div class="paginate">
            <Button type="text" @click="prevPage" v-if="current > 1"><Icon type="arrow-left-c" size="30" /></Button>
            <span class="page-num">{{ current }}</span>
            <Button type="text" @click="nextPage" v-if="current < lastPage"><Icon type="arrow-right-c" size="30" /></Button>
          </div>
        </div>
      </iCol>
      <iCol :xs="1" :sm="4" :md="5" :lg="6">&nbsp;</iCol>
    </Row>
    <Back-top ref="backTop"></Back-top>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                posts: [],
                current: 1,
                pageSize: 20,
                lastPage: 1
            }
        },
        created () {
            this.getPosts();
        },
        methods: {
            getPosts () {
                this.$http.get(config.getApi(config.api.post.list) + '?page=' + this.current + '&pageSize=' + this.pageSize).then(response => {
                    var data = response.body.data;
                    this.posts = data.data;
                    this.lastPage = data.last_page;

                    this.$refs.backTop.back();
                });
            },
            prevPage () {
                if (this.current <= 1) {
                    this.current = 1;
                    return;
                }

                this.current--;
                this.getPosts();
            },
            nextPage () {
                if (this.current >= this.lastPage) {
                    this.current == this.lastPage
                    return;
                }

                this.current++;
                this.getPosts();
            }
        },
        filters: {
        }
    }
</script>
