(function(){
     var view = this.view = {
         startBg: $('.startbg')[0],
         nameBg: $('.namebg')[0],
         nRoleImg: $('.namebg .ncenter .nrole img')[0],
         nInput: $('.namebg .ninput')[0],
         nOkBtn: $('.namebg .nokbtn')[0],
         prepareBg: $('.preparebg')[0],
         pName: $('.preparebg .pcenter .pname')[0],
         prepareRoleImg: $('.preparebg .pcenter .prole img')[0],
         gameBg: $('.gamebg')[0],
	 pkWrap: $('#main div.grolewrap'),
         loseBg: $('.failedbg')[0],
         winBg: $('.successbg')[0],
         numberOfRole: 3,
         currentRole: 0,
	 createPlayerElem: function(pos, name, role){
	     var playerElem = '<div class="gplayer" id="player' + pos +'">'
		 + '<div class="gname">'
		 + '<span>'
		 + name
		 + '</span>'
		 + '</div>'
		 + '<div class="gname" id="gbox">'
		 + '一二三四五蹲四五蹲完'
		 + '</div>'
		 + '</div>';
	     this.pkWrap.append(playerElem);
	     playerElem = $('div#player' + pos)[0];
	     $(playerElem).css('background-image', 'url("' + pub.pic.rolesAnimation[role] + '")');
	     return playerElem;
	 },
         nextRole : function(){
             var that = this;
             this.currentRole = (this.currentRole + 1) % this.numberOfRole;
             $(this.nRoleImg).fadeOut(150, function(){
					  that.nRoleImg.src = pub.pic.roles[that.currentRole];
					  $(that.nRoleImg).fadeIn(150);
					  var role = that.nRoleImg.src;
					  var reg = /\/(\w+).png/;
					  role = reg.exec(role)[1];
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
				     });
         },
         chooseRole : function(){
             var that = this;
             $(this.startBg).fadeOut(300, function(){$(that.nameBg).fadeIn(300);});
         },
         prepareGame : function(){
             var that = this;
             this.prepareRoleImg.src = this.nRoleImg.src;
             this.pName.innerText = this.nInput.value;
	     var role = this.currentRole;
	     var name = this.nInput.value;
             $(this.nOkBtn).fadeOut(300);
             $(this.nInput).fadeOut(300, function(){
					$(that.nameBg).hide();
					$(that.prepareBg).show();
					that.load();
					window.game = new Game(role, name);
				    });
         },
         startGame : function(){
             var that  = this;
             $(this.prepareBg).hide();
             $(that.gameBg).show();
         },
         resetGame : function(){
             location.reload();
         },
         lose : function(player){
             var that  = this;
	     player.log('lose');
             $(this.gameBg).fadeOut(300, function(){
					$(that.loseBg).fadeIn(300);
				    });
         },
         win : function(player){
             var that  = this;
	     player.log('win');
             $(this.gameBg).fadeOut(300, function(){
					$(that.winBg).fadeIn(300);
				    });
         },
	 stand: function(player){
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
	     setTimeout(transform, 30);
	 },
	 next: function(player){
	     player.log('it is my turn.');
	 },
	 end: function(){
	     log('end');
	 },
	 load: function(){
	 }
     };
 }).call(window);