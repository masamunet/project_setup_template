$shared_folders = {
  '../development' => '/home/core/development',
  '../libs/wp_themes' => '/home/core/libs/wp_themes',
  '../libs/wp_plugins' => '/home/core/libs/wp_plugins',
  '../server' => '/home/core/docker',
}

$forwarded_ports = {
  '8000' => '8000',
}

$provision_command = <<-PROVISION
/usr/bin/mkdir -p /opt/bin/
version=$(curl https://github.com/docker/compose/releases/latest -sLI -o /dev/null -w '%{url_effective}' | sed 's:.*/::')
/usr/bin/curl -L "https://github.com/docker/compose/releases/download/$version/docker-compose-$(uname -s)-$(uname -m)" -o /opt/bin/docker-compose
/usr/bin/chmod +x /opt/bin/docker-compose
PROVISION

$startup_command = '/opt/bin/docker-compose -f /home/core/docker/docker-compose.yml up -d'
