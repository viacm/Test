<template>
  <header class="main-header">

    <!-- Logo -->
    <a
      href="#"
      class="logo"
    >
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>RUL</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>飞机发动机剩余使用寿命</b>管理系统</span>
    </a>

    <!-- Header Navbar -->
    <nav
      class="navbar navbar-static-top"
      role="navigation"
    >
      <!-- Sidebar toggle button-->
      <a
        href="#"
        class="sidebar-toggle"
        data-toggle="push-menu"
        role="button"
      >
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >
              <!-- The user image in the navbar-->
              <img
                src="../../assets/img/user2-160x160.jpg"
                class="user-image"
                alt="User Image"
              >
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs">郑晗峰</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img
                  src="../../assets/img/user2-160x160.jpg"
                  class="img-circle"
                  alt="User Image"
                >

                <p>Member since Nov. 2019</p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a
                    href="#"
                    class="btn btn-default btn-flat"
                  >Profile</a>
                </div>
                <div class="pull-right">
                  <a
                    href="#"
                    class="btn btn-default btn-flat"
                  >Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'top'
}
</script>
