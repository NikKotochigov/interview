// =============================================================================
// Условие задачи (Codewars — Don't give me five!)
// =============================================================================
//
// Дано:
//   - целые start, end (включительно, start ≤ end)
//
// Вернуть:
//   - количество чисел от start до end без цифры 5 в десятичной записи
//   - 5, 15, 25, 51, -15, 50 — не считаются
//
// Примеры:
//   (1, 9)     →  8
//   (4, 17)    →  12
//   (-10, -1)  →  (без 5 в цифрах)
//
// Сложность:
//   Время:  O(end − start) — перебор диапазона
//   Память: O(1)
//
// Алгоритм: перебор + String(n).includes('5').
// Для Codewars обычно достаточно.

function dontGiveMeFive(start, end) {
  let count = 0;

  for (let n = start; n <= end; n++) {
    // String(n) работает и для отрицательных: "-15" содержит '5'
    if (!String(n).includes('5')) {
      count++;
    }
  }

  return count;
}

// То же короче:
function dontGiveMeFiveShort(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i).filter(
    (n) => !String(n).includes('5')
  ).length;
}

// --- примеры из условия ---

console.log(dontGiveMeFive(1, 9)); // 8
console.log(dontGiveMeFive(4, 17)); // 12
console.log(dontGiveMeFive(-10, -1)); // без 5 в цифрах

module.exports = { dontGiveMeFive, dontGiveMeFiveShort };
