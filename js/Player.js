/*
 * @author: Haosong Huang
 * @email: haosdent@gmail.com
 * @date: 2012-08-12
 */
(function(){
     var Player = this.Player = function(role, name, id, pos, elem){
	 this.id = id;
	 this.name = name;
	 this.role = role;
	 this.pos = pos;
	 this.elem = elem;
	 this.state = pub.action.stand;
	 this.count = 0;
	 this.nextEnable = true;
	 if(elem){
	     eventBinder.next(this);
	 };
     };

     Player.prototype = {
	 init: function(pos, elem){
	     this.pos = pos;
	     this.elem = elem;
	     eventBinder.play(this);
	 },
	 setId: function(id){
	     this.id = id;
	 },
	 login: function(){
	     var cmd = {role: this.role, name: this.name};
	     sender.sendlogin(cmd);
	 },
	 act: function(action){
	     if(action != this.state){
		 if(action == pub.action.sit){
		     this.sit();
		 } else if(action == pub.action.stand){
		     this.stand();
		 };		 
	     };
	 },
	 play: function(action){
	     this.nextEnable = true;
	     if(!game.enable){return;};

	     var cmd = {action: action, sid: this.id};
	     if(action != this.state){
		 if(action == pub.action.sit){
		     this.sit();
		 } else if(action == pub.action.stand){
		     this.stand();
		 };
		 sender.sendact(cmd);
	     };	     
	 },
	 next: function(){
	     if(!game.enable){return;};
	     /*if(!this.nextEnable){return;};
	     console.log(this.nextEnable);
	     this.nextEnable = false;*/
	     var cmd = {sid: game.localPlayer.id, pos: this.pos};
	     sender.sendnext(cmd);
	 },
	 stand: function(){
	     this.state = pub.action.stand;
	     view.stand(this);
	 },
	 sit: function(){
	     this.state = pub.action.sit;
	     view.sit(this);
	 },
	 win: function(){
	     view.win(this);
	 },
	 lose: function(){
	     view.lose(this);
	 },
	 log: function(){
	     console.log(this.id + ':', arguments);
	 }
     };
}).call(window);