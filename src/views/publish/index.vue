<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
      </bread-crumb>
      <el-form ref="publishForm" :model='formData' :rules='publisRules' style="margin-left:50px" label-width='100px'>
          <el-form-item prop='title' label='标题'>
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label='内容' prop='content'>
              <quill-editor
              v-model="formData.content"
              style="height:150px"
              ></quill-editor>
          </el-form-item>
          <el-form-item style="margin-top:100px" label='封面' prop='cover'>
              <el-radio-group @change="changeType" v-model="formData.cover.type">
                  <el-radio :label='1'>单图</el-radio>
                  <el-radio :label='3'>三图</el-radio>
                  <el-radio :label='0'>无图</el-radio>
                  <el-radio :label='-1'>自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <cover-image :list='formData.cover.images'></cover-image>
          <el-form-item label='频道' prop='channel_id'>
              <el-select v-model="formData.channel_id">
                  <el-option
                  v-for="item in channels"
                  :key="item.id"
                  :label='item.name'
                  :value='item.id'
                  ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type='primary' @click="publishArticle()">发布</el-button>
              <el-button type='primary' @click="publishArticle(true)">存入草稿</el-button>
          </el-form-item>

      </el-form>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publisRules: {
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5,
          max: 30,
          message: '标题长度在5~30之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (to.params.articleId) {

      } else {
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
    // 'formData.cover.type': function () {
    //   // alert(this.formData.cover.type)
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    changeType () {
      // alert(this.formData.cover.type)
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          })
          // if (articleId) {
          //   this.$axios({
          // url:`/articles/${articleId}`
          // method: 'put',
          //     params: { draft },
          //     data: this.formData

          //   }).then(result => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   //   console.log('效验通过')
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft },
          //     data: this.formData
          //   }).then(result => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }

}
</script>

<style>

</style>
