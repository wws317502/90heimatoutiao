<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          图文数据
      </template>
      </bread-crumb>
      <div ref="myChart" class='echarts'></div>

  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    let myChart = echarts.init(this.$refs.myChart)
    myChart.setOption({
      title: {
        text: '测试数据'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    })
  }

}
</script>

<style lang='less' scoped>
 .echarts {
     width:600px;
     height: 400px;
 }

</style>
