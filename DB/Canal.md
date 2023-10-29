# Canal

Canal可以解析MySQL的BinLog, 并将数据的变更信息同步到消息队列.

## 测试环境配置

```yaml
services:
  mysql:
    image: bitnami/mysql
    ports:
      - '3306:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=root
  canal:
    image: canal/canal-server
    environment:
      - canal.instance.master.address=mysql:3306
      - canal.instance.dbUsername=root
      - canal.instance.dbPassword=root
      - canal.mq.topic=canal
      - canal.mq.flatMessage=true # 发送JSON数据到消息队列, 而不是protobuf.
      - canal.serverMode=kafka
      - canal.mq.servers=kafka:9092 # Kafka地址
      - canal.serverMode=RocketMQ
      - canal.mq.servers=namesrv:9876 # RocketMQ地址
      
```

这里使用的是bitnami打包的MySQL默认已经开启了BinLog, 直接使用root用户进行同步.

## 验证环境验证

连接数据库新建一张测试表, 执行SQL进行数据变更, 查看消息队列中是否有数据.

```sql
CREATE TABLE test
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(30) NOT NULL
);

INSERT INTO test (content) VALUE ('old value');
UPDATE test SET content = 'new value' WHERE id = 1;
DELETE FROM test WHERE id = 1;
```

## 问题思考

Canal需要数据库采用Row的方式产生BinLog.

---

Canal发生故障, 是否会丢失BinLog, 是否会向消息队列中写入重复数据?

如果Canal的进度落后数据库太多, 可能会有问题.

在Canal重启的时候一般不会向消息队列投递重复数据, 但可能生产端还是有概率发送重复数据.

---

为什么要使用消息队列, Canal不能自己存储数据吗?

Canal只会将数据缓存在内存中, 使用的数据结构是RingBuffer.

Canal不负责处理数据的堆积, 这部分职责应该由消息队列来承担.
