# 二分查找

* 循环条件: `left < right`, 因为是闭区间查找, `left < right`后退出, 进行后续检查.
* 判断条件: 先写一定能够排除`mid`的条件, 然后确定`mid`的偏移方向.

## 第一个大于等于目标的数

```cpp
int left = 0, right = nums.size() - 1;
while (left < right) {
    int mid = (left + right) / 2;
    if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid;
    }
}
```

## 第一个大于目标的数

```cpp
int left = 0, right = nums.size() - 1;
while (left < right) {
    int mid = (left + right) / 2;
    if (nums[mid] <= target) {
        left = mid + 1;
    } else {
        right = mid;
    }
}
```

## 最后一个小于等于目标的数

```cpp
int left = 0, right = nums.size() - 1;
while (left < right) {
    int mid = (left + right + 1) / 2;
    if (nums[mid] > target) {
        right = mid - 1;
    } else {
        left = mid;
    }
}
```

## 最后一个小于目标的数

```cpp
int left = 0, right = nums.size() - 1;
while (left < right) {
    int mid = (left + right + 1) / 2;
    if (nums[mid] >= target) {
        right = mid - 1;
    } else {
        left = mid;
    }
}
```
