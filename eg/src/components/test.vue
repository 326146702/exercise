<!--  -->
<template>
	<div class="outSide">
		<canvas id="canvas" ></canvas>
		<el-card shadow="hover">
			<el-button type="text" icon="el-icon-crop"></el-button>
		</el-card>
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
      backgroudColor:'background: red;',
      mainHeight:window.innerHeight - 60,
      a: []
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
	initPicTools(){
    const card = new fabric.Canvas('canvas') 
    card.setWidth(600)
    card.setHeight(400)
    fabric.Image.fromURL('../src/assets/QQ20190913-000717@2x.png', (img) => {
      img.set({
      // 通过scale来设置图片大小，这里设置和画布一样大
        scaleX: card.width / img.width,
        scaleY: card.height / img.height,
      });
      // 设置背景
      card.setBackgroundImage(img, card.renderAll.bind(card));
      card.renderAll();
    });
        
		// var canvas = new fabric.Canvas('canvas');//声明画布
		// canvas.setBackgroundImage(require('../assets/QQ20190913-000717@2x.png'), canvas.renderAll.bind(canvas), {
		// 	scaleY: 23,
		// 	scaleX: 23
		// })
		// var imgElement = document.getElementById('img');//声明我们的图片     
		// var rect = new fabric.Rect({
		// 	left:600,//距离画布左侧的距离，单位是像素
		// 	top:300,//距离画布上边的距离
		// 	fill:'red',//填充的颜色
		// 	width:600,//方形的宽度
		// 	height:600//方形的高度
		// });
		
		// canvas.add(rect);//加入到canvas中
	}
  },
  beforeCreate() {}, //生命周期 - 组件实例化之前执行的函数
  created() {
    
  }, //生命周期 - 组件实例化完毕，但页面还未显示（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 组件挂载前，页面仍未显示，但虚拟DOM已经OK
  mounted() {
    this.initPicTools();
  }, //生命周期 - 挂载完成，此方法执行后页面内容显示（可以访问DOM元素）
  beforeUpdate() {}, //生命周期 - 组件更新之前，页面仍未更新
  updated() {}, //生命周期 - 组件更新之后，此方法执行后页面更新
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss'>
//@import url(); 引入公共css类
.outSide{
	width: 50%;
	height: 50%;
	position:absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

</style>