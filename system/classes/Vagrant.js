const fs = require('fs');
const exec = require('child_process').exec;

class Vagrant{

  constructor(onComplete = ()=>{})
  {
    this.onComplate = onComplete;
  }

  setup(projectName)
  {
    const command = `git clone https://github.com/coreos/coreos-vagrant.git ${projectName}/vagrant_${projectName}`;
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

  generateConfig(projectName)
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
        this.onComplate();
      }
    };
    const writeConfigFile = (data) => {
      fs.writeFile(`${projectName}/vagrant_${projectName}/config.rb`, data, callback);
    };
    const readConfigFile = ()=>{
      fs.readFile('system/vagrant-template/config-template.rb', 'utf8', (err, data) => {
        if(err){
          console.log(err);
          throw err;
          return false;
        }
        configFileData += "\n" + data;
        writeConfigFile(configFileData);
      });
    };
    let configFileData;
    fs.copyFile(
      'system/vagrant-template/config-template.ign',
      `${projectName}/vagrant_${projectName}/config.ign`,
      callback
    );
    fs.readFile(`${projectName}/vagrant_${projectName}/config.rb.sample`, 'utf8', (err, data) => {
      if(err){
        console.log(err);
        throw err;
        return this;
      }
      data = data.replace("$update_channel='alpha'", "$update_channel='stable'")
      data = data.replace(/#\$vm_memory/g, '$vm_memory');
      configFileData = data;
      readConfigFile();
    });
  }

}
module.exports = {Vagrant: Vagrant};
