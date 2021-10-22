# Optimization

## Five Optimization Method

### SGD(stochastic gradient descent)

我们随机找一个sample，然后就根据gradient更新了我们的参数，有点像走一步看一步。

这种方法更新参数会很快，虽然某些step可能走的不太好，但是总体看还是不错的。

### SGDM(SGD with momentum)

这种方法会考虑到我们过去走过的历史，但是记录不会一只保留，每次会有一个小于1的参数乘以之前的记录。

更新方法：`movement = last_movement * memory_precentage - learning_rate * gradient`

这种方法可以在gradient比较小的时候也可以移动，并且在一定程度上可以突破local minimum的陷阱。

### Adagrad

这种方法的`lr`会动态变化，如果你过去走的步子都很大，那么这一步的步子就会很小。

更新方法：`update = (-1) * lr / sqrt(gradient_square_sum) * graient `

### RMSProp

这种方法针对Adagrad后面可能走的很慢的问题，乘上一些参数来平衡移动速度。

更新方法：`update = (-1) * lr / sqrt(sum) * graient ` 和 `sum = t * last_sum + (1-t) * gradient ^ 2`

### Adam

这种方法结合了SGDM和RMSProp的优点，同时内部还用了一些巧妙的参数来处理特殊情况。

## Application

在实际应用中SGDM和Adam应用广泛，而其他算法并没有出现在很多著名项目中。

SGDM的稳定性强，最后能够收敛到一个很小的值。

Adam的Loss在初始阶段降低的很快，但不是特别的稳定。