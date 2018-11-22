const fs = require('fs');
const Util = require('./Util').Util;

class Docker{

  constructor(onComplete = ()=>{})
  {
    this.onComplete = onComplete;
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
      if(++this.ret === 5){
        console.log('Docker complete!');
        this.onComplete();
      }
    };
    fs.copyFile(
      'system/docker-template/docker-compose-template.yml',
      `../${projectName}/${projectName}_docker/docker-compose.yml`,
      callback
    );
    fs.copyFile(
      'system/docker-template/wp/Dockerfile-template',
      `../${projectName}/${projectName}_docker/wp/Dockerfile`,
      callback
    );
    fs.copyFile(
      'system/docker-template/wp/uploads-template.ini',
      `../${projectName}/${projectName}_docker/wp/uploads.ini`,
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
      fs.writeFile(`../${projectName}/${projectName}_docker/.env`, data, callback);
      fs.writeFile(`../${projectName}/${projectName}_docker/.env.sample`, data, callback);
    });
  }

}

module.exports = {Docker: Docker};
