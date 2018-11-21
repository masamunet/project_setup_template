const projectName = (process.argv[2])? process.argv[2] : 'myProject';
const isClone = (process.argv[3])? process.argv[3]: false;

const mkDir = [
  {name: `../${projectName}`, children: [
    'development::777',
    'documents',
    { name: `${projectName}_docker`, children: [
      'my-wordpress',
    ]},
    { name: 'libs', children: [
      'wp_themes::777',
    ]},
    { name: 'storages::777', children: [
      'mysql::777',
    ]}
  ]},
];


const Util = require('./system/classes/Util').Util;
const InstallPlugins = require('./system/classes/InstallPlugins').InstallPlugins;
const Directory = require('./system/classes/Directory').Directory;
const Vagrant = require('./system/classes/Vagrant').Vagrant;
const Docker = require('./system/classes/Docker').Docker;
const VagrantFile = require('./system/classes/VagrantFile').VagrantFile;


const directory = ()=>{
  const cls = new Directory(docker);
  cls.createDirectories(mkDir);
};

const docker = ()=>{
  const cls = new Docker(vagrant);
  cls.setup(projectName);
};

const vagrant = ()=>{
  const cls = new Vagrant(vagrantFile);
  cls.setup(projectName);
};

const vagrantFile = ()=>{
  const cls = new VagrantFile();
  cls.setup(projectName);
};

const plugin = ()=>{
  const cls = new InstallPlugins();
};

const start = ()=>{
  if(isClone !== 'clone'){
    // 初回セットアップ時はディレクトリ作成から
    directory();
  }else{
    // gitからクローンされたプロジェクトならVagrant作成から
    vagrant();
  }
};
start();
