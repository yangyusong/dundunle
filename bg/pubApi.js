
/*
 * @author: YuSongYang
 * @email: yys159258@126.com
 * @date: 2012-07-22
 * @doc
*/


/*
时间戳获取
*/


(function() {
  var getTime;

  getTime = function() {
    var d, t;
    d = new Date();
    t = d.getTime();
    if (t.length === 13) {
      t = Math.round(d.getTime() / 1000);
    }
    return t;
  };

  exports.getTime = getTime;

}).call(this);
