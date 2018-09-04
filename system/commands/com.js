const argv = (process.argv[2])? process.argv[2] : 'help';

let args;

switch (argv) {
  case 'up':
    args = ['up'];
    break;
  case 'down':
    args = ['halt'];
    break;
  default:
    // help
}



const path = require('path');
const resolve = path.resolve();
const basename = path.basename(resolve);
const cwd = `${resolve}${path.sep}vagrant_${basename}`;

const { spawn } = require('child_process');
const vagrant = spawn('vagrant', args, {cwd: cwd});

vagrant.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

vagrant.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

vagrant.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
