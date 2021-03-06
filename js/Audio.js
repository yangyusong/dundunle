(function(win){
	var Sound = win.Sound = function(){
		this.sounds = {};
	};

	Sound.prototype.init = function(){
		var elem = document.querySelector("#sound");
		for (name in R.sounds){
			var role = R.sounds[name];
			this.sounds[name] = {};
			for(i in role){
				this.sounds[name][i];
				var audio = new Audio();
				audio.src = role[i];
				this.sounds[name][i] = audio;
				elem.appendChild(audio);
			} 
		}
	} 



	Sound.prototype.play = function(role, action){
		this.sounds[role][action].play();
	}
})(window);