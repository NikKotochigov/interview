/**
 * Дан массив УНИКАЛЬНЫХ чисел.
 * Нужно найти пару чисел, сумма которых равна target,
 * или вернуть undefined, если пара не найдена.
 *
 * Пример: findPair([1, 7, 3, 9], 10) -> [1, 9] или [7, 3]
 */

function findPair(arr, target) {
  if (!Array.isArray(arr)) return undefined;

  // Быстрое решение O(n): идём по массиву и запоминаем, что уже видели.
  const seen = new Set();

  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    const need = target - x;
    if (seen.has(need)) return [need, x];
    seen.add(x);
  }

  return undefined;
}

// Альтернатива через сортировку и два указателя:
// - O(n log n) на сортировку, O(1) память
// - важно: не мутировать исходный массив (arr.sort() меняет arr)
function findPairSorted(arr, target) {
  if (!Array.isArray(arr)) return undefined;

  const sorted = [...arr].sort((a, b) => a - b);
  let l = 0;
  let r = sorted.length - 1;

  while (l < r) {
    const sum = sorted[l] + sorted[r];
    if (sum === target) return [sorted[l], sorted[r]];
    if (sum < target) l += 1;
    else r -= 1;
  }

  return undefined;
}

// console.log(findPair([1, 7, 3, 9], 10)); // [1, 9] или [7, 3]
// console.log(findPair([1, 2, 3], 100)); // undefined

