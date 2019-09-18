<!--  -->
<template>
	<div class="outSide">
		<canvas id="canvas" ></canvas>
		<canvas v-if="false" id="canvas_crop"></canvas>
		<el-row>
			<el-card style="padding: 10px;" class="myCard">
				<!-- <div style="width:16px;height:16px;" class="cut_pic" @click="clipImage"></div> -->
				<el-popover
					class="myPopover"
					style="min-width:95px;width:95px;"
					placement="bottom"
					width="50"
					trigger="click">
					<div>
						<el-button type="text" v-if="showCutButton" @click="chooseCutArea">框选裁剪区域</el-button>
						<el-button type="text" v-if="!showCutButton" @click="clipImage">裁剪</el-button>
					</div>
					<div style="width:16px;height:16px;" slot="reference" class="cut_pic"></div>
				</el-popover><!--剪裁图层-->
				
				<!-- <div style="width:16px;height:16px;" class="turn_left" @click="flip"></div> -->
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
				</el-popover><!--添加图片-->

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
				</el-popover><!--添加文字-->

				<div style="width:16px;height:16px;" class="refresh" @click="clearAll"></div><!--全部重做-->

				<el-tooltip class="item" effect="dark" content="删除元素" placement="bottom-start">
					<div style="width:16px;height:16px;" class="deleteSelect" @click="deleteSelect"></div><!--删除选中图层-->
				</el-tooltip>

				<el-tooltip class="item" effect="dark" content="撤销操作" placement="bottom-start">
					<div style="width:16px;height:16px;" id="undo" class="undo" @click="unDoEvent"></div><!--返回上一步操作-->
				</el-tooltip>

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
		pos: [0, 0],
		rvg:null,
		mousex:0,
		mousey:0,
		crop:false,
		disabled:false,
		object:null,
		objectCut:null,
		lastActive:null,
		el:null,
		selection_object_left: 0,
		selection_object_top: 0,
		isCropping: false,
		buttonConType: true,
		showCutButton: true,
		config : {
			canvasState             : [],
			currentStateIndex       : -1,
			redoStatus              : false, //撤销状态
			undoStatus              : false,  // 重做状态
			undoFinishedStatus      : 1,
			redoFinishedStatus      : 1,
			undoButton              : this.$refs.undo,
			redoButton              : this.$refs.redo,
        }
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
		var _self = this;
		const canvas = new fabric.Canvas('canvas');
		this.cardPublic = canvas;//把 card对象给cardPublic供全局使用
		this.cardPublic.setWidth(600)
		this.cardPublic.setHeight(400)
		this.cardPublic.backgroundColor = "#333";
		this.cardPublic.renderAll();
		// fabric.Image.fromURL('../src/assets/QQ20190913-000717@2x.png', (img) => {
		// 	img.set({
		// 	// 通过scale来设置图片大小，这里设置和画布一样大
		// 		scaleX: card.width / img.width,
		// 		scaleY: card.height / img.height,
		// 	});
		// 	// 设置背景
		// 	card.setBackgroundImage(img, card.renderAll.bind(card));
		// 	card.renderAll();
		// });

		// var rvg = document.getElementById('canvas').getBoundingClientRect();
		// _self.pos[0] = rvg.left;
		// _self.pos[1] = rvg.top;
		// let el = new fabric.Rect({
		// 	fill: 'transparent',
		// 	originX: 'left',
		// 	originY: 'top',
		// 	stroke: '#ccc',
		// 	strokeDashArray: [2, 2],
		// 	opacity: 1,
		// 	width: 1,
		// 	height: 1
		// });
		// el.visible = false;
		// _self.cardPublic.add(el);
		fabric.util.loadImage('../src/assets/QQ20190913-000717@2x.png', function (img) {
			_self.object = new fabric.Image(img);
			_self.object.set({
				// left: 100,
        		// top: 100,
				// scaleX: card.width / img.width,
				// scaleY: card.height / img.height,
				selectable: true
			});
			_self.object.hasRotatingPoint = true;
			_self.object.scaleX = _self.object.scaleY = 0.5;
			_self.cardPublic.add(_self.object);
			_self.cardPublic.renderAll();
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
		// this._self.textLocation_top += 50;//多次添加文字纵向位置
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
	//旋转
	flip(){
		// 顺时针90°旋转
		const currAngle = this.cardPublic.getActiveObject().angle; // 当前图层的角度
		const angle = currAngle === 360 ? 90 :currAngle + 90;
		this.cardPublic.getActiveObject().angle = angle;
		// 如果是通过滑块的方式控制旋转
		// this.selectedObj.rotate(slideValue);

		// 所有图层的操作之后，都需要调用这个方法
		this.cardPublic.renderAll()
		// const currAngle = this.cardPublic.getActiveObject();
		// const angle = currAngle === 360 ? 90 :currAngle - 90;
		//  currAngle.rotate(angle);

		// const currAngle = this.cardPublic.backgroundImage.angle; // 当前图层的角度
		// this.cardPublic.backgroundImage.rotate(angle);
        // this.cardPublic.requestRenderAll();
	},
	//剪裁图层 =====>剪裁方法
	cropImage(png, left, top, height, width) {
		var _self = this;
        //将图片放进一个新的canvas中，经裁剪后导出一个新的图片。
        //如果用户选框大于原图片，则将选框缩至原图片大小
        if (top < png.top) {
            height = height - (png.top - top);
            top = png.top;
        }
        if (left < png.left) {
            width = width - (png.left - left);
            left = png.left;
        }
        if (top + height > png.top + png.height * png.scaleY)
            height = png.top + png.height * png.scaleY - top;
        if (left + width > png.left + png.width * png.scaleX)
            width = png.left + png.width * png.scaleX - left;

        var canvas_crop = new fabric.Canvas("canvas_crop");

        fabric.Image.fromURL(_self.cardPublic.toDataURL('png'), function(img) {
            img.set('left', -left);
            img.set('top', -top);
            canvas_crop.add(img)
            canvas_crop.setHeight(height);
            canvas_crop.setWidth(width);
            canvas_crop.renderAll();
            fabric.Image.fromURL(canvas_crop.toDataURL('png'), function(croppedImg) {
                croppedImg.set('left', left);
                croppedImg.set('top', top);
                _self.cardPublic.add(croppedImg).renderAll();
            });
        });

    },
	//剪裁图层 =====>确定剪裁动作
	clipImage(){
		var _self = this;
		if (!_self.isCropping) {
            alert("请先框选裁剪区域。");
            return;
        }

        var left = _self.el.left - _self.objectCut.left;
        var top = _self.el.top - _self.objectCut.top;

        left *= 1;
        top *= 1;

        var width = _self.el.width * 1;
        var height = _self.el.height * 1;

        //将当前帧导出到一个新的canvas中并执行裁剪，在此期间暂停记录历史记录。
        this.cropImage(_self.objectCut, _self.el.left, _self.el.top, parseInt(_self.el.scaleY * height), parseInt(width * _self.el.scaleX));
        // for (var i = 0; i < $("#layers li").length; i++) {
        //     canvas.item(i).selectable = true;
        // }
        // disabled = true;

        _self.cardPublic.remove(_self.objectCut);
        _self.cardPublic.remove(_self.cardPublic.getActiveObject());
        _self.lastActive = _self.objectCut;
        _self.cardPublic.renderAll();

		_self.isCropping = false;
		_self.showCutButton = true;
	},
	//剪裁图层 =====>选择要剪裁的图层
	chooseCutArea(){
		var _self = this;
		
		 _self.cardPublic.remove(_self.el);
        if (_self.cardPublic.getActiveObject()) {
            if (_self.cardPublic.getActiveObject().type == 'sprite') {
                alert("所选对象不可裁剪。");
                return;
            }
            _self.objectCut = _self.cardPublic.getActiveObject();
            if (_self.lastActive !== _self.objectCut) {
                console.log('different object');
            } else {
                console.log('same object');
            }
            if (_self.lastActive && _self.lastActive !== _self.objectCut) {
                _self.lastActive.clipTo = null;
            }

            //生成一个和待裁剪元素相同大小的矩形用于框选裁剪区域
            _self.el = new fabric.Rect({
                fill: 'rgba(0,0,0,0)',
                originX: 'left',
                originY: 'top',
                stroke: '#ccc',
                //strokeDashArray: [2, 2],
                strokWidth: 5,
                //opacity: 1,
                width: 1,
                height: 1,
                borderColor: '#36fd00',
                cornerColor: 'green',
                hasRotatingPoint: false,
                selectable: true
            });

            _self.el.left = _self.cardPublic.getActiveObject().left;
            _self.selection_object_left = _self.cardPublic.getActiveObject().left;
            _self.selection_object_top = _self.cardPublic.getActiveObject().top;
            _self.el.top = _self.cardPublic.getActiveObject().top;
            _self.el.width = _self.cardPublic.getActiveObject().width * _self.cardPublic.getActiveObject().scaleX;
            _self.el.height = _self.cardPublic.getActiveObject().height * _self.cardPublic.getActiveObject().scaleY;


            _self.cardPublic.add(_self.el);
            _self.cardPublic.setActiveObject(_self.el);
            // for (var i = 0; i < $("#layers li").length; i++) {
            //     _self.cardPublic.item(i).selectable = false;
			// }
       		 _self.showCutButton = false;
			
        } else {
            alert("请选中一个元素。");
        }
        _self.isCropping = true;
	},
	//删除所选元素
	deleteSelect(){
		let selectObj = this.cardPublic.getActiveObject(); // 返回当前画布中被选中的图层 
		if(!selectObj){
			alert('请先点击选择元素');
			return;
		}
		this.cardPublic.remove(selectObj) // 传入需要移除的object
		this.cardPublic.renderAll()
	},
	//初始化记录画图状态为撤销操作准备
	canvasDataChange(){
		let _self = this;
		this.cardPublic.on('object:modified', function(){
			_self.updateCanvasState();
		});
		this.cardPublic.on('object:added', function(){
			_self.updateCanvasState()
		});
		this.cardPublic.on('object:removed', function(){
			_self.updateCanvasState()
		});
		this.cardPublic.on('object:rotating', function(){
			_self.updateCanvasState()
		});
	},
	//更新画布状态
	updateCanvasState() {
		var _self = this;
		if(this.config.undoStatus == false && this.config.redoStatus == false){
			var jsonData  = _self.cardPublic.toJSON();
			var canvasAsJson  = JSON.stringify(jsonData);
			if(_self.config.currentStateIndex < _self.config.canvasState.length-1){
			var indexToBeInserted = _self.config.currentStateIndex+1;
				_self.config.canvasState[indexToBeInserted] = canvasAsJson;
			var numberOfElementsToRetain = indexToBeInserted+1;
				_self.config.canvasState = _self.config.canvasState.splice(0,numberOfElementsToRetain);
			}else{
				_self.config.canvasState.push(canvasAsJson);
			}
				_self.config.currentStateIndex = _self.config.canvasState.length-1;
			if((_self.config.currentStateIndex == _self.config.canvasState.length-1) && _self.config.currentStateIndex != -1){
					// _self.config.redoButton.disabled= true
			}
		}
	},
	//撤销操作事件
	unDoEvent(){
		let _self =this;
		if(this.config.undoFinishedStatus){
			if(this.config.currentStateIndex == -1){
				this.config.undoStatus = false;
			}else{
				if (this.config.canvasState.length >= 1) {
					this.config.undoFinishedStatus = 0;
					if(this.config.currentStateIndex != 0){
						this.config.undoStatus = true;
						this.cardPublic.loadFromJSON(this.config.canvasState[this.config.currentStateIndex-1],function(){
							var jsonData = JSON.parse(_self.config.canvasState[_self.config.currentStateIndex-1]);
							_self.cardPublic.renderAll();
							_self.config.undoStatus = false;
							_self.config.currentStateIndex -= 1;
								if(_self.config.currentStateIndex !== _self.config.canvasState.length-1){
								}
							_self.config.undoFinishedStatus = 1;
						});
					}
					else if(_self.config.currentStateIndex == 0){
						_self.cardPublic.clear();
						_self.config.undoFinishedStatus = 1;
						_self.config.currentStateIndex -= 1;
					}
				}
			}
		}
	},
	//清除所有添加的对象
	clearAll(){
		// this.cardPublic._objects.length = 0 ;
		// for(let i = 0; i < this.cardPublic._objects.length;){
		// 	this.cardPublic.remove(this.obj_Pub['textbox' + (this.cardPublic._objects.length)]);
		// }
		this.cardPublic._objects.splice(1,this.cardPublic._objects.length - 1);//保留this.cardPublic._objects中第一个元素，此元素为要修改的图片底层画布。
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
	this.canvasDataChange(); //监听canvas 事件
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
.el-popover{
	min-width: 95px;
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
.deleteSelect{
	@include buttonBase;
	background: url("../assets/delete.png");
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
.undo{
	@include buttonBase;
	background: url("../assets/undo.png");
	cursor: pointer;
}
</style>