
/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @date: 2012-07-27
 * @doc
*/


(function() {
  var c;

  c = {};

  /*
  io对象
  */


  c.io = {};

  /*
  sid,用户映射池 (在线玩家)
  */


  c.idNameList = {};

  /*
  用户,sid映射池 (在线玩家)
  */


  c.nameIdList = {};

  /*
  用户,sid映射池 (只用于清除大小写)
  */


  c.nameCaseIdList = {};

  /*
  清理者和内存管理句柄
  */


  c.timerH = {};

  /*
  */


  c.UID = 1;

  /*
  房间列表(一对多模式)
  */


  c.tabList = {};

  /*
  等待状态的房间
  */


  c.waitTabList = {};

  c.waitTabIdList = [];

  /*
  房间状态
  on: 可进入, off：满员（不可进入）
  */


  c.tabState = {
    on: 0,
    off: 1
  };

  /*
  一房间允许人数
  */


  c.tabLen = 2;

  /*
  日志等级
  */


  c.logLvls = {
    show: 3,
    nolog: 4
  };

  c.logLvl = c.logLvls.show;

  /*
  数据库用户id,sid映射池,只用于在线玩家
  {{id: Sid}..}
  */


  c.idSidPoll = {};

  /*
  数据上限
  */


  c.limits = {
    rank: 100,
    rankMost: 10000
  };

  /*
  计时器
  计算最大量排行榜时间
  计算万内排行榜
  统计的时间
  清理时间
  
  一次蹲站时间
  检查是否超时
  */


  c.timers = {
    rank: 30 * 1000,
    rankMost: 60 * 1000 * 10,
    statTime: 60 * 1000,
    clearTime: 1000 * 60,
    standSquatTime: 20 * 1000,
    checkTime: 1 * 1000
  };

  /*
  排行榜
  */


  c.rank100 = [];

  /*
  排行榜最大量查询
  */


  c.rankmost = {};

  exports.c = c;

}).call(this);
