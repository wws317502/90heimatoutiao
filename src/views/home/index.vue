<template>
<!-- 外层容器 -->
  <el-container>
    <!-- 左侧边栏容器。 -->
    <el-aside :style="{width:collapse?'60px':'230px'}" style="transition: all 0.5s; min-height:100vh;  background:#353b4e;">
      <layoutAside :collapse='collapse'></layoutAside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }

  // components: {
  //   'layoutAside': layoutAside,
  //   'layoutHeader': layoutHeader

  // }
}
</script>
