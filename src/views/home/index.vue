<template>
<!-- 外层容器 -->
  <el-container>
    <!-- 左侧边栏容器。 -->
    <el-aside style="min-height:100vh;  background:#353b4e; width:230px">
      <layoutAside></layoutAside>
    </el-aside>
    <el-container>
      <!-- 顶栏容器。 -->
      <el-header>
        <layoutHeader></layoutHeader>
      </el-header>
      <!-- 主要区域容器。 -->
      <el-main>
         <router-view></router-view>
      </el-main>
      <!-- 底栏容器 -->
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../components/home/layout-aside'
// import layoutHeader from '../components/home/lasyout-header'
export default {

  // components: {
  //   'layoutAside': layoutAside,
  //   'layoutHeader': layoutHeader

  // }
}
</script>
