# 快速排序

```cpp
int partition(vector<int> &nums, int left, int right) {
    int pivot = nums[right];
    int p = right; // pivot最终所在的位置.
    for (int i = left; i < p; i++) {
        if (nums[i] > pivot) {
            swap(nums[i], nums[p - 1]);
            swap(nums[p], nums[p - 1]);
            p--;
            i--; // 保持i不变.
        }
    }
    return p;
}
```
