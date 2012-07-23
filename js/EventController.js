window.EventController = {
    preX : 0,
    preY : 0,
    /* 1 denote 'stand' while 0 denote 'crouch'. */
    preAction : 1,
    init : function() {
        var localPlayer = Game.localPlayer;

        localPlayer.elem.addEventListener('touchstart', function(event) {
            var localPlayer = Game.localPlayer;
            this.preX = event.changedTouches[0].pageX - 4;
            this.preY = event.changedTouches[0].pageY - 4;
            // Game.playing(0, localPlayer.id);
            log('localPlayer start move.');
        });

        localPlayer.elem.addEventListener('touchmove', function(event) {
            event.preventDefault();
            var localPlayer = Game.localPlayer;
            var x = event.changedTouches[0].pageX - 4;
            var y = event.changedTouches[0].pageY - 4;

            if (EventController.preX == 0 && EventController.preY == 0){
                EventController.preX = x;
                EventController.preY = y;
                return;
            }
            if ((((y - EventController.preY) > 0) && (EventController.preAction == 1)) || (((y - EventController.preY) < 0) && (EventController.preAction == 0))) {
                EventController.preAction = (EventController.preAction + 1) % 2;

                log(EventController.preAction == 1 ? 'stand' : 'crouch');

                if (localPlayer.count == 5){
                    // Game.playing(2, localPlayer.id);
                    log('the numver of localPlayer is out of limit.');
                } else {
                    // Game.playing(EventController.preAction, localPlayer.id);
                    log('localPlayer has been moved ' + localPlayer.count + ' counts.');
                }
            }

            EventController.preX = x;
            EventController.preY = y;
        });

        localPlayer.elem.addEventListener('touchend', function(event) {
            var localPlayer = Game.localPlayer;
            if (localPlayer.time != 5){
                // Game.playing(2, localPlayer.id);
                log('the numver of localPlayer is not equal 5.');
            }
        });
    },
    bindNewPlayer : function(player){
        player.elem.addEventListener('touchstart', function(event, player) {
            var localPlayer = Game.localPlayer;
            if (localPlayer.count == 5) {
                // Game.playing(3, player.id);
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
            Game.prepare(role, name);
            view.prepareGame();
        });
    }
}


// var touchEvents = ["touchstart", "touchend", "touchmove"];
// var mouseEvents = ["mousedown", "mouseup", "mousemove"];
// for(var i = 0;i < 3;i ++){
//     dom.addEventListener(touchEvents)
// }