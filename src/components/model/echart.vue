<template>
  <div>
    <div
      id="radarContainer"
      style="width:500px;height:500px"
      ref="test"
    ></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

export default {
  name: 'echart',
  data() {
    return {
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      }
    }
  },
  methods: {
    chart() {
      // eslint-disable-next-line no-unused-vars
      let myChart = this.$echarts.init(this.$refs.test1)
      this.axios('/predict').then((res) => {
        this.option.series.data.value = res.data
        myChart.setOption(this.option, true)
      }
      )
    }
  }
}
</script>
