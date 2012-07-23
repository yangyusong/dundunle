var Game = Game || {};

Game.socket = null;

Game.initialize = function() {
    this.startFlag = false;
    this.isprepared = false;
    this.localPlayerId = '';
    this.prePlayer = {};
    this.currentPlayer = {};
    Game.connect('ws://192.168.0.38:8080/mumu/mumu.ws');
};

Game.sendMsg = function(msg) {
	if(typeof msg != "string"){
        if(typeof JSON != "undefined")
            msg=JSON.stringify(msg);
        else
            msg=msg+"";
	}
    Console.log("sending msg:"+msg);
    Game.socket.send(msg);
};

Game.players = {};

Game.updatePlayer = function(player,playerId) {
	var state=player.state;
	if(state==0){
		Game.lost(player);
	}else if(state==1){
		Game.success(player);
	}else{
        console.log(Game.localPlayerId);
        if(Game.isprepared){
            Game.localPlayerId = playerId;
            Game.isprepared = false;
        }

        if(!Game.players[player.id]){
            var newplayer = new Player(player);
            Game.players[player.id]=newplayer;

            if(player.id == Game.localPlayerId){
                Game.localPlayer = Game.players[player.id];
                console.log(Game.localPlayer);
                EventController.init();
            }
        }
        /*当游戏未开始时，若检测到有一state为'游戏进行中，整个游戏开始.*/
        if(Game.startFlag){
            Game.players[player.id].play(player.action);
        }
        if(Game.startFlag == false && player.state == 3){
            Game.startGame();
        }
        if(player.id != Game.currentPlayer.id && player.state == 3){
            Game.prePlayer = Game.currentPlayer;
            Game.currentPlayer = player;
            Game.newRound();
        }
	}
};

Game.prepare = function(role,name){
    var msg={"role":role,"name":name,"type":"connect"};
    Game.isprepared = true;
    Game.sendMsg(msg);
}

Game.startGame = function(){
    Game.initialize();
    view.startGame();
}

Game.resetGame = function() {
    this.startFlag = false;
    view.resetGame();
}

Game.lost = function(player){
    view.lost(player.id);
    Game.resetGame();
}

Game.success = function(player){
    view.success(player.id);
    Game.initialize();
}

Game.newRound = function(){
    view.newRound();
    Game.currentPlayer.showTips();
}

Game.playing = function(action,id){
    var msg={"action":action,"id":id,"type":"playing"};
    Game.sendMsg(msg);
}

Game.onerror = function(error){
    Console.log(error);
}

Game.connect = (function(host) {
    if(typeof Polling00 != "undefined"){
    	Game.socket=new Polling("/dundunle/getMsg")
    }else if (typeof EasyWebSocket00 != "undefined"){
    	Game.socket=new EasyWebSocket(host);
    } else if ('WebSocket' in window) {
        Game.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        Game.socket = new MozWebSocket(host);
    } else {
        Console.log('Error: WebSocket is not supported by this browser.');
        return;
    }
    Game.socket.onopen = function () {
        Console.log('Info: WebSocket connection opened.');
        setInterval(function() {
            Game.sendMsg("ping");
        }, 50000);
    };
//Game.socket.polling(true);
    Game.socket.onclose = function () {
        Console.log('Info: WebSocket closed.');
        Game.players={};
        if(Game.startFlag) Game.resetGame();
    };

    Game.socket.onmessage = function (message) {
        Console.log(message);
        //try{
            var packet;
            if(typeof JSON != "undefined")
                packet=JSON.parse(message.data);
            else
                packet = eval('(' + message.data + ')');
            if(packet.result){
                if(packet.result != "pingOK")
                    Game.onerror(packet.result)
                return;
            }

            var playerId = packet.id;
            var map = packet.map;
            var players = packet.players;
            if(players && players.length){
                for(var i=0;i<players.length;i++){
               		Game.updatePlayer(players[i],playerId);
                }
            }
        // }catch(e){
        //     Console.log("Error:" + e);
        // }
    };
});

var Console = Console || {};

Console.log = (function(message) {
    if(typeof console != "undefined"){
        console.log(message);
    }
});

