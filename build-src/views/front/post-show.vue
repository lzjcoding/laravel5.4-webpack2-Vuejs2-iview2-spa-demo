<style scoped>
    .content {
        width: 1000px;
        margin: 40px auto 25px;
    }
    .content .mu-card {
        margin-top: 15px;
        box-shadow: none;
    }
    .post-item:hover {
        cursor: text;
    }
    .post-item .mu-card-title-container {
        padding: 0 16px;
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
</style>
<template>
    <div class="page">
        <div class="content">
            <mu-card class="post-item" md-with-hover>
                <mu-card-header :title="post.user.nickname" :subTitle="post.user.powerful_words">
                    <mu-avatar :src="post.user.front_cover | avatar" slot="avatar"/>
                </mu-card-header>
                <mu-card-media :title="post.title" v-if="post.front_cover != ''">
                    <img :src="post.front_cover | cdn" />
                </mu-card-media>
                <mu-card-title titleClass="title" subTitleClass="sub-title" :title="post.title" :subTitle="post.created_at"/>
                <mu-card-text>{{ post.content }}</mu-card-text>
            </mu-card>
        </div>
        <mu-float-button icon="keyboard_backspace" class="go-back-btn" @click="goBack" />
    </div>
</template>
<script>
    export default {
        data () {
            return {
                post: {
                    title: '',
                    created_at: '',
                    content: '',
                    front_cover: '',
                    user: {
                        nickname: '',
                        powerful_words: '',
                        front_cover: ''
                    }
                }
            }
        },
        created () {
            this.getPost(this.$route.params.id);
        },
        methods: {
            getPost (id) {
                this.$http.get(config.api.post.show(id)).then(response => {
                    var data = response.body.data;
                    this.post = data;
                });
            }
        },
        filters: {
        }
    }
</script>
