<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          内容列表
      </template>
      </bread-crumb>
      <el-form style="padding-left:50px">

      <el-form-item label='文章状态:'>
          <el-radio-group
          v-model="statusForm.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核成功</el-radio>
            <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='频道列表:' >
           <el-select v-model="statusForm.channel_id" placeholder="请选择频道">
                <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label='时间选择:'>
        <div class="block">
            <el-date-picker
            v-model="statusForm.dataRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </div>
      </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      statusForm: {
        status: 5,
        channel_id: null,
        dataRange: []
      },
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }

}
</script>

<style>

</style>
