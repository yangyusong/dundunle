

/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @doc
*/


(function() {
  var app, c, consts, debug, express, fs, http, io, logLvl, logLvls, sendApi, sio, socket_on_act, socket_on_login, socket_on_next, util;

  http = require('http');

  sio = require('socket.io');

  express = require('express');

  util = require('util');

  app = module.exports = express.createServer();

  io = sio.listen(app);

  sendApi = require('./sendApi');

  socket_on_login = require('./proto/socket_on_login');

  socket_on_act = require('./proto/socket_on_act');

  socket_on_next = require('./proto/socket_on_next');

  fs = require('fs');

  consts = require('./consts');

  c = consts.c;

  /*
    测试状态 todo正式发布将debug设为false
  */


  debug = false;

  /*
  日志等级
  */


  logLvls = {
    show: 3,
    nolog: 4
  };

  logLvl = logLvls.show;

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    return app.use(express["static"](__dirname + '/public'));
  });

  /*
   监听端口
  */


  app.listen(3000, function() {
    var addr;
    addr = app.address();
    return console.log('app listening on http://127.0.0.1:' + addr.port);
  });

  app.get('/index', function(req, res) {
    return res.render('index', {
      title: ""
    });
  });

  app.get('/test', function(req, res) {
    return res.render('test', {
      title: ""
    });
  });

  app.get('/test_1', function(req, res) {
    return res.render('test_1', {
      title: ""
    });
  });

  app.get('/test_2', function(req, res) {
    return res.render('test_2', {
      title: ""
    });
  });

  /*
  */


  process.on('uncaughtException', function(err) {
    console.error(err);
    return console.log("node not exiting...");
  });

  c.io = io;

  io.sockets.on('connection', function(socket) {
    var testServer;
    util.puts("---- con");
    if (debug) {
      testServer = require('./testServer');
      testServer.test_server(socket);
    }
    /*
        连接协议 login
        role: 角色
        name: 名称
    */

    socket.on('login', function(data) {
      if (logLvl === logLvls.show) {
        util.puts("login" + ',role:' + data.role + ',name:' + data.name + 'sid:' + data.sid);
      }
      try {
        return socket_on_login.socketOn(socket, data);
      } catch (error) {
        console.log('----socket_on_login error' + error);
      }
    });
    /*
        做动作协议 act
        action: 动作
        sid: sid
    */

    socket.on('act', function(data) {
      if (logLvl === logLvls.show) {
        util.puts("act" + ',action:' + data.action + ',sid:' + data.sid + 'sid:' + data.sid);
      }
      try {
        return socket_on_act.socketOn(socket, data);
      } catch (error) {
        console.log('----socket_on_act error' + error);
      }
    });
    /*
        下一位协议 next
        sid: 自己的sid
        pos: 点击的位置
    */

    return socket.on('next', function(data) {
      if (logLvl === logLvls.show) {
        util.puts("next" + ',sid:' + data.sid + ',pos:' + data.pos + 'sid:' + data.sid);
      }
      try {
        return socket_on_next.socketOn(socket, data);
      } catch (error) {
        console.log('----socket_on_next error' + error);
      }
    });
  });

}).call(this);
