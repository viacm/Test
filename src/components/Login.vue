<template>

  <body id="paper">
    <el-form
      :model="loginForm"
      :rules="rules"
      class="login-container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <h3 class="login_title">设备剩余寿命预测系统</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox
        class="login_remember"
        v-model="checked"
        label-position="left"
      ><span style="color: #505458">记住密码</span></el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 40%;background: #505458;border: none"
          v-on:click="login"
        >登录</el-button>
        <router-link to="register">
          <el-button
            type="primary"
            style="width: 40%;background: #505458;border: none"
          >注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login() {
      var _this = this
      console.log(this.$store.state)
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password

      }).then(successResponse => {
        this.responseResult = JSON.stringify(successResponse.data)
        if (successResponse.data.code === 200) {
          _this.$store.commit('login', _this.loginForm) // 发送正确数据到store中
          var path = this.$route.query.redirect
          this.$router.replace({ path: path === '/' || path === undefined ? '/index' : path }) // 获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
        }
      })
        .catch(failResponse => {
          this.$router.replace({ path: '/hello' })
        })
    }
  }
}

</script>
<style>
body {
  margin: -5px 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
/*.login_button {*/
/*background: #505458;*/
/*}*/
/*el_checkbox {*/
/*background: #505458;*/
/*}*/
</style>
