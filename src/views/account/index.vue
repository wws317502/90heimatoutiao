 <template>
 <el-card v-loading='loading'>
     <bread-crumb slot="header">
     <template slot="title">
         账户信息
     </template>
     </bread-crumb>
     <el-form ref="myForm" :model='formData' :rules='rules' style="margin-left:100px" label-width='100px'>
         <el-form-item prop='name'  label='用户名'>
             <el-input v-model="formData.name" style="width:40%"></el-input>
         </el-form-item>
         <el-form-item prop='intro' label="简介">
             <el-input v-model="formData.intro"  style="width:40%"></el-input>
         </el-form-item>
         <el-form-item prop='email' label='邮箱'>
             <el-input  v-model="formData.email"  style="width:40%"></el-input>
         </el-form-item>
         <el-form-item prop='mobile' label='手机号' >
             <el-input  v-model="formData.mobile"  disabled style="width:40%"></el-input>
         </el-form-item>
         <el-form-item>
             <el-button @click="saveUserInfo" type='primary'>保存信息</el-button>
         </el-form-item>
     </el-form>
     <el-upload :http-request='uploadImg' class="head-upload" action='' :show-file-list='false'>
         <img :src="formData.photo?formData.photo:defaultImg" alt="">
     </el-upload>
 </el-card>

 </template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      loading: false,
      defaultImg: require('../../assets/img/01.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名长度在1~7之间'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.loading = false
        this.formData.photo = result.data.photo
      })
    },
    saveUserInfo () {
      this.$refs.myForm.validate().then(result => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'

          })
        })
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

 <style lang='less' scoped>
 .head-upload{
     position: absolute;
     right: 300px;
     top: 150px;
     img{
         width: 150px;
         height: 150px;
         border-radius: 50%;
     }
 }

 </style>
