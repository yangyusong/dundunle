(function(){
     var Sound = this.Sound = function(){
	 this.sounds = {};
	 this.init();
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
	     } ;
	 };
     };



     Sound.prototype.play = function(role, action){
	 if(this.sounds[role]){
	     this.sounds[role][action].play();	     
	 }else{
	     this.sounds['role' + (role + 1)][action].play();     
	 };
     };
 }).call(window);