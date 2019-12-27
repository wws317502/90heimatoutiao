<template>
    <div class="cover-image">
        <div @click="openDialog" v-for="(item,index) in list" :key='index' class="cover-image-item ">
            <img :src="item?item:dafaultImg" alt="">
        </div>
        <el-dialog @close='claseDialog' title="选择封面图片" :visible='dialogVisible'>

        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dafaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  props: ['list'],
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    claseDialog () {
      this.dialogVisible = false
    }
  }

}
</script>

<style lang='less' scoped>
.cover-image{
    margin: 20px 100px;
    display: flex;
    .cover-image-item{
        border: 1px dashed #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }

}

</style>
