# 分布式锁

## 使用场景

* 并发控制.
* 防止重复操作: 客户端生成唯一ID, 服务端处理请求时加锁.

> 防止重复操作也可以使用**一次性令牌**实现.

## 实现

加锁操作:

```lua
--- -1 failed
--- 1 success
 
--- getLock key
local key = KEYS[1]
local requestId = KEYS[2]
local ttl = tonumber(KEYS[3])
local result = redis.call('setnx', key, requestId)
if result == 1 then
    --PEXPIRE:以毫秒的形式指定过期时间
    redis.call('pexpire', key, ttl)
else
    result = -1;
    -- 重入只需要重置过期时间, 重入次数由调用线程维护.
    local value = redis.call('get', key)
    if (value == requestId) then
        result = 1;
        redis.call('pexpire', key, ttl)
    end
end
--  如果获取锁成功，则返回 1
return result
```

解锁操作:

```lua
--- -1 failed
--- 1 success
 
-- releaseLock key
local key = KEYS[1]
local requestId = KEYS[2]
local value = redis.call('get', key)
if value == requestId then
    redis.call('del', key);
    return 1;
end
return -1
```