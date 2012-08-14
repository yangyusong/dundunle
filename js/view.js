(function(){
     var view = this.view = {
	 pkWrap: $('#main div.grolewrap'),
	 createPlayerElem: function(pos){
	     var playerElem = '<div class="gplayer" id="player' + pos +'"></div>';
	     this.pkWrap.append(playerElem);
	     playerElem = $('div#player' + pos)[0];
	     return playerElem;
	 },
	 stand: function(player){
	     player.log('stand');
	 },
	 sit: function(player){
	     player.log('sit');
	 },
	 next: function(player){
	     player.log('it is my turn.');
	 },
	 start: function(){
	     log('start');
	 },
	 end: function(){
	     log('end');
	 },
	 win: function(player){
	     player.log('win');
	 },
	 lose: function(player){
	     player.log('lose');
	 },
	 load: function(){
	 }
     };
}).call(window);