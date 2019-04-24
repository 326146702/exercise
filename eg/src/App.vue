<template>
  <div id="app">
    <!-- <Showblogs></Showblogs> -->
    <BlogHeader></BlogHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import Showblogs from './components/showBlogs'
import BlogHeader from './components/header'
export default {
  name: 'app',
  components:{
    Showblogs,BlogHeader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
