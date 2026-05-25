// =============================================================================
// Условие задачи (Codewars 6 kyu — Equal Sides Of An Array)
// =============================================================================
//
// Дано:
//   - массив arr целых
//
// Вернуть:
//   - наименьший индекс i, где sum(arr[0..i-1]) === sum(arr[i+1..n-1])
//   - arr[i] не входит ни в левую, ни в правую сумму
//   - пустая сторона → сумма 0
//   - если такого i нет → -1
//
// Примеры:
//   [1, 2, 3, 4, 3, 2, 1]       →  3
//   [1, 100, 50, -51, 1, 1]     →  1
//   [20, 10, -80, 10, 10, 15, 35] →  0
//   [1, 2, 3, 4, 5, 6]          →  -1
//
// Сложность:
//   Время:  O(n)
//   Память: O(1)
//
// Алгоритм: prefix sum / running sum.
//   total — сумма всего массива (один раз)
//   left  — сумма слева от текущего индекса (нарастает по ходу)
//   right = total - left - arr[i]

function findEvenIndex(arr) {
  const total = arr.reduce((p, c) => p + c, 0);
  let left = 0;

  for (let i = 0; i < arr.length; i++) {
    const right = total - arr[i] - left;
    if (right === left) return i;
    left += arr[i];
  }

  return -1;

}

// --- примеры из условия ---

console.log(findEvenIndex([1, 2, 3, 4, 3, 2, 1])); // 3
console.log(findEvenIndex([1, 100, 50, -51, 1, 1])); // 1
console.log(findEvenIndex([20, 10, -80, 10, 10, 15, 35])); // 0
console.log(findEvenIndex([1, 2, 3, 4, 5, 6])); // -1

module.exports = { findEvenIndex };
