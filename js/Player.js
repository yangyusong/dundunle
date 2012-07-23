(function(win){

	var actionConfig = ["sitDown", "standUp", "stand"];
	var stateConfig = ["success", "lose", "wait", "playing"];

	/*class Player
	*/
	var Player = win.Player = function(data){
		this.init(data);
	};

	/*初始化
	  @params data 角色数据, json格式
	*/
	Player.prototype.init = function(data){
		this.name = "player";
		this.action = 2;
		this.state = 3;
		this.position = {x:0, y:0};
		this.role = ""; //角色类型
		this.count = 0; //蹲下次数

		this._time = 0;  //内部计时器
		this._width = 0;
		this._frame = 0;
		this._frames = {};

		for(var i in data){
			this[i] = data[i];
		};

		this._setElement();
		this._setImage();
		this._setFrames();
	};

	/*播放动画
	  @param data 动画名称或动画编号
	*/
	Player.prototype.play = function(data){
		if(typeof(data) !== "string" && data < actionConfig.length){
			this.action = data;
			this._play(actionConfig[data]);
		}
		else if(data in this._frames){
			this._play(data);
		}
		else{
			log(data)
			console.log("木有这个动作");
		}

		if(data === "sitDown" || data === 0){
			this.count ++;
			audio.play(this, "sitDown")
		}
	}

	Player.prototype.showTips = function(){
		var elem = document.querySelector("#gbox");
		elem.style.display = "block";
		elem.innerHTML = this.name + "蹲";
		this.elem.appendChild(elem);
		setTimeout(function(){
			elem.style.display = "none";
		}, 500);
	}

	Player.prototype._play = function(name){
		var fps = 5;
		var duration = t.fps/fps;

		var frames = this._frames[name];
		this._time = 0;
		this._frame = 0;
		this._setFrame(frames[this._frame], 0);

		var that = this;
		t.addFunc(function(){
			that._time ++;
			if(that._time > duration){
				that._frame ++;
				if(that._frame >= frames.length){
					t.removeFunc(arguments.callee);
					return;
				}
				that._setFrame(frames[that._frame], 0);
				that._time = 0;
			}
		});
	};

	Player.prototype._getElemByPosition = function(){
		return "player" + this.position[0];
	}

	Player.prototype._setElement = function(){
		var id = this._getElemByPosition();
		this.elem = document.querySelector("#" + id);
		this.elem.querySelector("span").innerHTML = this.name;
	}

	Player.prototype._setImage = function(){
		this.image = R.animation[this.role];
		elem = this.elem;
		this.elem.style.width = this.image.width + "px";
		this.elem.style.height = this.image.height + "px";
		this.elem.style.backgroundImage = "url(" +R.images[this.image.name] + ")";

		this._width = this.image.width;
	};

	/*
	  生成动画帧
	*/
	Player.prototype._setFrames = function(){
		var frames = R.animation[this.role].frames;
		var num, frame, i, x, y, obj, startIndex, width = this._width;

		for(name in frames){
			frame = frames[name];
			obj = [];
			startIndex = frame.startIndex;
			for(i = 0, num = frame.num;i < num;i ++){
				obj.push((startIndex + i) * width);
			}
			this._frames[name] = obj;
		}
	};

	/*
	  设置第几帧
	  @param x, y
	*/
	Player.prototype._setFrame = function(x, y){
		this.elem.style.backgroundPosition = -x + "px " + y + "px";
	};


})(window);