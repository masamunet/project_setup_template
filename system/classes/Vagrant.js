const fs = require('fs');
const exec = require('child_process').exec;
const Util = require('./Util').Util;

class Vagrant{

  constructor(onComplete = ()=>{})
  {
    this.onComplete = onComplete;
  }

  setup(projectName)
  {
    const vagrantProjectDirName = `${projectName}_vagrant`;
    // ディレクトリの存在チェック
    fs.exists(`${projectName}/${vagrantProjectDirName}`, (exists)=>{
      if(exists){
        // 存在していれば終了。
        return false;
      }else{
        // 存在していなければ処理を継続
        const command = `git clone https://github.com/coreos/coreos-vagrant.git ${projectName}/${vagrantProjectDirName}`;
        exec(command, (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            throw err
            return this;
          }
          console.log('Vagrant setup complete!');
          this.generateConfig(projectName);
        });
      }
    });
  }

  generateConfig(projectName)
  {
    this.generateConfigPre(projectName);
  }

  generateConfigPre(projectName)
  {
    Util.getLatestVersionForDockerCompose((version)=>{
      this.generateConfigAfter(projectName, version);
    });
  }

  generateConfigAfter(projectName, version)
  {
    let check = 0;
    const callback = (err) => {
      if(err){
        console.log(err);
        throw err;
        return this;
      }
      if(++check === 2){
        console.log('Vagrant generateConfig complete!');
        this.onComplete();
      }
    };
    const writeConfigFile = (data) => {
      fs.writeFile(`${projectName}/${projectName}_vagrant/config.rb`, data, callback);
    };
    const readConfigFile = ()=>{
      fs.readFile('system/vagrant-template/config-template.rb', 'utf8', (err, data) => {
        if(err){
          console.log(err);
          throw err;
          return false;
        }
        data = data.replace(/\${projectName}/g, projectName);
        configFileData += "\n" + data;
        writeConfigFile(configFileData);
      });
    };
    let configFileData;
    this.readAndReplace(
      'system/vagrant-template/config-template.ign',
      `${projectName}/${projectName}_vagrant/config.ign`,
      [
        [/\${COMPOSE_VERSION}/g, version]
      ],
      callback
    );
    fs.readFile(`${projectName}/${projectName}_vagrant/config.rb.sample`, 'utf8', (err, data) => {
      if(err){
        console.log(err);
        throw err;
        return this;
      }
      data = data.replace("$update_channel='alpha'", "$update_channel='stable'")
      configFileData = data;
      readConfigFile();
    });
  }

  readAndReplace(readFrom, writeTo, replaces, callback)
  {
    fs.readFile(readFrom, 'utf8', (err, data)=>{
      if(err){
        console.log(err);
        throw err;
        return false;
      }
      replaces.forEach((element)=>{
        data = data.replace(element[0], element[1]);
      });
      fs.writeFile(writeTo, data, callback);
    });
  }

}
module.exports = {Vagrant: Vagrant};
