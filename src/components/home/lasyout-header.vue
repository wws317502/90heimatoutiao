<template>
  <el-row class="layout-header" type="flex" align="middle">
  <el-col :span="12" class="left">
      <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <el-col :span="12" class="right" >
      <el-row type="flex" justify='end' align="middle" >
          <img  :src="userInfo.photo ? userInfo.photo : defaultImg"
          alt="">
          <!-- :src="userInfo.photo ? userInfo.photo : defaultImg"  -->
          <!-- src="../../assets/img/avatar.jpg" -->
        <el-dropdown @command="clickMenu">
        <span class="el-dropdown-link">
            {{ userInfo.name }} <!-- {{ userInfo.name }} -->
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="c">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </el-row>
  </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 定义一个用户对象
      defaultImg: require('../../assets/img/avatar.jpg') // 先将图片转化成了一个变量
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        //   headers参数
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data
    })
  },

  methods: {
    //   点击菜单项时触发
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        //   跳转到git地址
        window.location.href = 'https://github.com/wws317502/90heimatoutiao'
      } else {
        //    退出
        window.localStorage.removeItem('user-token') // 删除令牌
        this.$router.push('/login') // 回到登录页
      }
    }
  }
}

</script>

<style lang="less" scoped>
.layout-header {
    height:60px;
    .left {
        font-size: 20px;
        span {
           color: #2c3e50;
           font-size: 16px;
           margin-left:4px;
        }
    }
    .right {
      img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 5px;
      }
    }
}

</style>
