# OOS SDK

#### Use Golang SDK in Alibaba Cloud to control OOS

##### 1）This SDK warps the http API

##### 2）Create connector

```go
// endpont: 'oss-cn-hangzhou.aliyuncs.com'.
// key and secret: get it from your management console.
// Note: it only store your configurations and doesn't check anything.
connector, err := oos.New("endpoint", "key", "secret")
```

##### 3）Create bucket

```go
// Note: it only store your configurations and doesn't check anything.
bucket, err := connector.Bucket(name)
```

##### 4 ）Manipulate object

```go
// Note: remote path doesn't allow leading '/' or '\'.
// Note: error was the infomations return by http API.
bucket.GetObjectToFile("remote path", "local path")
bucket.PutObjectFromFile("remote path", "local path")
bucket.DeleteObject("remote path")
```
