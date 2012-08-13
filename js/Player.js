/*
 * @author: Haosong Huang
 * @email: haosdent@gmail.com
 * @date: 2012-08-12
 */
(function(){
     var Player = function(role, name, id, pos, elem){
	 this.id = id;
	 this.name = name;
	 this.role = role;
	 this.pos = pos;
	 this.elem = elem;
	 this.state = pub.action.stand;
	 this.count = 0;
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
	     var cmd = {action: action, sid: this.id};
	     if(action != this.state){
		 if(action == pub.action.sit){
		     this.sit();
		 } else if(action == pub.action.sit){
		     this.stand();
		 };
		 sender.sendact(cmd);
	     };	     
	 },
	 next: function(){
	     var cmd = {sid: game.localPlayer.id, pos: this.pos};
	     sender.sendnext(cmd);
	 },
	 stand: function(){
	     this.state = pub.action.stand;
	     view.stand(this);
	 },
	 sit: function(){
	     this.state = pub.action.sit;
	     view.stand(this);
	 },
	 win: function(){
	     view.win(this);
	 },
	 lose: function(){
	     view.lose(this);
	 }
     };
}).call(window);