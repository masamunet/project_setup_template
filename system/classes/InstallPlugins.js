const { spawn } = require('child_process');

class PluginInstall
{
  constructor(plugin, callback)
  {
    this.onComplete = callback;
    const com = spawn('vagrant', ['plugin', 'install', plugin]);
    com.stdout.on('data', this.onStdout);
    com.stderr.on('data', this.onStderr);
    com.on('close', (code)=>{
      this.onClose(code);
    });
  }

  onStdout(data)
  {
    console.log(`stdout: ${data}`);
  }

  onStderr(data)
  {
    console.log(`stderr: ${data}`);
  }

  onClose(code)
  {
    console.log(`child process exited with code ${code}`);
    this.onComplete();
  }
}

class InstallPlugins
{
  constructor(onComplete = ()=>{})
  {
    this.onComplete = onComplete;
    this.plugins = [
      'vagrant-docker-compose',
      'vagrant-disksize',
      'vagrant-ignition',
    ];
    this.current = 0;
    console.log('start install plugins', this.plugins);
    this.startInstall();
  }

  startInstall()
  {
    new PluginInstall(this.plugins[this.current], ()=>{
      this.callback();
    });
  }

  callback()
  {
    this.current++;
    if(this.plugins.length <= this.current){
      console.log('PluginInstall complete!');
      this.onComplete();
    }else{
      this.startInstall();
    }
  }
}
module.exports = {InstallPlugins: InstallPlugins};
