<!--  -->
<template>
  <div>
    <label for="">搜索</label>
    <input type="text" v-model="search" />
    <div v-for="(item,index) in filteredBlogs">
      <h1 v-rainbow >{{item.title | to-uppercase}}</h1>
      <p>{{item.body | snippet}}</p>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//例如：import {函数名称1，函数名称2} from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    //1、直接挂载
    //组件名称1,
    //组件名称2,
    //2、懒加载
    //组件名称1: resolve => {require(['组件名称1.vue'], resolve);}
  },
  directives:{ //自定义指令 
    'rainbow':{
      bind(el,binding,vnode){
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
      }
    }
  },
  filters:{//过滤器
    "to-uppercase":function(value){
      return value.toUpperCase();
    }
  },
  data() {
    return {
      dataList: [],
      search:'',
      //这里存放数据
    };
  },
  computed: {
    //计算属性 类似于data概念
    filteredBlogs:function(){
      return this.dataList.filter((e) =>{
        return e.title.match(this.search);
      })
    }
  },
  watch: {
    //监控data中的数据变化
  },
  methods: {
    //方法集合
  },
  beforeCreate() {}, //生命周期 - 组件实例化之前执行的函数
  created() {
    this.$http
      .get("http://jsonplaceholder.typicode.com/posts")
      .then(function(data) {
        console.log(data);
        this.dataList = data.body;
        this.dataList = this.dataList.slice(0, 10);
      });
  }, //生命周期 - 组件实例化完毕，但页面还未显示（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 组件挂载前，页面仍未显示，但虚拟DOM已经OK
  mounted() {}, //生命周期 - 挂载完成，此方法执行后页面内容显示（可以访问DOM元素）
  beforeUpdate() {}, //生命周期 - 组件更新之前，页面仍未更新
  updated() {}, //生命周期 - 组件更新之后，此方法执行后页面更新
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>