window.EventController = {
    preX : 0,
    preY : 0,
    /* 1 denote 'stand' while 0 denote 'crouch'. */
    preAction : 1,
    isMouseDown : false,
    init : function() {
        var localPlayer = Game.localPlayer;

        localPlayer.elem.addEventListener('mousedown', function(event) {
            this.isMouseDown = true;
            var localPlayer = Game.localPlayer;
            this.preX = event.pageX - 4;
            this.preY = event.pageY - 4;
            Game.playing(0, localPlayer.id);
            log('localPlayer start move.');
        });

        localPlayer.elem.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if(!this.isMouseDown) return;

            var localPlayer = Game.localPlayer;
            var x = event.pageX - 4;
            var y = event.pageY - 4;

            if (EventController.preX == 0 && EventController.preY == 0){
                EventController.preX = x;
                EventController.preY = y;
                return;
            }
            if ((((y - EventController.preY) > 0) && (EventController.preAction == 1)) || (((y - EventController.preY) < 0) && (EventController.preAction == 0))) {
                EventController.preAction = (EventController.preAction + 1) % 2;

                log(EventController.preAction == 1 ? 'stand' : 'crouch');
                localPlayer.play(EventController.preAction == 1 ? 'standUp' : 'sitDown');

                if (localPlayer.count == 5){
                    Game.playing(2, localPlayer.id);
                    log('the numver of localPlayer is out of limit.');
                } else {
                    Game.playing(EventController.preAction, localPlayer.id);
                    log('localPlayer has been moved ' + localPlayer.count + ' counts.');
                }
            }

            EventController.preX = x;
            EventController.preY = y;
        });

        var endMove = function(event) {
            if(!this.isMouseDown) return;
            this.isMouseDown = false;
            var localPlayer = Game.localPlayer;
            localPlayer.play("standUp");
            if (localPlayer.time != 5){
                Game.playing(2, localPlayer.id);
                log('the numver of localPlayer is not equal 5.');
            }
        }
        localPlayer.elem.addEventListener('mouseup', endMove);
        localPlayer.elem.addEventListener('mouseover', endMove);
        localPlayer.elem.addEventListener('mouseout', endMove);
    },
    bindNewPlayer : function(player){
        player.elem.addEventListener('click', function(event, player) {
            var localPlayer = Game.localPlayer;
            if (localPlayer.count == 5) {
                Game.playing(3, localPlayer.id, player.id);
                localPlayer.count = 0;
            }
        });
    },
    enterGame : function(){
        var nokbtnDom = view.nokbtnDom;
        nokbtnDom.addEventListener('click', function(){
            var role = view.chooseRoleDom.src;
            var reg = /\/(\w+).png/;
            role = reg.exec(role)[1];
            var name = view.ninputDom.value;
            console.log(role + "," + name);
            view.prepareGame();
            setTimeout(function() {Game.prepare(role, name);}, 1000);
        });
    }
}


