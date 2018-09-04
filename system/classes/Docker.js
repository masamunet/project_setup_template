const fs = require('fs');
const Util = require('./Util').Util;

class Docker{

  constructor(onComplete = ()=>{})
  {
    this.onComplate = onComplete;
  }

  setup(projectName)
  {
    this.ret = 0;
    const callback = (err)=>{
      if(err){
        console.log(err);
        throw err;
        return false;
      }
      if(++this.ret === 3){
        console.log('Docker complete!');
        this.onComplate();
      }
    };
    fs.copyFile(
      'system/docker-template/docker-compose-template.yml',
      `${projectName}/server/docker-compose.yml`,
      callback
    );
    fs.copyFile(
      'system/docker-template/Dockerfile-template',
      `${projectName}/server/my-wordpress/Dockerfile`,
      callback
    );
    fs.readFile('system/docker-template/.env.template', 'utf8', (err, data) =>{
      if(err){
        console.log(err);
        throw err;
        return this;
      }
      const password = Util.createRandomString(32);
      data = data.replace(/\${projectName}/g, projectName);
      data = data.replace(/\${password}/g, password);
      fs.writeFile(`${projectName}/server/.env`, data, callback);
    });
  }

}

module.exports = {Docker: Docker};
