<template>
  <el-card class="articles">
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
           <el-select v-model="statusForm.channel_id" placeholder="请选择频道" >
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
            v-model="statusForm.dateRange"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </div>
      </el-form-item>
      </el-form>
      <el-row class="total" type='flex' align='middle'>
          <span>
              共找到{{page.total}}条符合条件的内容
          </span>
      </el-row>
      <div class="articles-item" v-for="item in list" :key="item.id.toString()">
              <div class="left">
                  <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
                  <div class="info">
                      <span> {{item.title}}</span>
                      <el-tag :type='item.status | filterType' class="tag">{{item.status | filterStatus}}</el-tag>
                      <span class="date">{{item.pubdate}}</span>
                  </div>
              </div>
              <div class="right">
                  <span @click="toMaterial(item.id)"><i class="el-icon-edit"></i>修改</span>
                  <span @click="dalMaterial(item.id)"><i class="el-icon-delete"></i>删除</span>
              </div>
          </div>
          <el-row type='flex' justify='middle' style="height:60px">
              <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :current-page="page.currentPage"
                    :page-size='page.pageSize'
                    @current-change='changePage'
                ></el-pagination>
          </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      statusForm: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/00.jpg'),
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  watch: {
    statusForm: {
      handler: function () {
        this.changeCondition()
      },
      deep: true
    }

  },
  filters: {
    filterStatus (value) {
      //   switch(value){
      //       case value:
      //   }
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }

  },

  methods: {
    toMaterial (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    dalMaterial (id) {
      this.$confirm('是否要删除文章').then(result => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`

        }).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getConditionArticles()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticles()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArticles()
    },
    getConditionArticles () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.statusForm.status === 5 ? null : this.statusForm.status,
        channel_id: this.statusForm.channel_id,
        begin_pubdate: this.statusForm.dateRange.length ? this.statusForm.dateRange[0] : null,
        end_pubdate: this.statusForm.dateRange.length > 1 ? this.statusForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
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
    this.getArticles({ page: 1, per_page: 10 })
  }

}
</script>

<style lang='less' scoped>
.articles{
    .total{
        height: 60px;
        border-bottom: 1px dashed #cccccc;
    }
    .articles-item{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img{
                width: 180px;
                height: 100px;
                border-radius: 4px;
            }
            .info{
                height: 100px;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .date{
                    color: #999;
                    font-size: 12px;
                }
                .tag{
                    text-align: center;
                    width: 60px;
                }

            }
        }
        .right{
            span{
                font-size: 14px;
                margin-right: 8px;
                cursor: pointer;
            }
        }
    }
}

</style>
