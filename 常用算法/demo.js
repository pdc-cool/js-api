/**
 * 1.选择排序
 * 思路：
 * 1.遍历数组
 * 2.每次遍历找到最小值放到最前面
 * 3.遍历结束，数组即从小到大排序
 * 链接：https://www.bilibili.com/video/BV1gz4y1S7jD?p=5&spm_id_from=pageDriver
 * 优化方案：
 * 1.每次遍历找到最小值和最大值，最小和最大交换位置，即减少一半遍历
 * 刷题记录：
 * 1.20210131 11:34
 */
let arr = [3, 2, 8, 9, 0, 4, 7];

for (let i = 0; i < arr.length - 1; i++) {
  let minPos = i;

  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] < arr[minPos]) {
      minPos = j;
    }
  }

  [arr[i], arr[minPos]] = [arr[minPos], arr[i]];
}

// console.log(arr);

/**
 * 2.冒泡排序
 * 思路：
 * 1.外遍历，每次遍历都会把最大的放在后面（内循环会比较前后元素并交换位置）
 * 2.内遍历，前后元素比较，大于后面元素交换位置，至每次循环结束最大的在最后位置
 * 链接：https://leetcode-cn.com/problems/sort-an-array/solution/mou-pao-pai-xu-javascript-by-liu-yuan-quan/
 * 刷题记录：
 * 1.20210131 12:07
 * 优化方案：
 */
let bubbleArr = [9, 3, 7, 4, 5, 0, 1];

for (let i = bubbleArr.length - 1; i >= 0; i--) {
  for (let j = 0; j < i; j++) {
    // 前一个元素大于后一个元素，则交互位置
    if (bubbleArr[j] > bubbleArr[j + 1]) {
      [bubbleArr[j], bubbleArr[j + 1]] = [bubbleArr[j + 1], bubbleArr[j]];
    }
  }
}
// console.log(bubbleArr)

/**
 * 3.插入排序
 * 思路：
 * 1.外遍历
 * 2.内遍历从数组的第二个数开始向前比较，如果与前一个数相比满足升序关系则不变，如不满足，则比较交互位置至满足升序关系
 * 链接：https://leetcode-cn.com/problems/sort-an-array/solution/cha-ru-pai-xu-by-xiao-pang-ding-er/
 * 刷题记录：
 * 1.20210131 13:37
 * 优化方案：
 */
let insertArr = [9, 3, 7, 4, 5, 0, 1];

for (let i = 0; i < insertArr.length; i++) {
  for (let j = i + 1; j > 0; j--) {
    if (insertArr[j] < insertArr[j - 1]) {
      [insertArr[j], insertArr[j - 1]] = [insertArr[j - 1], insertArr[j]];
    }
  }
}

// console.log(insertArr)
