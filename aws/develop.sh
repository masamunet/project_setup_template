#!/bin/bash

INSTANCE_ID=i-0cc09c8405e173448

# 引数の数をチェック（２個セットされたか？）
if [ $# != 1 ]; then
    echo "args count error!"
    # エラー終了
    exit 1
fi

PARAM1=${1:?}

case "$PARAM1" in
	"connect" | "con" )
    aws ec2 start-instances --instance-ids $INSTANCE_ID
    aws ec2 wait instance-status-ok --instance-ids $INSTANCE_ID
    ssh -i "keydaigakudouniversity.pem" ec2-user@gitlab.daigaku.university
    ;;
	"start" )
    aws ec2 start-instances --instance-ids $INSTANCE_ID
    ;;
	"stop" )
    aws ec2 stop-instances --instance-ids $INSTANCE_ID
    ;;
  "status" )
    aws ec2 describe-instance-status --instance-ids $INSTANCE_ID
    ;;
esac
