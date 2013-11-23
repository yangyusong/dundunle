
/*
做动作 act
    action: 动作
    sid: sid

处理流程:
*/


(function() {
  var c, consts, localApi, pub, pubapi, sendApi, socketOn;

  sendApi = require('../sendApi');

  pubapi = require('../pubApi');

  localApi = require('../localApi');

  consts = require('../consts');

  pub = require('../public/js/pub');

  c = consts.c;

  socketOn = function(socket, data) {
    var dataout, enimySock, enimyid, idName, sid, tab;
    try {
      if (data.sid) {
        sid = data.sid;
      } else {
        sid = socket.id;
      }
    } catch (error) {
      return;
    }
    if (c.logLvl === c.logLvls.show) {
      console.log('socket_on_act');
    }
    dataout = {};
    idName = c.idNameList[sid];
    if (!idName) {
      return;
    }
    c.idNameList[sid].lasttime = pubapi.getTime();
    if (idName.current === data.action) {
      return;
    }
    idName.current = data.action;
    tab = c.tabList[idName.tab];
    if (tab.players.length < c.tabLen) {
      console.log("--end");
      return;
    }
    tab.times++;
    tab.lastTime = pubapi.getTime();
    console.log("ok");
    dataout = {
      pos: c.idNameList[tab.host].p.position,
      action: data.action,
      times: tab.times
    };
    enimyid = tab.idlist[sid];
    enimySock = localApi.getEnimySock(enimyid);
    return sendApi.sendact([socket, enimySock], dataout, false);
  };

  exports.socketOn = socketOn;

}).call(this);
