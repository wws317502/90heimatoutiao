<template>
   <el-carousel height="500px" type="card" :interval="5000" arrow="always">
    <el-carousel-item  v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://goss.veer.com/creative/vcg/veer/800water/veer-312050977.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-150632789.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-149191861.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-146156838.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-159602222.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-150844759.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-134519622.jpg'
      ]
    }
  }

}
</script>

<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
