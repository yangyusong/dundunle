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
	 this.state = 1;
	 this.count = 0;
     };

     Player.prototype = {
	 init: function(pos, elem){
	     this.pos = pos;
	     this.elem = elem;
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
		 if(action == 0){
		     this.sit();
		 } else if(action == 1){
		     this.stand();
		 };		 
	     };
	 },
	 play: function(action){
	     var cmd = {action: action, sid: this.id};
	     if(action != this.state){
		 if(action == 0){
		     this.sit();
		 } else if(action == 1){
		     this.stand();
		 };
		 sender.sendact(cmd);
	     };	     
	 },
	 next: function(pos){
	     var cmd = {sid: this.id, pos: pos};
	     sender.sendnext(cmd);
	 },
	 stand: function(){
	     this.state = 1;
	     view.stand(this);
	 },
	 sit: function(){
	     this.state = 0;
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