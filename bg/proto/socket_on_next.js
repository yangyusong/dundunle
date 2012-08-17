
/*
下一位 next
    sid: 自己的sid
    pos: 点击的位置

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
      console.log('socket_on_next');
    }
    dataout = {};
    idName = c.idNameList[sid];
    if (!idName) {
      return;
    }
    c.idNameList[sid].lasttime = pubapi.getTime();
    tab = c.tabList[idName.tab];
    enimyid = tab.idlist[sid];
    enimySock = localApi.getEnimySock(enimyid);
    tab.lastTime = pubapi.getTime();
    idName.current = global.pub.action.stand;
    idName.action = global.pub.action.stand;
    c.idNameList[enimyid].current = global.pub.action.stand;
    c.idNameList[enimyid].action = global.pub.action.stand;
    if (tab.times < 5) {
      tab.times = 0;
      return sendApi.sendresult([socket, enimySock], {
        pos: c.idNameList[enimyid].p.position
      }, false);
    } else {
      tab.times = 0;
      tab.host = enimyid;
      return sendApi.sendnext([socket, enimySock], {
        pos: data.pos
      }, false);
    }
  };

  exports.socketOn = socketOn;

}).call(this);
