<!--  -->
<template>
	<div class="outSide">
		<canvas id="canvas" ></canvas>
		<el-row>
			<el-card style="padding: 10px;" class="myCard">
				<div style="width:16px;height:16px;" class="cut_pic"></div>
				<div style="width:16px;height:16px;" class="turn_left"></div>
				<el-popover
					placement="bottom"
					width="400"
					trigger="click">
					<div>
						<ChooseLocalPic
							@addPicUrl="addPicUrlEvent">
						</ChooseLocalPic>
					</div>
					<div style="width:16px;height:16px;" slot="reference" class="add_pic_button"></div>
				</el-popover>
				<el-popover
					placement="bottom"
					width="400"
					trigger="click">
					<div>
						<ColorPicker
							@colorPickerFor_text="colorPickerFor_textEvent">
						</ColorPicker>
					</div>
					<div style="width:16px;height:16px;" slot="reference" class="add_text_button"></div>
				</el-popover>
				<div style="width:16px;height:16px;" class="refresh" @click="clearAll"></div><!--全部重做-->
			</el-card>
		</el-row>
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
	ColorPicker: resolve => {
		require(["./ColorPicker.vue"], resolve);
	},
	ChooseLocalPic: resolve => {
		require(["./ChooseLocalPic.vue"], resolve);
	},
},
data() {
	return {
		//这里存放数据
		backgroudColor:'background: red;',
		mainHeight:window.innerHeight - 60,
		a: [],
		cardPublic:null,
		rectPublic:null,
		textbox_Public:null,
		textLocation_left:50,
		textLocation_top:50,
		text_color:'red',
		obj_Pub:{},
		num: 1,

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
	//初始化要修改的图片
	initPicTools(){
		const card = new fabric.Canvas('canvas');
		this.cardPublic = card;//把 card对象给cardPublic供全局使用
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
		
	},
	//添加文字
	addText(){
		var _self = this;
		this.obj_Pub['textbox' + _self.num] = new fabric.Textbox('添加文字', {
			left: _self.textLocation_left,
			top: _self.textLocation_top,
			width: 150,
			fontSize: 20, // 字体大小
			fontWeight: 800, // 字体粗细
			fill: _self.text_color, // 字体颜色
			// fontStyle: 'italic',  // 斜体
			// fontFamily: 'Delicious', // 设置字体
			// stroke: 'green', // 描边颜色
			// strokeWidth: 3, // 描边宽度
			hasControls: false,
			borderColor: 'orange',
			editingBorderColor: 'blue' // 点击文字进入编辑状态时的边框颜色
		});
		this.cardPublic.add(this.obj_Pub['textbox' + _self.num]);
		_self.num ++;//多次添加文字
		this._self.textLocation_top += 50;//多次添加文字纵向位置
	},
	//字体颜色组件冒上来的颜色值
	colorPickerFor_textEvent(item){
		this.text_color = item.color;
		this.addText();
	},
	
	//图片选择冒上来的图片URL
	addPicUrlEvent(item){
		// this.picUrl = item;
		// alert(this.picUrl)
		// 方式二（通过图片路径添加）
		var _self = this;
		for (var i = 0; i < item.length; i++) {
			fabric.Image.fromURL(item[i].url, function (img) {
				img.hasControls = true,
				img.borderColor = 'orange',
				img.scaleX = (_self.cardPublic.width / img.width) / 2,
				img.scaleY = (_self.cardPublic.height / img.height) / 2
				_self.cardPublic.add(img);
			});
		}
		// fabric.Image.fromURL(item, (img) => {
		// 	img.set({
		// 		scaleX: (this.cardPublic.width / img.width) / 2,
		// 		scaleY: (this.cardPublic.height / img.height) / 2,
		// 		hasControls: true, // 是否开启图层的控件
		// 		borderColor: 'orange', // 图层控件边框的颜色
		// 	});
		// 	// 添加对象后, 如下图
		// 	this.cardPublic.add(img);
		// });
	},
	
	//清除所有添加的对象
	clearAll(){
		this.cardPublic._objects.length = 0 ;
		// for(let i = 0; i < this.cardPublic._objects.length;){
		// 	this.cardPublic.remove(this.obj_Pub['textbox' + (this.cardPublic._objects.length)]);
		// }
		this.obj_Pub={}//将添加的对象置空
		this.num = 1;//对象名称编号回归1
		this._self.textLocation_top = 50;//文字对象位置还原
		this.cardPublic.renderAll();
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
.myCard .el-card__body{
	padding: 0;
}
@mixin buttonBase{
	float: left;
	margin-left:10px; 
}
.outSide{
	width: 50%;
	height: 50%;
	position:absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.refresh{
	@include buttonBase;
	background: url("../assets/refresh.png");
	cursor: pointer;
}
.add_text_button{
	@include buttonBase;
	background: url("../assets/textIcon.png");
	cursor: pointer;
}
.add_pic_button{
	@include buttonBase;
	background: url("../assets/addPic.png");
	cursor: pointer;
}
.cut_pic{
	@include buttonBase;
	background: url("../assets/cut.png");
	cursor: pointer;
}
.turn_left{
	@include buttonBase;
	background: url("../assets/turnleft.png");
	cursor: pointer;
}
</style>