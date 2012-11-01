
/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @date: 2012-07-22
 * @doc
*/


(function() {
  var c, consts, getEnimySock, getUID, isEnd, kick, pubApi, sendApi, setLastTime;

  consts = require('./consts');

  pubApi = require('./pubApi');

  sendApi = require('./sendApi');

  c = consts.c;

  getUID = function() {
    var uid;
    uid = c.UID;
    c.UID++;
    return uid;
  };

  exports.getUID = getUID;

  setLastTime = function(tabId) {
    return c.tabList[tabId].lastTime = pubApi.getTime();
  };

  exports.setLastTime = setLastTime;

  /*
  */


  getEnimySock = function(enimyid) {
    return c.io.sockets.sockets[enimyid];
  };

  exports.getEnimySock = getEnimySock;

  isEnd = function(socket, tabId, end) {
    var dataout, enimySock, enimyid, host, hostSock, idName, tab, time;
    tab = c.tabList[tabId];
    if (tab.handler) {
      clearTimeout(tab.handler);
    }
    time = pubApi.getTime();
    if ((time - tab.lastTime > c.timers.standSquatTime) && (tab.players.length > 1) || end) {
      host = tab.host;
      idName = c.idNameList[host];
      enimyid = tab.idlist[host];
      idName.p.action = global.pub.action.stand;
      idName.p.current = global.pub.action.stand;
      c.idNameList[enimyid].p.action = global.pub.action.stand;
      c.idNameList[enimyid].p.current = global.pub.action.stand;
      dataout = {
        pos: c.idNameList[enimyid].p.position
      };
      enimySock = getEnimySock(enimyid);
      hostSock = getEnimySock(host);
      sendApi.sendresult([hostSock, enimySock], dataout, false);
      kick(tabId, host);
      tab.state = c.tabState.on;
      c.waitTabList[tabId] = tabId;
      c.waitTabIdList.push(tabId);
      tab.times = 0;
      return true;
    } else {
      console.log(tab.players.length > 1);
      if (tab.players.length > 1) {
        c.tabList[tabId].handler = setTimeout(isEnd, c.timers.checkTime, socket, tabId);
      }
      return false;
    }
  };

  exports.isEnd = isEnd;

  /*
  踢人
  */


  kick = function(tabId, sid) {
    var hostId, idlist, players, state;
    hostId = c.tabList[tabId].idlist[sid];
    idlist = {};
    players = [];
    c.idNameList[hostId].p.position = 0;
    players.push(c.idNameList[hostId].p);
    state = c.tabState.on;
    if (c.tabLen === players.length) {
      state = c.tabState.off;
    }
    c.tabList[tabId] = {
      idlist: idlist,
      players: players,
      people: c.tabLen,
      host: hostId,
      times: 0,
      lastTime: pubApi.getTime(),
      state: state
    };
    c.idNameList[sid].tab = tabId;
    return tabId;
  };

  exports.kick = kick;

}).call(this);
