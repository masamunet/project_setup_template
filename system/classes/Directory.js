const fs = require('fs');

class Directory{

  constructor(onComplete = ()=>{})
  {
    this.onComplate = onComplete;
  }

  createDirectories(dir)
  {
    this.arr = Directory.convertDirToPath(dir);
    this.count = 0;
    this.next();
  }

  check(dirName)
  {
    fs.exists(dirName, (exists)=>{
      if(exists){
        throw new Error(`すでに${dirName}は作成済みです。`);
        return this;
      }else{
        this.crtDir(dirName);
      }
    });
  }

  crtDir(dirName)
  {
    fs.mkdir(dirName, (err)=>{
      if(err){
        throw err;
        return this;
      }
      this.isComplete(dirName);
    });
  }

  isComplete(dirName)
  {
    if(++this.count === this.arr.length){
      this.complete();
    }else{
      this.next();
    }
  }

  next()
  {
    this.check(this.arr[this.count]);
  }

  complete()
  {
    console.log('Directory complete!');
    this.onComplate();
  }

  static convertDirToPath(dir, current = '.', arr = []){
    dir.forEach((element)=>{
      if(typeof element === 'string'){
        // 文字列ならDirectoryを作成
        arr.push(`${current}/${element}`);
      }else{
        // それ以外ならフォーマットに沿って再帰
        let c = `${current}/${element.name}`;
        let children = element.children;
        arr.push(c);
        return Directory.convertDirToPath(children, c, arr);
      }
    });
    return arr;
  }


}

module.exports = {Directory: Directory};
