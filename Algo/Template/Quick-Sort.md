# 快速排序

```java
public class Solution {
    public void quickSort(int[] nums, int left, int right) {
        if (left >= right) {
            return; // 如果数组长度小于2, 不需要进行排序.
        }

        int pivot = partition(nums, left, right);
        // 递归调用quickSort, 将pivot两边的数组排序.
        quickSort(nums, left, pivot - 1);
        quickSort(nums, pivot + 1, right);
    }

    public int partition(int[] nums, int left, int right) {
        int pivot = nums[right];

        while (left < right) {
            if (nums[left] <= pivot) {
                left++;
            } else {
                // 注意检查只剩两个元素的情况.
                swap(nums, left, right - 1); // 准备: 先换到pivot的左边.
                swap(nums, right, right - 1); // 左移: 再和左边的元素交换.
                right--;
            }
        }

        return right; // 返回right, 而不是pivot.
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```