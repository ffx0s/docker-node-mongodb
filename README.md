# docker-node-mongodb

一个使用 docker、node、mongodb、typescript 的应用 demo。无需安装应用环境，一个命令即可解决开发环境和生产环境。

## 使用

使用前先安装 docker 和 docker-compose，运行开发或构建打包任意一个命令后都会启动两个服务：

1. Node：安装依赖，编译 typescript，打包复制文件（生产环境），运行应用。
2. mongodb：数据存储

### 开发

命令执行后会就可以愉快的编码了。

```
cd docker-node-mongodb
docker-compose -f docker-compose.yml -f dev.yml up
```

### 打包构建

这个命令负责打包构建应用。

```
cd docker-node-mongodb
docker-compose -f docker-compose.yml -f prod.yml up -d
```