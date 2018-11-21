const fs = require('fs');

class File{

  constructor(onComplete = ()=>{})
  {
    this.onComplete = onComplete;
  }

  setup(projectName)
  {
    fs.copyFile('system/commands/com.js', `../${projectName}/com.js`, (err)=>{
      if(err){
        throw err;
        return this;
      }
      console.log('file copy complete!');
      this.onComplete();
    });
  }

}
module.exports = {File: File};
