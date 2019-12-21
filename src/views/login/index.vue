<template>
<div class="login">
    <!-- 放置一个el-card组件 -->
    <el-card class='login-card'>
      <!-- 放置标题图片 -->
      <div class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置表单 -->
      <el-form :model="loginForm" ref="myForm" :rules="loginRules">
      <el-form-item prop="mobile">
          <el-input placeholder='请输入手机号' v-model="loginForm.mobile" ></el-input>
      </el-form-item>
      <el-form-item prop="code">
          <el-input placeholder='验证码' style="width:65%;" v-model="loginForm.code"></el-input>
          <el-button style="float:right" plain>验证码</el-button>
      </el-form-item>
      <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rul, value, callback) {
      // rul:当前规则
      // value:当前表单项的值
      // callback:回调函数
      // if (value) {
      //   callback()
      // } else {
      //   callback(new Error('您必须同意无条件被我们蒙骗'))
      // }
      value ? callback() : callback(new Error('您必须同意无条件被我们蒙骗'))
    }
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议

      },
      loginRules: {
        //   决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        agree: [{ validator }]
      } // 登录规则集合对象
      // 自定义形式去校验
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          console.log('校验成功')
          // body参数  data
          // get参数 params
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            console.log(result.data.data)
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '警告哦，错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }

}
</script>

<style lang='less' scoped>
.login{
    height: 100vh;
    background: url('../../assets/img/2.jpg')no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
    width: 440px;
    height: 350px;
    .title{
        text-align: center;
        margin-bottom: 30px;
        img{
            height: 45px;
        }
    }

    }

}

</style>
