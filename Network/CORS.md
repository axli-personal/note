# Cross-Origin Resource Sharing

CORS在客户端上由浏览器支持，在服务器上需要给与请求正确的应答。

## 简单请求

Allowed Method: `HEAD`, `GET`, `POST`.

Allowed Header: `Accept`, `Accept-Language`, `Content-Type`.

Allowed Content-Type: `application/x-www-form-urlencoded`, `multipart/form-data`,  `text/plain`.

对于简单请求浏览器会添加`Origin`直接请求；对于非简单请求浏览器添加`Origin`和超出简单请求的额外信息进行预检，预检通过后的处理流程就和简单请求相同了。

## 服务器应答

`Access-Control-Allow-Origin`是最重要的应答内容：表明了服务器的是否接受目标源。

在预检时服务器需要提供更多详细信息，因为预检包含额外信息并且可以长期缓存在客户端。