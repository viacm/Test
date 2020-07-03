<template>
  <div
    id="index"
    class="animate-in"
  >
    <section class="content-header">
      <h1>
        设备剩余使用寿命预测
        <small>>>剩余使用寿命预测</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 剩余使用寿命预测</a></li>
      </ol>
    </section>
    <section class="content">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <dev align="center">
            <h3>
              <medium> 设备监测点</medium>
            </h3>
          </dev>
          <el-card class="box-card">
            <el-tree
              class="filter-tree"
              :data="treedata"
              :props="defaultProps"
              :default-expand-all="false"
              :filter-node-method="filterNode"
              ref="tree"
            >
            </el-tree>
          </el-card>
        </el-aside>
        <!-- 主要内容 -->
        <el-main>
          <el-card class="box-card">
            <div>
              模型选择：
              <el-select
                v-model="value"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button
                type="danger"
                @click="predict"
              >
                点击预测
              </el-button>
            </div>
          </el-card>

          <div
            id="radarContainer"
            style="width:500px;height:500px"
            ref="test"
          ></div>
        </el-main>
      </el-container>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}S'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '剩余寿命',
            type: 'gauge',
            max: 120,
            detail: { formatter: '{value}*10s' },
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.25, '#c23531'], [0.5, '#ca8622'], [0.75, '#546570'], [1, '#749f83']]
              }
            },
            data: [{ value: 84, name: 'RUL' }]
          }
        ]
      },
      filterText: '',
      options: [
        {
          value: '1',
          label: 'LSTM'
        }],
      value: '',
      responseResult: [],

      // 列表数据
      treedata: [
        {
          id: 1,
          label: '飞机发动机',
          children: [{
            id: 4,
            label: '1号发动机'
          }, {
            id: 6,
            label: '2号发动机'
          }, {
            id: 6,
            label: '3号发动机'
          }, {
            id: 6,
            label: '4号发动机'
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    predict() {
      // eslint-disable-next-line no-unused-vars
      let myChart = this.$echarts.init(this.$refs.test)
      // myChart.setOption(this.option, true)
      this.$axios({
        url: 'http://192.168.8.58:31002/model/',
        method: 'GET'
      }).then((res) => {
        console.log(res.data)
        this.option.series[0].data[0].value = res.data.result
        this.option.series[0].max = res.data.max
        myChart.setOption(this.option, true)
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }

}
</script>
