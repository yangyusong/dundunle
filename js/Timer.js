(function(win){
	/*class Timer
	*/
	var Timer = win.Timer = function(fps){
		this.fps = fps || 30;
		this.interval = null;
		this.funcArr = [];
		this.length = 0;
		this.frame = 0;
	};
	Timer.prototype = {
		start:function(fps){
			var that = this;
			this.fps = fps||this.fps;
			if(this.interval){
				this.stop();
			}
			this.interval = setInterval(function(){
				that.frame ++;
				for(var i = 0;i < that.length;i ++){
					that.funcArr[i]();
				}
			}, 1000/this.fps);
		},
		stop:function(){
			clearInterval(this.interval);
			this.interval = null;
		},
		addFunc:function(func){
			if(func instanceof Function){
				this.funcArr.push(func);
				this.length ++;
			}
		},
		removeFunc:function(func){
			var index = this.funcArr.indexOf(func);
			if(index!=-1){
				this.length --;
				this.funcArr.splice(index, 1);
			}
		},
		removeAllFunc:function(){
			this.funcArr = [];
			this.length = 0;
		}
	};
})(window);