
/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @doc
*/


/*
连接 login
    role: 角色
    name: 名称

处理流程:
*/


(function() {
  var c, canCreateTab, consts, createTab, hash, localApi, pub, pubApi, sendApi, socketOn, upTab;

  sendApi = require('../sendApi');

  consts = require('../consts');

  localApi = require('../localApi');

  pubApi = require('../pubApi');

  pub = require('../public/js/pub');

  hash = require('hashish');

  c = consts.c;

  socketOn = function(socket, data) {
    var dataout, idName, sid;
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
      console.log('socket_on_login');
    }
    dataout = {};
    c.idNameList[sid] = {
      p: {
        id: sid,
        name: data.name,
        role: data.role,
        position: 0,
        current: global.pub.action.stand,
        action: global.pub.action.stand
      },
      tab: -1,
      lasttime: pubApi.getTime()
    };
    sendApi.sendlogin(socket, {
      errorno: global.pub.errorno.success,
      sid: sid
    });
    canCreateTab(socket, data, sid);
    idName = c.idNameList[sid];
    if (!idName) {
      return;
    }
    return idName.lasttime = pubApi.getTime();
  };

  /*
  创建桌子
  */


  createTab = function(sid) {
    var idlist, players, state, tabId;
    idlist = {};
    players = [];
    players.push(c.idNameList[sid].p);
    state = c.tabState.on;
    if (c.tabLen === players.length) {
      state = c.tabState.off;
    }
    tabId = localApi.getUID();
    c.tabList[tabId] = {
      idlist: idlist,
      players: players,
      people: c.tabLen,
      host: sid,
      times: 0,
      lastTime: pubApi.getTime(),
      state: state
    };
    c.idNameList[sid].tab = tabId;
    return tabId;
  };

  /*
  人员加入
  */


  upTab = function(tabId, sid) {
    var hostPlayer, idlist, state;
    hostPlayer = c.tabList[tabId].players[0];
    idlist = {};
    idlist[sid] = hostPlayer.id;
    idlist[hostPlayer.id] = sid;
    console.dir(idlist);
    c.idNameList[sid].p.position = c.idNameList[hostPlayer.id].p.position + 1 % 2;
    c.tabList[tabId].players.push(c.idNameList[sid].p);
    state = c.tabState.on;
    if (c.tabLen === c.tabList[tabId].players.length) {
      state = c.tabState.off;
    }
    c.tabList[tabId] = {
      idlist: idlist,
      players: c.tabList[tabId].players,
      people: c.tabLen,
      host: c.tabList[tabId].host,
      times: 0,
      lastTime: pubApi.getTime(),
      state: state
    };
    c.idNameList[sid].tab = tabId;
    return tabId;
  };

  /*
  试创建桌子
  */


  canCreateTab = function(socket, data, sid) {
    var dataout, enimySock, enimyid, hostId, tabId;
    if (c.waitTabIdList.length === 0) {
      tabId = createTab(sid);
      c.waitTabList[tabId] = tabId;
      return c.waitTabIdList.push(tabId);
    } else {
      tabId = c.waitTabIdList.shift();
      if (c.tabList[tabId]) {
        if (c.tabList[tabId].state === c.tabState.off) {
          delete c.waitTabList[tabId];
          return canCreateTab(socket, data, sid);
        } else {
          upTab(tabId, sid);
          delete c.waitTabList[tabId];
          hostId = c.tabList[tabId].host;
          localApi.setLastTime(tabId);
          dataout = {
            players: c.tabList[tabId].players,
            people: c.tabLen
          };
          enimyid = c.tabList[tabId].idlist[sid];
          enimySock = localApi.getEnimySock(enimyid);
          sendApi.sendstart([socket, enimySock], dataout, false);
          return c.tabList[tabId].handler = setTimeout(localApi.isEnd, c.timers.checkTime, socket, tabId);
        }
      }
    }
  };

  exports.socketOn = socketOn;

}).call(this);
