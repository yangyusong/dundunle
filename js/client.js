

/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @date 2012-07-28
 * @doc
 */


(function() {
     var debug, sender, sid, socket, test_act, test_login, test_next;

     socket = io.connect('http://localhost:3000');

     /*
      todo 正式环境中 debug = false
      */


     debug = true;

     sender = {};

     sid = "";

     /*
      连接协议
      errorno: 错误码
      sid: sid
      */


     socket.on('login', function(data) {
		   if (debug) {
		       console.log("login" + ',errorno:' + data.errorno + ',sid:' + data.sid);
		   }
		   if ('login' === 'login') {
		       sid = data.sid;
		   }
		   /*
		    todo 处理协议函数
		    */
		   game.localPlayer.setId(data.sid);
	       });

     /*
      开始游戏协议
      players: 玩家列表
      people: 人数
      */


     socket.on('start', function(data) {
		   if (debug) {
		       console.log('Start Game');
		       console.log('players:', data.players);
		       console.log('people:', data.people);
		   }
		   if ('start' === 'login') {
		       sid = data.sid;
		   }
		   /*
		    todo 处理协议函数
		    */
		   game.start(data.players);
		   game.next(0);
	       });

     /*
      做动作协议
      pos: 动作者位置
      action: 动作
      */


     socket.on('act', function(data) {
		   if (debug) {
		       console.log("act" + ',pos:' + data.pos + ',action:' + data.action + ',times:' + data.times);
		   }
		   if ('act' === 'login') {
		       sid = data.sid;
		   }
		   /*
		    todo 处理协议函数
		    */
		   game.act(data.pos, data.action, data.times);
	       });

     /*
      下一位协议
      pos: 点击的位置
      */


     socket.on('next', function(data) {
		   if (debug) {
		       console.log("next" + ',pos:' + data.pos);
		   }
		   if ('next' === 'login') {
		       sid = data.sid;
		   }
		   /*
		    todo 处理协议函数
		    */
		   game.next(data.pos);
	       });

     /*
      游戏结果协议
      pos: 赢家位置
      */


     socket.on('result', function(data) {
		   if (debug) {
		       console.log("result" + ',pos:' + data.pos);
		   }
		   if ('result' === 'login') {
		       sid = data.sid;
		   }
		   /*
		    todo 处理协议函数
		    */
		   game.end(data.pos);
	       });

     /*
      连接协议
      role: 角色
      name: 名称
      */


     sender.sendlogin = function(data) {
	 if ('login' !== 'login') {
	     data.sid = sid;
	 }
	 if (debug) {
	     console.log("--- login" + ',role:' + data.role + ',name:' + data.name);
	 }
	 return socket.emit('login', data);
     };

     /*
      做动作协议
      action: 动作
      sid: sid
      */


     sender.sendact = function(data) {
	 if ('act' !== 'login') {
	     data.sid = sid;
	 }
	 if (debug) {
	     console.log("--- act" + ',action:' + data.action + ',sid:' + data.sid);
	 }
	 return socket.emit('act', data);
     };

     /*
      下一位协议
      sid: 自己的sid
      pos: 点击的位置
      */


     sender.sendnext = function(data) {
	 if ('next' !== 'login') {
	     data.sid = sid;
	 }
	 if (debug) {
	     console.log("--- next" + ',sid:' + data.sid + ',pos:' + data.pos);
	 }
	 return socket.emit('next', data);
     };

     window.sender = sender;

     /*
      测试函数start-------------
      */


     /*
      连接协议测试
      */


     test_login = function() {
	 var data;
	 data = {
	     role: 'a',
	     name: 'ss'
	 };
	 return sender.sendlogin(data);
     };

     window.test_login = test_login;

     /*
      做动作协议测试
      */


     test_act = function() {
	 var data;
	 data = {
	     action: 'xx',
	     sid: 2
	 };
	 return sender.sendact(data);
     };

     window.test_act = test_act;

     /*
      下一位协议测试
      */


     test_next = function() {
	 var data;
	 data = {
	     sid: 0,
	     pos: 1
	 };
	 return sender.sendnext(data);
     };

     window.test_next = test_next;

     /*
      测试函数end---------------
      */


 }).call(this);
