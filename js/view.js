(function(){
     var view = this.view = {
         startBg: $('.startbg')[0],
         nameBg: $('.namebg')[0],
         nRoleImg: $('.namebg .ncenter .nrole img')[0],
         nInput: $('.namebg .ninput')[0],
         nOkBtn: $('.namebg .nokbtn')[0],
         prepareBg: $('.preparebg')[0],
         pName: $('.preparebg .pcenter .pname span')[0],
         prepareRoleImg: $('.preparebg .pcenter .prole img')[0],
         gameBg: $('.gamebg')[0],
	 timer: $('#gtime')[0],
	 pkWrap: $('#main div.grolewrap'),
         loseBg: $('.failedbg')[0],
         winBg: $('.successbg')[0],
         numberOfRole: 3,
         currentRole: 0,
	 resultEnable: false,
	 createPlayerElem: function(pos, name, role){
	     var playerElem = '<div class="gplayer" id="player' + pos +'">'
		 + '<div class="gname">'
		 + '<span>'
		 + name
		 + '</span>'
		 + '</div>'
		 + '<div class="gname" id="gbox">'
		 + ''
		 + '</div>'
		 + '</div>';
	     this.pkWrap.append(playerElem);
	     playerElem = $('div#player' + pos)[0];
	     $(playerElem).css('background-image', 'url("' + pub.pic.rolesAnimation[role] + '")');
	     return playerElem;
	 },
	 clearPkWrap: function(){
	     this.pkWrap.html('');  
	 },
         nextRole : function(){
             var that = this;
	     this.sound || (this.sound = new Sound());
             this.currentRole = (this.currentRole + 1) % this.numberOfRole;
             $(this.nRoleImg).fadeOut(150, function(){
					  that.nRoleImg.src = pub.pic.roles[that.currentRole];
					  $(that.nRoleImg).fadeIn(150);
					  var role = that.nRoleImg.src;
					  var reg = /\/(\w+).png/;
					  role = reg.exec(role)[1];
					  
					  that.sound.play(role, 'name');
				     });
         },
         preRole : function(){
             var that = this;
             if (this.currentRole == 0){
                 this.currentRole = this.numberOfRole;
             }
             this.currentRole = (this.currentRole - 1) % this.numberOfRole;
             $(this.nRoleImg).fadeOut(150, function(){
					 that.nRoleImg.src = pub.pic.roles[that.currentRole];
					 $(that.nRoleImg).fadeIn(150);
					 var role = that.nRoleImg.src;
					 var reg = /\/(\w+).png/;
					 role = reg.exec(role)[1];

					 that.sound.play(role, 'name');
				     });
         },
         chooseRole : function(){
             var that = this;
	     this.sound || (this.sound = new Sound());
	     this.sound.play('system', 'start');
             $(this.startBg).fadeOut(300, function(){$(that.nameBg).fadeIn(300);});
         },
         prepareGame : function(){
             var that = this;
             this.prepareRoleImg.src = this.nRoleImg.src;
             this.pName.innerText = 'My name is ' + this.nInput.value;
	     var role = this.currentRole;
	     var name = this.nInput.value;
             $(this.nameBg).fadeOut(300, function(){
					$(that.prepareBg).show();
					window.game = new Game(role, name);
				    });
         },
         startGame : function(){
	     this.resultEnable = true;
	     this.sound || (this.sound = new Sound());
             var that  = this;
             $(this.prepareBg).hide();
             $(that.gameBg).show();
	     this.bgMoving();
         },
         resetGame : function(){
	     var that = this;
             $(this.loseBg).fadeOut(300, function(){
					$(that.nameBg).fadeIn(300);
				    });	     
         },
         lose : function(player){
             var that  = this;
	     player.log('lose');
	     if(this.resultEnable){
		 this.sound || (this.sound = new Sound());
		 this.sound.play('system', 'lose');
		 $(this.gameBg).fadeOut(300, function(){
					    $(that.loseBg).fadeIn(300);
					});
	     };
	     this.resultEnable = false;
         },
         win : function(player){
             var that  = this;
	     player.log('win');
	     if(this.resultEnable){
		 this.sound || (this.sound = new Sound());
		 this.sound.play('system', 'win');
		 $(this.gameBg).fadeOut(300, function(){
					    $(that.winBg).fadeIn(300);
					});		 
	     };
	     this.resultEnable = false;
         },
	 waitGame: function(){
	     var that = this;
             $(this.winBg).fadeOut(300, function(){
					$(that.prepareBg).fadeIn(300);
				    });	     
	 },
	 stand: function(player){
	     console.log('stand');
	     player.log('stand');
	     var elem = $(player.elem);
	     var position = elem.css('background-position-x').slice(0, -1) - 0;
	     var count = 0;
	     position = 20;
	     function transform(){
		 if(count < 2){
		     position = (position + 10) % 40;
		     elem.css('background-position-x', position + '%');
		     count++;
		     setTimeout(transform, 30);
		 };
	     };
	     setTimeout(transform, 30);
	 },
	 sit: function(player){
	     player.log('sit');
	     var elem = $(player.elem);
	     var position = elem.css('background-position-x').slice(0, -1) - 0;
	     var count = 0;
	     position = 0;
	     function transform(){
		 if(count < 2){
		     position  = (position + 10) % 40;
		     elem.css('background-position-x', position + '%');
		     count++;
		     setTimeout(transform, 30);
		 };
	     };
	     var gbox = $(player.elem.querySelector('#gbox'));
	     gbox.html(player.count + '蹲');
	     player.count++;
	     gbox.show();
	     setTimeout(function(){gbox.fadeOut(300);}, 1000);	     
	     setTimeout(transform, 30);
	 },
	 next: function(player){
	     player.count = 0;
	     player.log('it is my turn.');
	     this.sound || (this.sound = new Sound());
	     this.sound.play(player.role, 'sitDown');
	     var gbox = $(player.elem.querySelector('#gbox'));
	     gbox.html('轮到' + player.name + '蹲');
	     gbox.show();
	     setTimeout(function(){gbox.fadeOut(300);}, 1000);	     
	     this.timing();
	 },
	 bgMoving: function(){
	     var that = this;
	     var bg = $(this.gameBg);
	     var position = 0;
	     clearTimeout(this.bgTimeoutId);
	     bg.css('background-position-x', position + '%');
	     function transform(){
		 position  = (position + 1) % 211;
		 bg.css('background-position-x', position + '%');
		 that.bgTimeoutId = setTimeout(transform, 100);
	     };
	     this.bgTimeoutId = setTimeout(transform, 100);
	 },
	 timing: function(){
	     var that = this;
	     var timer = $(this.timer);
	     var position = 0;
	     clearTimeout(this.timerId);
	     timer.css('background-position-x', position + '%');
	     var count = 0;
	     function transform(){
		 if(count < 5){
		     count++;
		     position  = (position + 25) % 125;
		     timer.css('background-position-x', position + '%');
		     that.timerId = setTimeout(transform, 1000);
		 };
	     };
	     this.timerId = setTimeout(transform, 1000);
	 },
	 end: function(){
	     log('end');
	 },
	 load: function(){
	 }
     };
 }).call(window);