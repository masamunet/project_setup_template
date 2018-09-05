const fs = require('fs');

class Directory{

  constructor(onComplete = ()=>{})
  {
    this.onComplete = onComplete;
  }

  createDirectories(dir)
  {
    this.mode = {};
    this.arr = this.convertDirToPath(dir);
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
      if(this.mode[dirName]){
        this.chmod(dirName, this.mode[dirName]);
      }else{
        this.isComplete(dirName);
      }
    });
  }

  chmod(dirName, mode)
  {
    fs.chmod(dirName, mode, (err)=>{
      if(err){
        throw err;
        return this;
      }
      console.log(`chmod: ${mode} ${dirName}`);
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
    this.onComplete();
  }

  splitPathAndMode(dirName, current)
  {
    let path = dirName.split('::');
    if(path[1]){
      this.mode[`${current}/${path[0]}`] = path[1];
    }
    return path[0];
  }

  convertDirToPath(dir, current = '.', arr = []){
    dir.forEach((element)=>{
      if(typeof element === 'string'){
        // 文字列ならDirectoryを作成
        arr.push(`${current}/${this.splitPathAndMode(element, current)}`);
      }else{
        // それ以外ならフォーマットに沿って再帰
        let c = `${current}/${this.splitPathAndMode(element.name, current)}`;
        let children = element.children;
        arr.push(c);
        return this.convertDirToPath(children, c, arr);
      }
    });
    return arr;
  }


}

module.exports = {Directory: Directory};
