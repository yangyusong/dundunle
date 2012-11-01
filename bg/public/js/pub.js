

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
  squat：蹲, stand:站
  */


  pub.action = {
    squat: 0,
    stand: 1
  };

  if ((typeof window) !== "undefined") {
    window.pub = pub;
  } else {
    global.pub = pub;
  }

}).call(this);
