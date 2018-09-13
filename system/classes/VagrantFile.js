const fs = require('fs');

class VagrantFile{

  constructor(onComplete = ()=>{})
  {
    this.onComplete = onComplete;
  }

  setup(projectName)
  {
    const keyword = `Vagrant.configure("2") do |config|`;
    const add_str = `
    # set disksize
    config.disksize.size = '25GB'
    # add for dns
    config.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    end
    `;
    const callback = (err) => {
      if(err){
        console.log(err);
        throw err;
        return this;
      }
      console.log('VagrantFile complete!');
      this.onComplete();
    };
    this.readAndReplace(
      `${projectName}/${projectName}_vagrant/VagrantFile`,
      `${projectName}/${projectName}_vagrant/VagrantFile`,
      [
        [keyword, keyword + '\n' + add_str]
      ],
      callback
    );
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
module.exports = {VagrantFile: VagrantFile};
