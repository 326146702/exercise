<template>
  <div id="app">
    <!-- <Showblogs></Showblogs> -->
    <!-- <BlogHeader></BlogHeader>
    <router-view></router-view> -->
    <test></test>
  </div>
</template>

<script>
import Showblogs from "./components/showBlogs";
import BlogHeader from "./components/header";
import test from "./components/test";
export default {
  name: "app",
  components: {
    Showblogs,
    BlogHeader,
    test
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss">
.draggDiv{
  width: 20vw;
  height: 20vw;
  background: {
    color: red;
  }
}


h1,
h2 {
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
