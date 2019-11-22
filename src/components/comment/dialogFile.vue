<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      action
      :limit="limit"
      :on-exceed="handleExceed"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="iconHandleRemove"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadAvatar"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :modal="false" :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
    import {getTableData} from '../../api/typeManagement.js';
    import {subjectUpload} from '../../api/upload.js';

    export default {
        props: ['limit', 'fileList'],
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                picList: []
            };
        },
        computed: {},
        mounted() {
        },
        created() {
        },
        methods: {
            //  验证图片个数 -- 图标 && -- 截图
            handleExceed(files, fileList) {
                this.$message.warning("只能上传" + fileList.length + "个！");
            },
            //  提交图片 -- 图标
            uploadAvatar(item) {
                const formData = new FormData()
                formData.append('file', item.file)
                subjectUpload(formData).then(res => {
                    console.log(this.$refs.upload.$children[0].files)
                    this.$emit('getData', this.$refs.upload.$children[0].files);
                }).catch((err) => {
                    console.log(err)
                    this.$message.error('上传失败，请重新上传')
                    this.emptyUpload()
                })
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPng = file.type === 'image/png'
                const isLt5M = file.size / 1024 / 1024 <= 5

                if (!isPng) {
                    this.$message.error('上传图片只能是png 格式!')
                }
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5MB!')
                }
                return (isPng) && isLt5M
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },
            //  删除操作--
            iconHandleRemove(file, fileList) {
                // console.log(fileList)
                console.log(this.$refs.upload.$children[0].files)
                this.$emit('getData', this.$refs.upload.$children[0].files);
            },
            emptyUpload() {
                const mainImg = this.$refs.upload
                // console.log(mainImg.children.files)
                if (mainImg) {
                    if (mainImg.length) {
                        mainImg.forEach(item => {
                            item.clearFiles()
                        })
                    } else {
                        this.$refs.upload.clearFiles()
                    }
                }
            },
        },
        watch: {
            index() {

            }
        }
    };
</script>

<style lang="scss" scoped>
</style>

