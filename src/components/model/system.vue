<template>
  <div
    id="index"
    class="animate-in"
  >
    <section class="content-header">
      <h1>
        系统管理
        <small>>>用户管理</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 用户管理</a></li>
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
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="年龄"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="company"
          align="center"
          label="公司"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="登录名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          align="center"
          label="登录密码"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          label="邮箱"
          width="200"
        >
        </el-table-column>
        <el-table-column align="right">
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
              @click="handlecheck()"
            >查看权限</el-button>
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
          :model="systemInfo"
          style="text-align: left"
          class="demo-form-inline"
        >
          <el-form-item label="姓名">
            <el-input
              v-model="systemInfo.name"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input
              v-model="systemInfo.age"
              placeholder="年龄"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司">
            <el-input
              v-model="systemInfo.company"
              placeholder="公司"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录名">
            <el-input
              v-model="systemInfo.username"
              placeholder="登录名"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input
              v-model="systemInfo.password"
              placeholder="登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="systemInfo.email"
              placeholder="邮箱"
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
      <!--权限设置 -->
      <el-dialog
        :title="authoritytitel"
        width="50%"
        :visible.sync="authorityVisible"
      >
        <el-form
          :model="authority"
          style="text-align: left"
          class="demo-form-inline"
        >
          <el-row>
            <el-col
              :span="8"
              :offset="8"
            >
              <th>查看</th>
            </el-col>
            <el-col :span="8">
              <th>添加、编辑和删除</th>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <th>设备信息与数据管理</th>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model1"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model1_operate"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <th>设备剩余使用寿命预测</th>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model2"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <th>设备维检信息管理</th>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model3"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model3_operate"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8">
              <th>系统管理</th>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model4"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
                <el-switch
                  style="display: block"
                  v-model="authority.model4_operate"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="否"
                  inactive-text="是"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="authorityVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitauthority()"
          >确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'system',
  data() {
    return {
      authorityVisible: false, // 设置权限
      iconFormVisible: false, // 信息模态框
      authoritytitel: '权限设置',
      title: '',
      authority: {
        id: '',
        name: '',
        model1: '1',
        model2: '1',
        model3: '1',
        model4: '1',
        model1_operate: '1',
        model3_operate: '1',
        model4_operate: '1'
      },
      systemInfo: {
        id: '',
        name: '',
        age: '',
        company: '',
        username: '',
        password: '',
        email: ''
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
      this.systemInfo = {
        id: '',
        name: '',
        age: '',
        company: '',
        username: '',
        password: '',
        email: ''
      }
    },
    loadingdata() {
      axios.get('/system').then((res) => {
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
      this.systemInfo = row
      this.iconFormVisible = true
    },
    handleadd(index, row) {
      this.title = '增加'
      console.log(this.title)
      this.iconFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.systemInfo = row
      this.$confirm(`确定删除${row.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        console.log(this.systemInfo.id)
        this.$axios.post('/deletesystem', {
          id: this.systemInfo.id,
          name: this.systemInfo.name,
          age: this.systemInfo.age,
          company: this.systemInfo.company,
          username: this.systemInfo.username,
          password: this.systemInfo.password,
          email: this.systemInfo.email
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
    handlecheck(index, row) {
      console.log(index, row)
      this.authorityVisible = true
    },
    submitauthority() {
      this.$axios.post('/authority', {
        id: this.authority.id,
        name: this.authority.name,
        model1: this.authority.model1,
        model2: this.authority.model2,
        model3: this.authority.model3,
        model4: this.authority.model4,
        model1_operate: this.authority.model1_operate,
        model3_operate: this.authority.model3_operate,
        model4_operate: this.authority.model4_operate
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
    },
    submitUser() {
      console.log(this.title)
      if (this.title === '编辑') {
        this.$axios.post('/updatesystem', {
          id: this.systemInfo.id,
          name: this.systemInfo.name,
          age: this.systemInfo.age,
          company: this.systemInfo.company,
          username: this.systemInfo.username,
          password: this.systemInfo.password,
          email: this.systemInfo.email
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
        this.$axios.post('/insertsystem', {
          id: this.systemInfo.id,
          name: this.systemInfo.name,
          age: this.systemInfo.age,
          company: this.systemInfo.company,
          username: this.systemInfo.username,
          password: this.systemInfo.password,
          email: this.systemInfo.email
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
