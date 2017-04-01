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
            <i-form class="form" :model="formModel" :label-width="80" label-position="left">
                <Form-item label="标题">
                    <i-input v-model="formModel.title" placeholder="必填"></i-input>
                </Form-item>
                <Form-item label="banner">
                    <div v-for="item in uploadList" class="demo-upload-list">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
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
                        :headers="uploadHeaders"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
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
                <Form-item label="简介">
                    <i-input v-model="formModel.desc" type="textarea" :autosize="{minRows: 3, maxRows: 6}" placeholder="最多300字"></i-input>
                </Form-item>
                <Form-item label="内容">
                    <i-input v-model="formModel.content" placeholder="必填"></i-input>
                </Form-item>
                <Form-item label="是否显示">
                    <Radio-group v-model="formModel.is_show">
                        <Radio label="1">显示</Radio>
                        <Radio label="0">不显示</Radio>
                    </Radio-group>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                uploadUrl: config.getApi(config.api.upload_pic),
                loading: false,
                formModel: {
                    is_show: 1
                },
                defaultList: [
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                uploadHeaders: {
                    Authorization: config.getToken()
                }
            }
        },
        created () {
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                console.log(fileList);
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = config.img_url(res.data.path);
                file.name = res.data.path;
                this.uploadList = [];
                this.uploadList.push(file);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                return this.uploadList.length < 2;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
        computed: {
            viewUrl: function () {
                return config.img_url(this.imgName);
            }
        }
    }
</script>
