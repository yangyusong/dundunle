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
	     }else{
		 return;
	     };
	 },
	 transition: function(event){
	     var state = this.state;
	     var input = pub.machine.end, type = event.type;
	     var preEvent = this.event;

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
	     };

	     this.event = event;
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
	 }
     };

     var eventBinder = this.eventBinder = {
	 play: function(player){
	     var transition = function(event){
		 if(typeof stateMachine == 'undefined' || stateMachine.player != game.localPlayer){
		     stateMachine = new StateMachine(player);
		 };
		 stateMachine.transition(event);
	     };
	     $(player.elem).bind('mousedown mouseover mousemove mouseout mouseup', transition);
	 },
	 next: function(player){
	     $(player.elem).bind('click', function(event){
				     player.next();
				 });
	 }
     };
}).call(window);