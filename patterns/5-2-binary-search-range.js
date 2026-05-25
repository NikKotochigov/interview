// Паттерн: бинарный поиск — диапазон первого и последнего вхождения
//
// Два смещённых бинарных поиска:
//   searchFirst — r съезжает влево при nums[m] >= target
//   searchLast  — l съезжает вправо при nums[m] <= target  (см. 5-1)
//
// searchRange = [searchFirst, searchLast]

// =============================================================================
// Условие задачи (LeetCode 34 — Find First and Last Position of Element)
// =============================================================================
//
// Дано:
//   - nums — отсортирован по возрастанию (есть дубликаты)
//   - target
//
// Нужно вернуть:
//   - [first, last] — индексы первого и последнего вхождения target
//   - если target нет — [-1, -1]
//
// Примеры:
//   [5,7,7,8,8,10], target=8  →  [3, 4]
//   [5,7,7,8,8,10], target=6  →  [-1, -1]
//   [], target=0              →  [-1, -1]
//
// Сложность: O(log n) на каждый поиск, всего O(log n).
//
// =============================================================================

/**
 * Первое вхождение target. l=-1, r=length-1 → ответ в r.
 */
function searchFirst(nums, target) {
  let l = -1;
  let r = nums.length - 1;

  while (r - l > 1) {
    const m = l + Math.floor((r - l) / 2);

    if (nums[m] < target) {
      l = m; // target правее m
    } else {
      r = m; // nums[m] >= target — первый не правее m
    }
  }

  return nums[r] === target ? r : -1;
}

/**
 * Последнее вхождение target. l=0, r=length → ответ в l.
 */
function searchLast(nums, target) {
  let l = 0;
  let r = nums.length;

  while (r - l > 1) {
    const m = l + Math.floor((r - l) / 2);

    if (nums[m] <= target) {
      l = m;
    } else {
      r = m;
    }
  }

  return nums[l] === target ? l : -1;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
function searchRange(nums, target) {
  if (nums.length === 0) {
    return [-1, -1];
  }

  return [searchFirst(nums, target), searchLast(nums, target)];
}

// --- пример ---
//
// [5,7,7,8,8,10], target=8
//   first: r сойдёт на индекс 3 (первная 8)
//   last:  l сойдёт на индекс 4 (последняя 8)
//
console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]
console.log(searchRange([], 0)); // [-1, -1]

// --- сравнение first / last ---
//
//   searchFirst: nums[m] < target  → l=m   (ищем границу слева)
//   searchLast:  nums[m] <= target → l=m   (ищем границу справа)
//
//   Симметрия: first отвечает в r, last — в l.

module.exports = { searchFirst, searchLast, searchRange };
