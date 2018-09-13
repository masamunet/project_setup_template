# P.S.T!

## これは何？

Vagrant + Docker の開発環境をサクッと作れるプロジェクトテンプレートです。  
お使いのマシンにVagrantとNode.jsがインストールされていれば、誰でも簡単にDocker開発環境が整うことを目指して作りました。  
対象としては、ふだんはおっかなびっくりNode.jsやgulpで開発してる、WEB系デザイナーさんやコーダーさんに使ってもらうことがゴールとなります。  
もちろん、普段からVagrantやDockerを使った環境で開発をしている方にも使いやすい環境を目指しました。

## 主な特徴

+ とにかく簡単
  + ふだんコマンドを使った開発環境になじみのないデザイナーさんやコーダーさんとも簡単に仮想化プロジェクトが作れたり共有できるよう、Node.jsを使ったことがあるなら誰でも使えるように、初期設定の難しいところや面倒なところをテンプレート化しました。
+ 高度な仮想化をコマンド一発で
  + どんな環境でも統一された状態で開発ができるよう、ホストマシンではまずVagrantを立ち上げて、その中でDocker環境を構築しています。面倒な設定はすべてテンプレート化されているので、Vagrantを立ち上げたらすぐに開発を進めることができます。
+ お使いの開発環境をそのまま使える
  + 便利で簡単にする一方、あくまでプロジェクトのテンプレートの立場を崩していないので、お使いの開発環境をそのまま使えます。
+ すでに使っているDocker環境からの移行が簡単
  + テンプレートはDockerの環境をVagrantでラッピングしていますが、それぞれの環境は独立しているので、Vagrantが必要ない場合やすでにDockerでプロジェクト導入環境を構築している場合でもほとんどそのままこのテンプレートに移行することができます。
+ あけたその日からすぐに使えるテンプレート設定済み！
  + 起動したらすぐ使える、wordpress + mysql + phpMyAdminのdocker-composeがデフォルトテンプレートとして付属しています。さらに、Dockerで本番環境に移行したときに便利なように、https化と自動更新までしてくれるhttps-portalも設定済みです。つまり、難しいことは何も考えなくてよいのです。

## クイックスタートガイド

むずかしいコマンドはすべてコピペでOKです。

### Gitを使ったインストール

プロジェクトを作りたいディレクトリで、以下のコマンドを実行してください。

```bash
git clone https://github.com/masamunet/project_setup_template.git
```

できたディレクトリに移動します。

```bash:例
cd project_setup_template
```

以上でインストールは完了です。

### プロジェクトの作成

次のようなファイル構成になっているか確認してください。

+ README.md
+ package.json
+ setup.js
+ [system]
  + [classes]
  + [commands]
  + [docker-template]
  + [vagrant-template]


確認したら、次のコマンドを実行してください。

```bash
node setup
```

このようなメッセージが表示されて、[myProject] ディレクトリが作成されていれば成功です！

> chmod: 777 ./myProject/development  
> chmod: 777 ./myProject/libs/wp_themes  
> chmod: 777 ./myProject/storages  
> chmod: 777 ./myProject/storages/mysql  
> Directory complete!
> Vagrant setup complete!
> Vagrant generateConfig complete!
> Docker complete!
> VagrantFile complete!

※このあと必要なVagrantプラグインのインストールが始まる場合があります。

### プロジェクトディレクトリの構成

新しく作成されたプロジェクトは次のような構成になっています。

+ myProject_vagrant
  + Vagrant関係のファイルが収められています。Vagrantに詳しい方は自由ここを編集して独自のVagrant環境にカスタムできますが、通常はここを編集することはありません。
+ storages
  + デフォルトでmysqlのデーターが保存されています。Docker側からストレージ関連のボリュームを扱うことを期待されるディレクトリになります。
+ myProject_docker
  + Docker関係のファイルが収められています。Dockerに詳しい方は自由ここを編集して独自のVagrant環境にカスタムできます。デフォルトでwordpress + mysql + phpMyAdmin のDocker環境が構築されています。この環境をそのまま使ってもいいですし、ご自身で用意したDocker環境を保存しておくこともできます。
+ libs
  + あらかじめ[wp_themes]というフォルダがあって、そこにデフォルトでインストールされているwordpress関係のファイルが収められています。通常これを編集することはありません。  
  その他、自分やプロジェクトチームで編集するわけではない外部ライブラリなどを整理しておくディレクトリになります。
+ documents
  + ここにプロジェクトに必要な書類やドキュメントを自由に入れてください。
+ development
  + ここがプロジェクトの開発用ディレクトリになります。デフォルトでwordpressのテンプレート、understrapが入ります。このunderstrapを使って開発を進めてもいいですし、必要なければ消して自由に使ってください。

特徴のところでも触れましたが、このテンプレートの特徴のひとつとして、高機能な仮想化環境を提供しておきながらお互いが干渉し合わない、という点があります。  
つまり、developmentディレクトリの中だけで普段通りのNode.jsを使った静的ページの開発のみを行ってもいいですし、serverディレクトリに独自のDocker環境を構築してもいいですし、myProject_vagrantディレクトリを使ってVagrantからカスタマイズを行ってもかまいません。  
もちろん、テンプレートの提供してあるとおりに、VagrantのゲストがホストのmyProject_dockerディレクトリにあるDocker環境を動かして、Dockerのゲストがホストのdevelopmentディレクトリにある開発環境を実行する開発スタイルをとることができれば、本番環境構築までずっと楽になるでしょう。

このクイックスタートガイドではデフォルト環境で開発を進める前提で説明していきます。

### 作業開始

作成されたプロジェクトのvagrantディレクトリに移動します。  
<プロジェクト名> / <プロジェクト名> _ vagrant  
に作成されます。

```bash:例
cd myProject/myProject_vagrant
```

次のコマンドを実行して、Vagrantを起動します。

```bash
vagrant up
```

しばらくメッセージが表示され、落ち着いた頃にVagrantが起動完了します。

ブラウザで  
[http://localhost:8000](http://localhost:8000)  
を開いてwordpress初回インストール画面が表示されれば作業開始です。初回はとにかくここまで時間がかかります。

しばらく待っても、ブラウザに表示されない場合はトラブルシュートを参照してください。

### 作業ディレクトリ

作業ディレクトリは

development

ディレクトリになります。この中のファイルをお好きな開発環境で編集しながら開発を進めるようにしてください。

デフォルトではwordpressの[WordPress \+ Bootstrap 4 Theme Framework \- UnderStrap](https://understrap.com/)というテーマを入れています。  

```bash
cd development/wp_themes
gulp watch-bs
```

などとすれば、使いなれたNode.jsのBrowserSyncなどでそのまま開発が可能です。

### 作業終了

一日の作業終わりや、別プロジェクトの作業が入った場合、作業を途中で中断する場合はVagrantを終了する必要があります。  
作業ディレクトリ（クイックスタートガイドではmyProject）で次のコマンドを実行してください。

```bash
vagrant halt
```

しばらく待って、Vagrantが終了したニュアンスのメッセージが表示されれば作業終了です。

## プロジェクトのカスタマイズ

### プロジェクト名

プロジェクト名はデフォルトではmyProjectですが、プロジェクト作成の時に次のように実行すると任意のプロジェクトを作ることができます。

```bash
node setup 任意のプロジェクト名
```

### Vagrant

このプロジェクトテンプレートで作業の一番最初に立ち上げるのがVagrantですが、VagrantはDockerとdocker-composeの実行環境を提供しているにすぎないので、つまりこのテンプレートではDockerの実行環境以上の機能をVagrantに持たせない方がいいと考えて設計してあります。  
しかしながら、Vagrantを自由に（もしくはすでに構築済みの自分の環境に）変更するために、次のディレクトリを参考にしてください。プロジェクト名はデフォルトのmyProjectであると仮定して進めています。

#### VagrantFile

myProject/vagrant_myProject/VagrantFile

原則として、

```bash
git clone https://github.com/coreos/coreos-vagrant.git
```

で作成されたファイルをそのまま使用しています(一部例外あり)。このVagrantFileを使うのであれば、可能な限り、次に示すファイルを変更する方法をとってください。  
別のVagrantFileを使用する場合はその限りではありません。

#### config.rb

可能であればこのconfig.rbで設定を行うようにしてください。ここに書かれた設定が、VagrantFileに反映されます（そうなるように、VagrantFileに書かれてあります）。
ただし、Vagrantのプロビジョニング（初期設定のようなもの）はこのファイルに書いても反映されません。プロビジョニングは次に説明するconfig.ignに書くようにしてください。

#### config.ign

[coreos/vagrant\-ignition: A Vagrant plugin for providing Ignition Configs to VirtualBox virtual machines](https://github.com/coreos/vagrant-ignition)が使用する設定ファイル二なります。ただし、このままでは人が編集するのは困難なため、通常は中間ファイルを作成します。中間ファイルについては

system/vagrant-template/cloud-config-template.yml

を参考にしてください。  
作者がそもそもsystemdに対する理解が浅く、試行錯誤というかむやみやたらに設定を試す方法を繰り返してきた経緯があります。ご不明な点がありましたら十中八九作者の間違いですので、遠慮無く訂正してください。

### Docker

このテンプレートの肝の部分になります。  
このテンプレートではdocker-composeで開発環境を作ることが、肝心となるように設計されています。  
カスタマイズする場合は、docker-compose.ymlを参考に、できるだけdevelopmentにメインのワーキングディレクトリがくるように設計するのがミソになります。

#### docker-compose.yml

myProject/myProject_docker/docker-compose.yml

必要に応じて編集してください。  
ホスト側にdocker-compose実行環境があるなら、Vagrantを起動・経由しなくても直接このserverディレクトリで

```
docker-compose up -d
```

を実行すれば稼働します。  
つまり、本番環境用docker-compose を追加で myProject_docker/production.yml などと作っておいて

```
docker-compose -f docker-compose.yml -f production.yml up -d
```

と実行すればそのまま本番環境での稼働も可能になります。

#### my-wordpress/Dockerfile

wordpressコンテナの設定になります。デフォルトでインストールされるプラグインやテーマなど、ご自由に追加してください。

#### .env

不可視ファイルなので環境によっては発見しにくい場合があります。パスワードなどはプロジェクト作成時に自動生成されますが、必要に応じて編集してください。

### devlopment

Dockerのメイン環境がこのディレクトリをマウントするように設定して、ここを開発環境ディレクトリにしてください。  
もしVagrantもDockerも必要ない場合、このdevelopmentディレクトリ内で

```bash
node init
```

でNode.jsの開発環境を作ったり、もしくはもともとあるNode.js開発環境をクローンしてきて

```bash
node install
```

などで初期化して開発を行うこともできます。

## 必要構成

### 絶対必要

+ [Vagrant by HashiCorp](https://www.vagrantup.com/)
+ [Node\.js](https://nodejs.org/ja/)

### あると便利

+ [Git](https://git-scm.com/)
+ [Docker \- Build, Ship, and Run Any App, Anywhere](https://www.docker.com/)
  + Vagrant上に入ってるので無くてもいいが、あると単体で起動とかできて便利な場面もある

## トラブルシュート

随時更新中。

#### いくら待ってもブラウザにwordpress初回インストール画面が表示されない

作者も何度も経験しましたが、ネットワークが極端に遅い場合、環境構築時に必要なファイルのダウンロードが内部でタイムアウトしている可能性があります。Vagrantはなるべく初回のvagrant up コマンドだけで環境が整うよう設計してありますが、手動で初期セットアップを完了することもできます。  
この場合、中身はただのVagrantですから、Vagrantを直接操作することになります。  
myProject/vagrant_myProjectディレクトリに移動して

```bash
vagrant up
```

で起動して、しばらく待って起動したら

```bash
vagrant ssh
```

でVagrantのゲストにSSH接続して、

```bash
docker-compose up
```

でDockerの初回起動まで持って行ってください。  
docker-composeさえインストールがまだの場合、ネットワークが遅すぎなのでしばらく待っていたらdocker-compose はインストールされると思います。

#### 手動でやっても全然動かない・なんかエラーが出る

```bash
-bash: /usr/bin/docker: Input/output error
-bash: /home/core/.bash_logout: Input/output error
-bash: /etc/bash/bash_logout: Input/output error
```

Vagrantゲスト上で手動でインストール行おうとしても上記のようなエラーが出て全然先に進まない場合、Vagrant環境をいったん削除・再構築したほうがいい場合があります。次の「プロジェクトを削除したい・Vagrantがなんかおかしい」を参考にしてください。

#### プロジェクトを削除したい・Vagrantがなんかおかしい

myProject/myProject_vagrantディレクトリ内で、

```bash
vagrant destroy --force
```

でVagrantイメージを削除してください。  
Dockerのmysqlデーターはデフォルトでは永続化されていませんので、Vagrantのイメージもろとも消えます。

Vagrantoがなんかおかしいので消した上でもう一回インストールしたい場合は

```bash
vagrant up
```

でふたたびまっさらな状態から環境構築されます。

#### MacでVagrant起動するたびにパスワード入力を求められる

こちらを参考に、  

+ [NFS \- Synced Folders \- Vagrant by HashiCorp](https://www.vagrantup.com/docs/synced-folders/nfs.html)  
+ [VagrantのSynced FoldersでNFSを利用するときにsudoのパスワード入力を省略する](https://qiita.com/nmatayoshi/items/fb96913140cb285e59e2)

```bash
sudo visudo /private/etc/sudoers.d/vagrant-nfs
```

```bash:/private/etc/sudoers.d/vagrant-nfs
# NFS - Synced Folders - Vagrant by HashiCorp
# https://www.vagrantup.com/docs/synced-folders/nfs.html
Cmnd_Alias VAGRANT_EXPORTS_ADD = /usr/bin/tee -a /etc/exports
Cmnd_Alias VAGRANT_NFSD = /sbin/nfsd restart
Cmnd_Alias VAGRANT_EXPORTS_REMOVE = /usr/bin/sed -E -e /*/ d -ibak /etc/exports
%admin ALL=(root) NOPASSWD: VAGRANT_EXPORTS_ADD, VAGRANT_NFSD, VAGRANT_EXPORTS_REMOVE
```
