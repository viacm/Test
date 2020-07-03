<template>
  <div
    id="index"
    class="animate-in"
  >
    <section class="content-header">
      <h1>
        设备信息与数据管理
        <small>>>设备数据管理</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 设备数据管理</a></li>
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
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <br>
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            height="400"
            style="width: 100%"
          >
            <!--
              <el-table-column
                fixed
                prop="date"
                label="日期"
                width="150"
              >
              </el-table-column>
              -->
            <el-table-column
              fixed
              prop="unitNumber"
              align="center"
              label="UnitNumber"
              width="105"
            >
            </el-table-column>
            <el-table-column
              prop="opSet1"
              label="传感器1"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="opSet2"
              label="传感器2"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="opSet3"
              label="传感器3"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure1"
              label="传感器4"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure2"
              label="传感器5"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure3"
              label="传感器6"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure4"
              label="传感器7"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure5"
              label="传感器8"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure6"
              label="传感器9"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure7"
              label="传感器10"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure8"
              label="传感器11"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure9"
              label="传感器12"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure10"
              label="传感器13"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure11"
              label="传感器14"
              width="110"
            >
            </el-table-column>

            <el-table-column
              prop="sensorMeasure12"
              label="传感器15"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure13"
              label="传感器16"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure14"
              label="传感器17"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure15"
              label="传感器18"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure16"
              label="传感器19"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure17"
              label="传感器20"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure18"
              label="传感器21"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure19"
              label="传感器22"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure20"
              label="传感器23"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="sensorMeasure21"
              label="传感器24"
              width="110"
            >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="currentTotal"
              style="float:right"
            >

            </el-pagination>
          </div>
        </el-main>
      </el-container>

    </section>
  </div>

</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      filterText: '',
      tableData: [],
      currentTotal: 0,
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示条目数
      responseResult: [],
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
  created() {
    axios.get('/equipmentdata').then((res) => {
      this.tableData = res.data
      this.currentTotal = this.tableData.length
      console.log(res.data)
      console.log(this.currentTotal)
      console.log(this.tableData)
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }

}
</script>
