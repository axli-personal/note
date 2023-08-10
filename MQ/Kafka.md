# Kafka

## 消息模型

![1](https://img.axlis.cn/note/MQ/1.png)

## 常用术语

* AR(Assigned Replicas): 分区中分配的所有副本.
* ISR(In Sync Replicas): 分区中与Leader保持同步的所有副本.

## Push还是Pull?

* Producer将消息推送到Broker.
* Consumer从Broker拉取消息.

## 为什么Kafka不将消息推送给消费者?

* Broker推送速率过快容易导致消费者崩溃.
* Broker需要知道消费者的消费能力, 以选择合适的推送策略.
