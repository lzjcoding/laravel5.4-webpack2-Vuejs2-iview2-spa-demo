<style scoped>
    .form {
        padding: 20px;
    }
    .demo-upload-list{
        display: inline-block;
        height: 150px;
        text-align: center;
        line-height: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    #editor {
        min-height: 500px;
    }
</style>
<template>
    <div class="page">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item>首页</Breadcrumb-item>
                <Breadcrumb-item>文章管理</Breadcrumb-item>
                <Breadcrumb-item>添加文章</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <i-form ref="form" class="form" :model="formModel" :rules="formRules" :label-width="80" label-position="left">
                <Form-item label="标题" prop="title">
                    <i-input v-model="formModel.title" placeholder="必填"></i-input>
                </Form-item>
                <Form-item label="banner">
                    <div v-if="uploadList.length > 0" v-for="item in uploadList" class="demo-upload-list">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <input type="hidden" name="front_cover" :value="item.name" />
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="upload"
                        :with-credentials="true"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        :on-progress="handleProgress"
                        :on-success="handleSuccess"
                        type="drag"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible">
                        <img :src="viewUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </Form-item>
                <Form-item label="简介" prop="desc">
                    <Input v-model="formModel.desc" type="textarea" placeholder="最多300字"></Input>
                </Form-item>
                <Form-item label="内容" prop="content">
                    <div id="editor" v-html="formModel.content"></div>
                </Form-item>
                <Form-item label="是否显示">
                    <Radio-group v-model="formModel.is_show">
                        <Radio label="1">显示</Radio>
                        <Radio label="0">不显示</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="submit">提交</Button>
                    <router-link to="/post">
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </router-link>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>
<script>
    import 'wangeditor/dist/css/wangEditor.min.css';
    import WangEditor from 'wangeditor';
    export default {
        data () {
            return {
                uploadUrl: config.getApi(config.api.upload_pic),
                loading: false,
                formModel: {
                    is_show: 1
                },
                uploadList: [],
                imgName: '',
                visible: false,
                formRules: {
                    title: [
                        {required: true, message: '标题 必填', trigger: 'blur'}
                    ],
                    desc: [
                        { type: 'string', max: 300, message: '最多300个字', trigger: 'blur' }
                    ],
                    content: [
                        {required: true, message: '内容 必填', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {

        },
        beforeDestroy () {
            this.destroyEditor();
        },
        methods: {
            getData (id) {
                this.$http.get(config.getApi(config.api.post.show(id))).then(response => {
                    this.formModel = response.body.data;
                    const frontCover = this.formModel.front_cover;
                    if (frontCover) {
                        this.initFile({name: frontCover, url: config.img_url(frontCover), status: 'finished'});
                    }
                }, response => {
                    this.loading = false;
                });
            },

            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                this.clearFiles();
            },
            handleBeforeUpload (file)
            {
                this.clearFiles();
            },
            handleFormatError (file) {
                this.$Notice.error({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.error({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleProgress (event, file, fileList) {
                this.initFile(file);
            },
            handleSuccess (res, file, fileList) {
                file.name = res.data.path;
                file.url = config.img_url(file.name);

                this.initFile(file);
                this.formModel.front_cover = file.name;
            },
            initFile (file) {
                this.uploadList = [];
                this.uploadList.push(file);
                this.formModel.front_cover = file.name;
            },
            clearFiles () {
                this.$refs.upload.clearFiles();
                this.uploadList = [];
                this.formModel.front_cover = '';
            },

            createEditor () {
                // 创建编辑器
                this.editor = new WangEditor('editor');
                this.initEditorConfig();
                this.editor.create();
                // 初始化内容
                this.editor.$txt.html(this.formModel.content);
            },
            destroyEditor () {  // 销毁编辑器，官方没有给出完美方案。此方案是作者给出的临时方案
//                this.editor.destroy();  // 这个没有完全销毁实例，只是作了隐藏
                // $('editor').remove();  // 不报错的话，这一步可以省略
//                this.editor = null;
                WangEditor.numberOfLocation--;  // 手动清除地图的重复引用，作者的临时解决方案。否则单页面来回切换时，地图报错重复引用
            },
            initEditorConfig () {
                this.editor.config.uploadImgUrl = config.getApi(config.api.upload_pic);  // 图片上传地址
                this.editor.config.uploadImgFileName = 'file';  // 统一指定上传的文件name，需要指定。否则默认不同的上传方式是不同的name

                // 自定义load事件
                var _this = this;
                this.editor.config.uploadImgFns.onload = function (resultText, xhr) {
                    // resultText 服务器端返回的text
                    // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
                    var result = JSON.parse(resultText);
                    var imgUrl = config.img_url(result.data.path);
                    // 如果 resultText 是图片的url地址，可以这样插入图片：
                    _this.editor.command(null, 'insertHtml', '<img src="' + imgUrl + '" style="max-width:100%;"/>');
                    // 如果不想要 img 的 max-width 样式，也可以这样插入：
                    // editor.command(null, 'InsertImage', resultText);
                };
            },

            submit () {
                this.formModel.content = this.editor.$txt.html();
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        var method = '';
                        var api = '';
                        if (this.formModel.id > 0) {
                            method = 'put';
                            api = config.getApi(config.api.post.update(this.formModel.id));
                        } else {
                            method = 'post';
                            api = config.getApi(config.api.post.create);
                        }
                        this.$http[method](api, this.formModel).then(response => {
                            this.$Message.success('保存成功！');
                            this.$router.push('/post');
                        }, response => {
                            this.loading = false;
                        });
                    } else {
                        this.$Message.error('表单验证失败！');
                    }
                })
            }
        },
        mounted () {
            if (this.$route.params.id > 0) {
                this.getData(this.$route.params.id);
            }
            this.createEditor();
        },
        computed: {
            viewUrl: function () {
                return config.img_url(this.imgName);
            }
        }
    }
</script>
