<template>
  <div
    id="index"
    class="animate-in"
  >
    <section class="content-header">
      <h1>
        设备信息与数据管理
        <small>>>设备信息管理</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 设备信息管理</a></li>
      </ol>
    </section>
    <section class="content">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="id"
          align="center"
          label="序号"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="设备名称"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="style"
          align="center"
          label="设备规格"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="power"
          align="center"
          label="功率"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="place"
          align="center"
          label="产地"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="c_time"
          align="center"
          label="生产日期"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="principle"
          align="center"
          label="负责人"
          width="110"
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              size="medium"
              type="text"
              @click="handlecheck(scope.$index, scope.row)"
            >查看设备详细结构</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-button
          size="mini"
          type="danger"
          style="float:left"
          @click="handleadd"
        >添加</el-button>
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
      <el-dialog
        :title="title"
        width="50%"
        :visible.sync="iconFormVisible"
        @close="clear"
      >
        <el-form
          :inline="true"
          :model="equipmentInfo"
          style="text-align: left"
          class="demo-form-inline"
        >
          <el-form-item label="设备名称">
            <el-input
              v-model="equipmentInfo.name"
              placeholder="设备名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备规格">
            <el-input
              v-model="equipmentInfo.style"
              placeholder="设备规格"
            ></el-input>
          </el-form-item>
          <el-form-item label="  功率">
            <el-input
              v-model="equipmentInfo.power"
              placeholder="  功率"
            ></el-input>
          </el-form-item>
          <el-form-item label="产地">
            <el-input
              v-model="equipmentInfo.place"
              placeholder="产地"
            ></el-input>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-input
              v-model="equipmentInfo.c_time"
              placeholder="生产日期"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input
              v-model="equipmentInfo.principle"
              placeholder="负责人"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="iconFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitUser()"
          >确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :title="结构图"
        width="50%"
        :visible.sync="structureVisible"
      >
        <img src="../../assets/img/user2-160x160.jpg">
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'weijian',
  data() {
    return {
      structureVisible: false, // 结构信息
      iconFormVisible: false, // 信息模态框
      title: '',
      equipmentInfo: {
        id: '',
        name: '',
        style: '',
        power: '',
        place: '',
        c_time: '',
        principle: ''
      },
      tableData: [],
      currentTotal: 0,
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示条目数
      responseResult: []
    }
  },
  created() {
    this.loadingdata()
  },
  methods: {
    clear() {
      this.equipmentInfo = {
        id: '',
        name: '',
        style: '',
        power: '',
        place: '',
        c_time: '',
        principle: ''
      }
    },
    loadingdata() {
      this.$axios.get('/equipment').then((res) => {
        this.tableData = res.data
        this.currentTotal = this.tableData.length
        console.log(res.data)
        console.log(this.currentTotal)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.title = '编辑'
      this.equipmentInfo = row
      this.iconFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.equipmentInfo = row
      this.$confirm(`确定删除${row.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        console.log(this.equipmentInfo.id)
        this.$axios.post('/deleteequipment', {
          id: this.equipmentInfo.id,
          name: this.equipmentInfo.name,
          style: this.equipmentInfo.style,
          power: this.equipmentInfo.power,
          place: this.equipmentInfo.place,
          c_time: this.equipmentInfo.c_time,
          principle: this.equipmentInfo.principle
        }).then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$message({
              message: '恭喜你，删除成功！！',
              type: 'success'
            })
            this.loadingdata()
            this.iconFormVisible = false
          } else {
            this.$message.error('对不起，删除失败！！')
          }
        })
      })
    },
    handlecheck(index, row) {
      console.log(index, row)
      this.structureVisible = true
    },
    handleadd() {
      this.title = '增加'
      console.log(this.title)
      this.iconFormVisible = true
    },
    submitUser() {
      console.log(this.title)
      if (this.title === '编辑') {
        this.$axios.post('/updateequipment', {
          id: this.equipmentInfo.id,
          name: this.equipmentInfo.name,
          style: this.equipmentInfo.style,
          power: this.equipmentInfo.power,
          place: this.equipmentInfo.place,
          c_time: this.equipmentInfo.c_time,
          principle: this.equipmentInfo.principle
        }).then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$message({
              message: '恭喜你，编辑成功！！',
              type: 'success'
            })
            this.loadingdata()
            this.iconFormVisible = false
          } else {
            this.$message.error('对不起，编辑失败！！')
          }
        })
      } else {
        this.$axios.post('/insertequipment', {
          name: this.equipmentInfo.name,
          style: this.equipmentInfo.style,
          power: this.equipmentInfo.power,
          place: this.equipmentInfo.place,
          c_time: this.equipmentInfo.c_time,
          principle: this.equipmentInfo.principle
        }).then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$message({
              message: '恭喜你，新增成功！！',
              type: 'success'
            })
            this.loadingdata() // 刷新页面
            this.iconFormVisible = false
          } else {
            this.$message.error('对不起，新增失败！！')
          }
        })
      }
    }
  }
}
</script>
