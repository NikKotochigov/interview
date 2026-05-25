// Паттерн: префиксный массив (Prefix Sum)
//
// Сумма слева и справа от индекса без пересчёта всего массива:
//   totalSum — один раз
//   prefixSum — накапливаем слева
//   suffixSum = totalSum - prefixSum - nums[i]

// =============================================================================
// Условие задачи (LeetCode 724 — Find Pivot Index)
// =============================================================================
//
// Дано:
//   - массив nums целых чисел
//
// Нужно вернуть:
//   - индекс i (pivot), где сумма элементов СЛЕВА от i
//     равна сумме элементов СПРАВА от i
//   - слева/справа не включают nums[i]
//   - если такого i нет — -1
//   - если несколько — первый подходящий
//
// Примеры:
//   [1, 7, 3, 6, 5, 6]  →  3   (слева 1+7+3=11, справа 5+6=11)
//   [1, 2, 3]           →  -1
//   [2, 1, -1]          →  0
//
// Сложность: O(n) время, O(1) память.
//
// =============================================================================

/**
 * @param {number[]} nums
 * @returns {number}
 */
function pivotIndex(nums) {
  let totalSum = 0;
  for (const num of nums) {
    totalSum += num;
  }

  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const suffixSum = totalSum - prefixSum - nums[i];

    if (prefixSum === suffixSum) {
      return i;
    }

    prefixSum += nums[i];
  }

  return -1;
}

// --- пример: [1, 7, 3, 6, 5, 6] ---
//
// totalSum = 28
//
// i=0: prefix=0, suffix=28-0-1=27  → нет
// i=1: prefix=1, suffix=28-1-7=20  → нет
// i=2: prefix=8, suffix=28-8-3=17   → нет
// i=3: prefix=11, suffix=28-11-6=11 → да → 3
//
console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
console.log(pivotIndex([1, 2, 3])); // -1
console.log(pivotIndex([2, 1, -1])); // 0

// --- формула suffixSum ---
//
//   totalSum = prefixSum + nums[i] + suffixSum
//   suffixSum = totalSum - prefixSum - nums[i]

module.exports = { pivotIndex };
