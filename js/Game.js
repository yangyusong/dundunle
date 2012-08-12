/*
 * @author: Haosong Huang
 * @email: haosdent@gmail.com
 * @date: 2012-08-12
 */
(function(){
     var Game = function(role, name){
	 this.players = [];
	 this.localPlayer = new Player(role, name);
	 this.localPlayer.login();
     };

     Game.prototype = {
	 init: function(players){
	     var player, playerElem;
	     for(var i = 0, l = players.length; i < l; i++){
		 player = players[i];
		 playerElem = view.createPlayerElem(player.pos);
		 if(player.id != this.localPlayer.id){
		     player = new Player(player.role, player.name, player.sid, player.pos, playerElem);
		     this.players.push(player);
		 } else {
		     this.localPlayer.init(player.pos, playerElem);
		 };
	     };
	 },
	 start: function(players){
	     this.init(players);
	     view.start();
	 },
	 end: function(){
	     view.end();
	 }
     };
}).call(window);