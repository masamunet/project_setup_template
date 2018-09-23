$instance_name_prefix="${projectName}"
$vm_memory = 1024

$shared_folders = {
  '../development' => '/home/core/development',
  '../libs/wp_themes' => '/home/core/libs/wp_themes',
  '../storages' => '/home/core/storages',
  '../${projectName}_docker' => '/home/core/docker',
}

$forwarded_ports = {
  '8000' => '8000',
  '8080' => '8080',
}
