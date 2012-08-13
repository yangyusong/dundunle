

/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @date: 2012-07-27
 * @doc
*/


(function() {
  var pub;

  pub = {};

  /*
  success:0 成功, falure:1 失败
  */


  pub.errorno = {
    success: 0,
    falure: 1
  };

  /*
  动作分类
  sit：蹲, stand:站
  */


  pub.action = {
    sit: 0,
    stand: 1
  };

  pub.machine = {
    end: -1,
    sit: 0,
    stand: 1,
    start: 2,
    init: 3,
    down: 4,
    over: 5,
    moveUp: 6,
    moveDown: 7,
    up: 8,
    out: 9
  };

  if ((typeof window) !== "undefined") {
    window.pub = pub;
  } else {
    global.pub = pub;
  }

}).call(this);
