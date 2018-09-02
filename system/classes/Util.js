class Util{

  /**
   * パスワード生成などに使用する、ランダムな文字列を返します。
   * @param  {Number} [length=8] 生成する文字列の長さ
   * @return {[type]}            ランダムな文字列
   */
  static createRandomString(length = 8)
  {
    const c = "abcdefghijklmnopqrstuvwxyz0123456789";
    const cl = c.length;
    let r = "";
    let tmp = -1;
    for(var i=0; i<length; i++){
      let p = Math.floor(Math.random()*cl);
      if(0 < tmp && tmp == p){
        p = Math.floor(Math.random()*cl);
      }
      r += c[p];
      tmp = p;
    }
    return r;
  }
}
module.exports = {Util: Util};
