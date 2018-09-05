const projectName = (process.argv[2])? process.argv[2] : 'myProject';

const mkDir = [
  {name: projectName, children: [
    'development',
    'documents',
    { name: 'server', children: [
      'my-wordpress',
    ]},
    { name: 'libs', children: [
      'wp_themes::777',
      'wp_plugins::777',
    ]},
    { name: 'storages::777', children: [
      'mysql::777',
    ]}
  ]},
];


const Util = require('./system/classes/Util').Util;
const Directory = require('./system/classes/Directory').Directory;
const Vagrant = require('./system/classes/Vagrant').Vagrant;
const Docker = require('./system/classes/Docker').Docker;
const VagrantFile = require('./system/classes/VagrantFile').VagrantFile;


const start = ()=>{
  const cls = new Directory(vagrant);
  cls.createDirectories(mkDir);
};

const vagrant = ()=>{
  const cls = new Vagrant(docker);
  cls.setup(projectName);
};

const docker = ()=>{
  const cls = new Docker(vagrantFile);
  cls.setup(projectName);
};

const vagrantFile = ()=>{
  const cls = new VagrantFile();
  cls.setup(projectName);
};

start();
