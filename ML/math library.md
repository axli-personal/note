#### `scipy`

```
Scientific computing with Python since 2001.
```

#### `numpy`

```
Numerical computing with Python since 2005.
```

`numpy.c_`

```python
# Connect data in second axis.
np.c_[np.array([1,2,3]), np.array([4,5,6])] # [[1,4], [2,5], [3,6]]
```

`numpy.random.permutation`

```python
# parm(x): int or array-like
# If x is an integer, randomly permute np.arange(x).
np.random.permutation(10) # [1, 7, 4, 3, 0, 9, 2, 5, 8, 6]
```

#### `pandas`

```
Panel data analysis with Pyton since 2008.
```

`pandas.read_csv`

```python
# thousands 千位分隔符
# delimiter 单元分隔符
# na_value  额外的空值
```

`DataFrame简介`

```python
# 1.DataFrame是一个表格型数据结构.
# 2.DataFrame可以看作是由Series组成的字典,且共用一个索引.
```

`DataFrame创建`

```python
# 1.通过DataFrame方法:
import pandas as pd
pd.DataFrame({'Colnum1':[1, 2, 3], 'Column2':[4, 5, 6]}, index = ['a', 'b', 'c'])
Series1 = pd.Series([1, 2, 3], index = ['a', 'b', 'c'])
Series2 = pd.Series([4, 5, 6, 7], index = ['a', 'b', 'c', 'd'])
sheet1 = pd.DataFrame({'Column1':Series1, 'Column2':Series2}) # 索引进行了排序并统一
# 2.通过read_csv方法:
sheet1.to_csv('表格1.csv') # 保存到csv文件
pd.read_csv('表格1.csv') # 读取csv文件
```

`DataFrame.iloc`

```python
# int         return a series corresponding to that row.
# int list    return a dataframe contains specfic rows.
```

