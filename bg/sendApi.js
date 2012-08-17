

/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @doc
*/


(function() {
  var debug, sendact, sendlogin, sendnext, sendresult, sendstart;

  debug = true;

  /*
  连接协议
  */


  sendlogin = function(socket, data) {
    if (debug) {
      console.log("--- login" + ',errorno:' + data.errorno + ',sid:' + data.sid);
    }
    return socket.emit('login', data);
  };

  exports.sendlogin = sendlogin;

  /*
  开始游戏协议
  */


  sendstart = function(sockets, data, isDiffData) {
    var k, v, _results, _results1;
    if (isDiffData) {
      if (debug) {
        console.log("--- start" + ',players:' + data[0].players + ',people:' + data[0].people);
      }
      _results = [];
      for (k in sockets) {
        v = sockets[k];
        _results.push(sockets[k].emit('start', data[k]));
      }
      return _results;
    } else {
      if (debug) {
        console.log("--- start" + ',players:' + data.players + ',people:' + data.people);
      }
      _results1 = [];
      for (k in sockets) {
        v = sockets[k];
        _results1.push(sockets[k].emit('start', data));
      }
      return _results1;
    }
  };

  exports.sendstart = sendstart;

  /*
  做动作协议
  */


  sendact = function(sockets, data, isDiffData) {
    var k, v, _results, _results1;
    if (isDiffData) {
      if (debug) {
        console.log("--- act" + ',pos:' + data[0].pos + ',action:' + data[0].action);
      }
      _results = [];
      for (k in sockets) {
        v = sockets[k];
        _results.push(sockets[k].emit('act', data[k]));
      }
      return _results;
    } else {
      if (debug) {
        console.log("--- act" + ',pos:' + data.pos + ',action:' + data.action);
      }
      _results1 = [];
      for (k in sockets) {
        v = sockets[k];
        _results1.push(sockets[k].emit('act', data));
      }
      return _results1;
    }
  };

  exports.sendact = sendact;

  /*
  下一位协议
  */


  sendnext = function(sockets, data, isDiffData) {
    var k, v, _results, _results1;
    if (isDiffData) {
      if (debug) {
        console.log("--- next" + ',pos:' + data[0].pos);
      }
      _results = [];
      for (k in sockets) {
        v = sockets[k];
        _results.push(sockets[k].emit('next', data[k]));
      }
      return _results;
    } else {
      if (debug) {
        console.log("--- next" + ',pos:' + data.pos);
      }
      _results1 = [];
      for (k in sockets) {
        v = sockets[k];
        _results1.push(sockets[k].emit('next', data));
      }
      return _results1;
    }
  };

  exports.sendnext = sendnext;

  /*
  游戏结果协议
  */


  sendresult = function(sockets, data, isDiffData) {
    var k, v, _results, _results1;
    if (isDiffData) {
      if (debug) {
        console.log("--- result" + ',pos:' + data[0].pos);
      }
      _results = [];
      for (k in sockets) {
        v = sockets[k];
        _results.push(sockets[k].emit('result', data[k]));
      }
      return _results;
    } else {
      if (debug) {
        console.log("--- result" + ',pos:' + data.pos);
      }
      _results1 = [];
      for (k in sockets) {
        v = sockets[k];
        _results1.push(sockets[k].emit('result', data));
      }
      return _results1;
    }
  };

  exports.sendresult = sendresult;

}).call(this);
