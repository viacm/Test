<template>
  <div
    id="app"
    class="wrapper animate-in"
  >
    <Header></Header>
    <Sidebar></Sidebar>
    <div
      class="content-wrapper"
      style="border-style:solid; border-color:white"
    >
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from './component/Header.vue'
import Footer from './component/Footer.vue'
import Sidebar from './component/Sidebar.vue'

export default {
  name: 'index',
  components: {
    Header,
    Sidebar,
    Footer
  }

}
</script>
