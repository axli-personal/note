# Pytorch

## Torch.nn

内部包含了很多已经设计好的模型，而他们是可以直接调用的。

### Linear Module

在这个线性的模型中weight和bias一开始是随机的值。

```python
dim_in  = 3
dim_out = 5
linear_module = nn.Linear(dim_in, dim_out)
data = torch.tensor([[1.0, 2.0, 3.0], [5.0, 7.0, 9.0]])
print(linear_module.weight)
print(linear_module.bias)
print(linear_module(data))
```

### Activation Function

ReLU函数可以把所有的负数都变成0。

```python
activation_function = nn.ReLU()
without_activation = torch.tensor([-1, 0, 1])
print(activation_function(without_activation))
```

Tanh函数是双曲正切函数，可以把值映射到(-1, 1)内。

```python
activation_function = nn.Tanh()
without_activation = torch.tensor([-0.4, 1.2])
print(activation_function(without_activation))
```

Sigmoid函数可以把值映射到(0, 1)内，形状为S型。

```python
activation_function = nn.Sigmoid()
without_activation = torch.tensor([-0.4, 1.2])
print(activation_function(without_activation))
```

### Sequential

你可以用利用Sequential把一连串的模型包成一个模型。

```python
dim_in  = 3
dim_hidden = 4
dim_out = 5
data = torch.tensor([[1.0, 2.0, 3.0], [5.0, 7.0, 9.0]])

model = nn.Sequential(
    nn.Linear(dim_in, dim_hidden),
    nn.Tanh(),
    nn.Linear(dim_hidden, dim_out),
    nn.Sigmoid()
)

# print the parms in the model.
for parm in model.parameters():
    print(parm)

print(model(data))
```

### Loss Function

MSELoss(mean square error).

```python
mse = nn.MSELoss()

output = torch.tensor([1.0, 2.0, 3.0])
label  = torch.tensor([0.0, 0.0, 0.0])

print(mse(output, label))
```