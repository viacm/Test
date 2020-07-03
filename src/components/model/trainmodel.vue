<template>
  <div
    id="index"
    class="animate-in"
  >
    <section class="content-header">
      <h1>
        设备剩余使用寿命预测
        <small>>>预测模型训练</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 预测模型训练</a></li>
      </ol>
    </section>
    <section class="content">
      <el-card class="box-card">
        <div>
          设备选择：
          <el-cascader
            :options="options"
            clearable
          ></el-cascader>
          <el-button
            type="danger"
            @click="openFullScreen"
          >
            点击训练
          </el-button>
        </div>
        <el-divider></el-divider>
        <div>
          模型选择：
          <el-radio
            v-model="radio"
            label="1"
          >LSTM</el-radio>
          <el-radio
            v-model="radio"
            label="2"
          >BPNN</el-radio>
        </div>
        <el-divider></el-divider>
        <div class="demo-input-suffix">
          层数设置：
          <el-input
            style="width: 200px"
            placeholder="请输入隐层数量"
            suffix-icon="el-icon-edit"
            v-model="input1"
          >
          </el-input>
          隐层单元：
          <el-input
            style="width: 200px"
            placeholder="请输入隐层单元数"
            suffix-icon="el-icon-edit"
            v-model="input2"
          >
          </el-input>
          时间步设置：
          <el-input
            style="width: 200px"
            placeholder="请输入时间步数"
            suffix-icon="el-icon-edit"
            v-model="input3"
          ></el-input>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      radio: '1',
      input1: '3',
      input2: '50',
      input3: '10',
      options: [
        {
          value: 1,
          label: '飞机发动机',
          children: [
            { value: 2, label: '1号发动机' },
            { value: 3, label: '2号发动机' },
            { value: 4, label: '3号发动机' },
            { value: 5, label: '4号发动机' }
          ]
        }
      ]

    }
  },

  methods: {
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: '模型训练中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 5000)
    }
  }

}
</script>
<!--
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #eff1f3;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
-->
