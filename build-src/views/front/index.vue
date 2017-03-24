<style>
    .content {
        width: 1000px;
        margin: 10px auto 25px;
    }
    .post-list .post-item {
        margin-top: 15px;
        box-shadow: none;
    }
    .post-item:hover {
        cursor: pointer;
        box-shadow: 0px 2px 5px rgba(0,0,0,.2);
    }
    .post-item .mu-card-title-container {
        padding: 0 16px;
    }
    .post-list .mu-divider {
        width: 200px;
        margin: 0 auto;
    }
    .post-item .mu-card-header {
        padding-bottom: 0px;
    }
    .post-item .mu-card-text {
        padding-top: 10px;

    }
    .post-item .mu-card-title-container .mu-card-title.title {
        font-size: 18px;
    }
    .mu-card-title-container .mu-card-sub-title.sub-title {
        font-size: 12px;
    }
    .post-pagination {
        padding: 20px 10px 100px;
        text-align: center;
        float: right;
    }
    .post-pagination .mu-text-field {
        margin-bottom: 0px;
    }
</style>
<template>
    <div class="page">
        <div class="content">
            <div class="post-list">
                <template v-for="post in posts">
                    <router-link :to="{ name: 'post-show', params: { id: post.id }}">
                        <mu-card class="post-item" md-with-hover>
                            <mu-card-header :title="post.user.nickname" :subTitle="post.user.powerful_words">
                                <mu-avatar :src="post.user.front_cover | avatar" slot="avatar"/>
                            </mu-card-header>
                            <mu-card-media :title="post.title" v-if="post.front_cover != ''">
                                <img :src="post.front_cover | cdn" />
                            </mu-card-media>
                            <mu-card-title titleClass="title" subTitleClass="sub-title" :title="post.title" :subTitle="post.created_at"/>
                            <mu-card-text>{{ post.desc }}</mu-card-text>
                        </mu-card>
                    </router-link>
                </template>
            </div>
            <div class="post-pagination">
                <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageChange="changePage" @pageSizeChange="changePageSize"></mu-pagination>
            </div>
        </div>
        <mu-float-button icon="refresh" class="refresh-page-btn" v-if="isIndex" />
    </div>
</template>
<script>
    export default {
        data () {
            return {
                posts: [],
                total: 0,
                current: 1,
                pageSize: 20,
                showSizeChanger: true,
                pageSizeOption: [20, 30, 50, 60],
                isIndex: this.$route.path == '/index'
            }
        },
        created () {
            this.getPosts();
        },
        methods: {
            refresh () {
                this.getPosts();
                this.$Message.success('刷新成功');
            },
            getPosts () {
                this.$http.get(config.api.post.list + '?page=' + this.current + '&pageSize=' + this.pageSize).then(response => {
                    var data = response.body.data;
                    if (this.page > 1) {
                        this.page = this.page.concat(data.data);
                    } else {
                        this.posts = data.data;
                    }
                    this.total = data.total;
                    this.current = data.current_page;
                });
            },
            changePage (newIndex) {
                this.current = newIndex;
                this.getPosts();
            },
            changePageSize (newPageSize) {
                this.pageSize = newPageSize;
                this.getPosts();
            }
        },
        filters: {
        }
    }
</script>
