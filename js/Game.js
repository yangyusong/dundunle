/*
 * @author: Haosong Huang
 * @email: haosdent@gmail.com
 * @date: 2012-08-12
 */
(function(){
     var Game = this.Game = function(role, name){
	 //Test should be false
	 this.enable = true;
	 this.players = [];
	 this.localPlayer = new Player(role, name);
	 this.localPlayer.login();
     };

     Game.prototype = {
	 init: function(players){
	     var player, playerElem;
	     for(var i = 0, l = players.length; i < l; i++){
		 player = players[i];
		 playerElem = view.createPlayerElem(player.position);
		 if(player.id != this.localPlayer.id){
		     player = new Player(player.role, player.name, player.id, player.position, playerElem);
		     this.players.push(player);
		 } else {
		     this.localPlayer.init(player.position, playerElem);
		 };
	     };
	 },
	 act: function(pos, action){
	     var player = this._getPlayer(pos);
	     if(player){
		 //Test should be false
		 this.enable = true;
		 player.act(action);
	     };
	 },
	 next: function(pos){
	     var player = this._getPlayer(pos);
	     if(!player){
		 this.enable = true;
		 player = game.localPlayer;
	     };
	     view.next(player);
	 },
	 start: function(players){
	     this.init(players);
	     view.start();
	 },
	 end: function(pos){
	     if(this.localPlayer.pos != pos){
		 this.localPlayer.lose();
	     }else{
		 this.localPlayer.win();
	     };
	     view.end();
	 },
	 _getPlayer: function(pos){
	     var players = this.players, player;
	     for(var i = 0, l = players.length; i < l; i++){
		 player = players[i];
		 if(player.pos == pos){
		     break;
		 };
	     };
	     return player;
	 }
     };
}).call(window);