/*
 * @author: Haosong Huang
 * @email: haosdent@gmail.com
 * @date: 2012-08-13
 */
(function(){
     var StateMachine = this.StateMachine = function(player){
	 this.player = player;
     };

     StateMachine.prototype = {
	 state: pub.machine.end,
	 event: {},
	 start: function(input){
	     if(input == pub.machine.init){
		 this.state = pub.machine.start;
	     }else if(input == pub.machine.moveDown){
		 this.sit(pub.machine.init);
	     }else{
		 this.end(pub.machine.init);
	     };
	 },
	 stand: function(input){
	     if(input == pub.machine.init){
		 this.state = pub.machine.stand;
		 this.player.play(pub.action.stand);
	     }else if(input == pub.machine.moveUp){
		 return;
	     }else if(input == pub.machine.moveDown){
		 this.sit(pub.machine.init);
	     }else{
		 this.end(pub.machine.init);
	     };
	 },
	 sit: function(input){
	     if(input == pub.machine.init){
		 this.state = pub.machine.sit;
		 this.player.play(pub.action.sit);
	     }else if(input == pub.machine.moveUp){
		 this.stand(pub.machine.init);
	     }else if(input == pub.machine.moveDown){
		 return;
	     }else{
		 this.end(pub.machine.init);
	     };
	 },
	 end: function(input){
	     if(input == pub.machine.init){
		 if(this.state == pub.machine.sit){
		     this.player.play(pub.action.stand);
		 };
		 this.state = pub.machine.end;
	     }else if(input == pub.machine.down){
		 this.start(pub.machine.init);
	     }else if(input == pub.machine.start){
		 this.start(pub.machine.init);
	     }else{
		 return;
	     };
	 },
	 transition: function(event){
	     var state = this.state;
	     var input = pub.machine.end, type = event.type;
	     if(!this.preY){
		 this.preY = event.originalEvent.touches[0].clientY;
	     };

	     if(type == 'mousedown'){
		input = pub.machine.down;
	     }else if(type == 'mouseover'){
		 input = pub.machine.over;
	     }else if(type == 'mousemove'){
		 if(event.clientY - preEvent.clientY > 0){
		     input = pub.machine.moveDown;
		 }else{
		     input = pub.machine.moveUp;
		 };
	     }else if(type == 'mouseout'){
		 input = pub.machine.out;
	     }else if(type == 'mouseup'){
		 input = pub.machine.up;
	     }else if(type == 'touchstart'){
		 input = pub.machine.start;
	     }else if(type == 'touchend'){
		 input = pub.machine.end;
	     }else if(type == 'touchmove'){
		 if(event.originalEvent.touches[0].clientY - this.preY > 0){
		     input = pub.machine.moveDown;
		 }else{
		     input = pub.machine.moveUp;
		 };		     
	     };

	     if(state == pub.machine.start){
		 state = 'start';
	     }else if(state == pub.machine.end){
		 state = 'end';
	     }else if(state == pub.machine.stand){
		 state = 'stand';
	     }else if(state == pub.machine.sit){
		 state = 'sit';
	     };
	     this[state](input);
	     if(event){
		 this.preY = event.originalEvent.touches[0].clientY;		 
	     };
	 }
     };

     var eventBinder = this.eventBinder = {
	 play: function(player){
	     var transition = function(event){
		 console.log(event.type);
		 if(typeof stateMachine == 'undefined' || stateMachine.player != game.localPlayer){
		     stateMachine = new StateMachine(player);
		 };
		 stateMachine.transition(event);
	     };

	     $(player.elem).bind('touchstart touchmove touchend', transition);
	 },
	 next: function(player){
	     $(player.elem).bind('touchstart', function(event){
				     player.next();
				 });
	 }
     };

     $(document).bind('touchmove', function(e){
			  e.preventDefault();
		      });
}).call(window);