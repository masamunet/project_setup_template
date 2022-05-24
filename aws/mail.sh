#!/bin/bash
docker system prune -f ; \
cd ~/web/server/
docker-compose stop ; \
cd ~/mail/mail_server/
docker run --rm -ti \
	-v /home/ec2-user/mail/development/encrypt/log/:/var/log/letsencrypt/ \
	-v /home/ec2-user/mail/development/encrypt/etc/letsencrypt:/etc/letsencrypt/ \
	-p 443:443 -p 80:80 certbot/certbot renew ; \
cd ~/web/server/
docker-compose up -d
