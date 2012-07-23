resource = {
    pic : {
        gstartbtn : 'img/name/gstartbtn',
        roles : ['img/name/role1.png', 'img/name/role2.png', 'img/name/role3.png']
    }
}

window.onload = function(){
    view = {
        loadAnimationCount:0,
        startbgDom : $('.startbg')[0],
        namebgDom : $('.namebg')[0],
        chooseRoleDom : $('.namebg .ncenter .nrole img')[0],
        ninputDom : $('.namebg .ninput')[0],
        nokbtnDom : $('.namebg .nokbtn')[0],
        preparebgDom : $('.preparebg')[0],
        pnameDom : $('.preparebg .pcenter .pname')[0],
        prepareRoleDom : $('.preparebg .pcenter .prole img')[0],
        gamebgDom : $('.gamebg')[0],
        roundTimerDom : $('.gamebg .gtime')[0],
        failedbgDom : $('.failedbg')[0],
        successbgDom : $('.successbg')[0],
        numberOfRole : 3,
        currentRole : 0,
        roundTimer : 4,
        roundTimerIntervalId : 0,
        nextRole : function(){
            var that = this;
            this.currentRole = (this.currentRole + 1) % this.numberOfRole;
            $(this.chooseRoleDom).fadeOut(150, function(){
                that.chooseRoleDom.src = resource.pic.roles[that.currentRole];
                $(that.chooseRoleDom).fadeIn(150);
                var role = that.chooseRoleDom.src;
                var reg = /\/(\w+).png/;
                role = reg.exec(role)[1];

                audio.play(role, "name");
            });
        },
        preRole : function(){
            var that = this;
            if (this.currentRole == 0){
                this.currentRole = this.numberOfRole;
            }
            this.currentRole = (this.currentRole - 1) % this.numberOfRole;
            $(this.chooseRoleDom).fadeOut(150, function(){
                that.chooseRoleDom.src = resource.pic.roles[that.currentRole];
                $(that.chooseRoleDom).fadeIn(150);
                var role = that.chooseRoleDom.src;
                var reg = /\/(\w+).png/;
                role = reg.exec(role)[1];

                audio.play(role, "name");
            });
        },
        chooseRole : function(){
            var that = this;
            $(this.startbgDom).fadeOut(300, function(){$(that.namebgDom).fadeIn(300);});
        },
        init : function(){
            EventController.enterGame();
        },
        prepareGame : function(){
            var that = this;
            this.prepareRoleDom.src = this.chooseRoleDom.src;
            this.pnameDom.innerText = this.ninputDom.value;
            $(this.nokbtnDom).fadeOut(300);
            $(this.ninputDom).fadeOut(300, function(){
                $(that.namebgDom).hide();
                $(that.preparebgDom).show();
                that.loadAnimation();
                //Test
                //setTimeout(function(){Game.startGame()}, 1000);
            });
        },
        startGame : function(){
            var that  = this;
            $(this.preparebgDom).hide();
            $(that.gamebgDom).show();
            t.removeAllFunc();
            t.addFunc(function(){
                var x = + document.querySelector("#main").style.backgroundPosition.split("px")[0];
                if(!x) {x = 0}
                x --;
                if(x <= -1825){
                    x = 0;
                }
                document.querySelector("#main").style.backgroundPosition = x + "px";
            })
        },
        newRound : function(){
            clearInterval(this.roundTimerIntervalId);

            var that = this;
            this.roundTimer = 4;

            this.roundTimerIntervalId = setInterval(function(){
                if (that.roundTimer > 0){
                    that.roundTimer --;
                    /*var x = + that.roundTimerDom.style.backgroundPosition.split("px")[0];
                    if(!x) {x = 0}*/
                    that.roundTimerDom.style.backgroundPosition = ((that.roundTimer + 1) * 80 - 400) + 'px';
                    console.log('roundTimer' + that.roundTimer);
                } else{
                    clearInterval(that.roundTimerIntervalId);
                    var localPlayer = Game.localPlayer;
                    console.log(Game.localPlayer);
                    if (localPlayer.state == 3){
                        // Game.playing(2, localPlayer.id);
                        console.log('send failed msg to server.');
                    }
                }
            }, 1000);
        },
        loadAnimation:function(){
            var that = this;
            t.addFunc(
                function(){
                    var elems = document.querySelectorAll("#pload > div");
                    if(t.frame%25==1)that.loadAnimationCount ++;
                    var arr = [[], [0], [0, 1], [0, 1, 2]];
                    var c = arr[that.loadAnimationCount%4];
                    for(var i = 0;i < 3;i ++){
                         elems[i].style.display = i < c.length?"block":"none";
                    }
            });
        },
        resetGame : function(){
            location.reload();
        },
        lost : function(id){
            var that  = this;
            console.log(id + "is lost.");
            $(this.gamebgDom).fadeOut(300, function(){
                $(that.failedbgDom).fadeIn(300);
                that.reload();
            });
        },
        success : function(id){
            var that  = this;
            console.log(id + "is success.");
            $(this.gamebgDom).fadeOut(300, function(){
                $(that.successbgDom).fadeIn(300);
                that.reload();
            });
        }
    }

    Game.initialize();
    view.init();
    audio = new Sound();
    audio.init();
    t = new Timer();
    t.start(60);

//playerList = [];
/*    div = document.querySelector("#main");
        role1 = new Player({
            name:"haha",
            role:"role1",
            position:0
        });
        role2 = new Player({
            name:"haha",
            role:"role2",
            position:1
        });
        role3 = new Player({
            name:"haha",
            role:"role3",
            position:2
        });
        playerList.push(role1);
        playerList.push(role2);
        playerList.push(role3);
        EventController.init();*/
}