<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1><i class='fa fa-fw fa-amazon'></i>{{ msg2 }}</h1>
    <button type="button" class="btn btn-success btn-sm">a bootstrap btn</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg2: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
