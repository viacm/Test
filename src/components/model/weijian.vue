<template>
  <div
    id="index"
    class="animate-in"
  >
    <section class="content-header">
      <h1>
        设备维检信息管理
        <small>>>维检信息</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 维检信息</a></li>
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
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          label="设备编号"
          width="100"
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
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="维检日期"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="part"
          align="center"
          label="故障部位"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          align="center"
          label="故障原因"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="people"
          align="center"
          label="维检人员"
          width="120"
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
          </template>
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
        <el-button
          size="mini"
          type="danger"
          @click="handleadd()"
        >添加</el-button>
      </div>
      <el-dialog
        :title="title"
        width="50%"
        :visible.sync="iconFormVisible"
        @close="clear"
      >
        <el-form
          :inline="true"
          :model="weijianInfo"
          style="text-align: left"
          class="demo-form-inline"
        >
          <el-form-item label="设备编号">
            <el-input
              v-model="weijianInfo.number"
              placeholder="设备编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input
              v-model="weijianInfo.name"
              placeholder="设备名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备规格">
            <el-input
              v-model="weijianInfo.style"
              placeholder="设备规格"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修日期">
            <el-input
              v-model="weijianInfo.date"
              placeholder="维修日期"
            ></el-input>
          </el-form-item>
          <el-form-item label="故障部位">
            <el-input
              v-model="weijianInfo.part"
              placeholder="故障部位"
            ></el-input>
          </el-form-item>
          <el-form-item label="故障原因">
            <el-input
              v-model="weijianInfo.reason"
              placeholder="故障原因"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修人员">
            <el-input
              v-model="weijianInfo.people"
              placeholder="维修人员"
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
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'weijian',
  data() {
    return {
      iconFormVisible: false, // 信息模态框
      title: '',
      weijianInfo: {
        id: '',
        number: '',
        name: '',
        style: '',
        date: '',
        part: '',
        reason: '',
        people: ''
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
      this.weijianInfo = {
        id: '',
        number: '',
        name: '',
        style: '',
        date: '',
        part: '',
        reason: '',
        people: ''
      }
    },
    loadingdata() {
      axios.get('/weijian').then((res) => {
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
      this.weijianInfo = row
      this.iconFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.weijianInfo = row
      this.$confirm(`确定删除${row.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        console.log(this.weijianInfo.id)
        this.$axios.post('/deleteweijian', {
          id: this.weijianInfo.id,
          number: this.weijianInfo.number,
          name: this.weijianInfo.name,
          style: this.weijianInfo.style,
          date: this.weijianInfo.date,
          part: this.weijianInfo.part,
          reason: this.weijianInfo.reason,
          people: this.weijianInfo.people
        }).then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$message({
              message: '恭喜你，删除成功！！',
              type: 'success'
            })
            this.loadingdata()
          } else {
            this.$message.error('对不起，删除失败！！')
          }
        })
      })
    },
    handleadd() {
      this.title = '增加'
      console.log(this.title)
      this.iconFormVisible = true
    },
    submitUser() {
      console.log(this.title)
      if (this.title === '编辑') {
        this.$axios.post('/updateweijian', {
          id: this.weijianInfo.id,
          number: this.weijianInfo.number,
          name: this.weijianInfo.name,
          style: this.weijianInfo.style,
          date: this.weijianInfo.date,
          part: this.weijianInfo.part,
          reason: this.weijianInfo.reason,
          people: this.weijianInfo.people
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
        this.$axios.post('/insertweijian', {
          number: this.weijianInfo.number,
          name: this.weijianInfo.name,
          style: this.weijianInfo.style,
          date: this.weijianInfo.date,
          part: this.weijianInfo.part,
          reason: this.weijianInfo.reason,
          people: this.weijianInfo.people
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
