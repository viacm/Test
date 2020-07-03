<template>
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img
            src="../../assets/img/user2-160x160.jpg"
            class="img-circle"
            alt="User Image"
          >
        </div>
        <div class="pull-left info">
          <p>郑晗峰</p>
          <!-- Status -->
          <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <ul
        class="sidebar-menu"
        data-widget="tree"
      >
        <li
          v-for="(item,index) in sidebarList"
          :key="item.key"
          @click="handleNav(item,index)"
          :class="[item.children.length?'treeview':'',index===currentIndex?'active':'']"
        >
          <router-link :to="item.link">
            <i :class="['fa',item.icon]"></i> <span>{{item.title}}</span>
            <i
              v-if="item.children.length"
              class="fa fa-angle-left pull-right"
            ></i>
          </router-link>
          <ul
            v-if="item.children.length"
            class="treeview-menu"
          >
            <li
              v-for="(citem,cindex) in item.children"
              :key="citem.key"
              @click="handleLevel(cindex)"
              :class="cindex+1===currentLevel?'level-active':''"
            >
              <router-link :to="citem.link"><i :class="['fa',citem.icon]"></i> <span>{{citem.title}}</span></router-link>
            </li>
          </ul>
        </li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>

</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      currentIndex: 0,
      currentLevel: 0,
      sidebarList: [
        {
          icon: 'fa-home',
          title: '首页',
          link: '/home',
          children: []
        },
        {
          icon: 'fa-folder',
          title: '设备信息与数据管理',
          link: '#',
          children: [{
            icon: 'fa-circle-o',
            title: '设备信息管理',
            link: '/equipment'
          }, {
            icon: 'fa-circle-o',
            title: '设备数据管理',
            link: '/equipmentdata'
          }]
        },
        {
          icon: 'fa-pie-chart',
          title: '设备剩余使用寿命预测',
          link: '#',
          children: [{
            icon: 'fa-circle-o',
            title: '预测模型训练',
            link: '/trainmodel'
          }, {
            icon: 'fa-circle-o',
            title: '剩余使用寿命预测',
            link: '/predict'
          }]
        },
        {
          icon: 'fa-table',
          title: '设备维检信息管理',
          link: '#',
          children: [{
            icon: 'fa-circle-o',
            title: '维检信息',
            link: '/weijian'
          }]
        },
        {
          icon: 'fa-cogs',
          title: '系统管理',
          link: '#',
          children: [{
            icon: 'fa-circle-o',
            title: '用户管理',
            link: '/system'
          }]
        }
      ]
    }
  },
  methods: {
    // 一级目录样式切换
    handleNav(item, index) {
      this.currentIndex = index
      localStorage.setItem('navIndex', this.currentIndex)
      if (!item.children.length) {
        this.currentLevel = 0
        localStorage.removeItem('levelIndex')
      }
    },
    // 二级目录样式切换
    handleLevel(index) {
      this.currentLevel = index + 1
      localStorage.setItem('levelIndex', this.currentLevel)
    }
  },
  mounted() {
    if (localStorage.getItem('navIndex')) {
      this.currentIndex = parseInt(localStorage.getItem('navIndex'))
    }
    if (localStorage.getItem('levelIndex')) {
      this.currentLevel = parseInt(localStorage.getItem('levelIndex'))
    }
  }
}
</script>
