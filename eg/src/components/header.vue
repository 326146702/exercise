<!--  -->
<template>
  <div>
      <nav>
          <ul>
              <li>
                  <router-link to="/">博客</router-link>
                  <router-link to="/add">写博客</router-link>
              </li>
          </ul>
      </nav>
  <div draggable="true" class="draggDiv"> 
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
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
  data() {
    return {
      //这里存放数据
    };
  },
  computed: {
    //监听属性 类似于data概念
  },
  watch: {
    //监控data中的数据变化
  },
  methods: {
    //方法集合

  },
  beforeCreate() {}, //生命周期 - 组件实例化之前执行的函数
  created() {}, //生命周期 - 组件实例化完毕，但页面还未显示（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 组件挂载前，页面仍未显示，但虚拟DOM已经OK
  mounted() {}, //生命周期 - 挂载完成，此方法执行后页面内容显示（可以访问DOM元素）
  beforeUpdate() {}, //生命周期 - 组件更新之前，页面仍未更新
  updated() {}, //生命周期 - 组件更新之后，此方法执行后页面更新
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>