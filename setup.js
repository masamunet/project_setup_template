const projectName = (process.argv[2])? process.argv[2] : 'myProject';

const mkDir = [
  {name: projectName, children: [
    'development',
    'documents',
    { name: 'server', children: [
      'my-wordpress',
    ]},
    { name: 'libs', children: [
      'wp_themes',
      'wp_plugins',
    ]},
    { name: 'storages', children: [
      'mysql',
    ]}
  ]},
];


const Util = require('./system/classes/Util').Util;
const Directory = require('./system/classes/Directory').Directory;
const Vagrant = require('./system/classes/Vagrant').Vagrant;
const Docker = require('./system/classes/Docker').Docker;
const File = require('./system/classes/File').File;


const start = ()=>{
  const cls = new Directory(vagrant);
  cls.createDirectories(mkDir);
};

const vagrant = ()=>{
  const cls = new Vagrant(docker);
  cls.setup(projectName);
};

const docker = ()=>{
  const cls = new Docker(file);
  cls.setup(projectName);
};

const file = ()=>{
  const cls = new File();
  cls.setup(projectName);
};

start();
