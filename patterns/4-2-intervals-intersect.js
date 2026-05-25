// Паттерн: точки и отрезки — пересечение двух списков интервалов
//
// Два указателя p1, p2 по двум спискам (как 1-2-two-pointers-intersect для чисел).
// Сдвигаем указатель того отрезка, который РАНЬШЕ заканчивается.
//
// См. также: 4-1-intervals-merge.js — слияние одного списка.

/**
 * Есть ли общая часть у отрезков a и b (включая касание)?
 * @param {number[]} a [start, end]
 * @param {number[]} b
 */
function isOverlapping(a, b) {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}

/**
 * Пересечение двух отрезков (если isOverlapping === true).
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */
function overlapTwoSegments(a, b) {
  return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
}

// =============================================================================
// Условие задачи (LeetCode 986 — Interval List Intersections)
// =============================================================================
//
// Дано:
//   - s1, s2 — два массива интервалов [start, end]
//   - в каждом списке интервалы отсортированы по start
//   - внутри одного списка интервалы НЕ пересекаются
//
// Нужно вернуть:
//   - массив интервалов — все непустые пересечения пар (один из s1, один из s2)
//   - результат тоже отсортирован, без пересечений внутри
//
// Примеры:
//   s1 = [[0,2],[5,10],[13,23],[24,25]]
//   s2 = [[1,5],[8,12],[15,24],[25,26]]
//   → [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
//
//   s1 = [[1,3],[5,9]],  s2 = [[4,7],[10,12]]  →  [[5,7]]
//
// Логика сдвига p1/p2:
//   кто раньше закончился (меньший end) — тот отработал, указатель ++
//
// =============================================================================

/**
 * @param {number[][]} s1
 * @param {number[][]} s2
 * @returns {number[][]}
 */
function intersectIntervals(s1, s2) {
  const result = [];
  let p1 = 0;
  let p2 = 0;

  while (p1 < s1.length && p2 < s2.length) {
    if (isOverlapping(s1[p1], s2[p2])) {
      result.push(overlapTwoSegments(s1[p1], s2[p2]));
    }

    // сдвигаем тот список, у которого текущий интервал заканчивается раньше
    if (s1[p1][1] < s2[p2][1]) {
      p1++;
    } else {
      p2++;
    }
  }

  return result;
}


/**
 * @param {number[][]} s1
 * @param {number[][]} s2
 * @returns {number[][]}
 */
function intersectIntervals(s1, s2) {
  const result = [];
  let p1 = 0;
  let p2 = 0;

  while (p1 < s1.length && p2 < s2.length) {
    if (Math.max(s1[p1][0], s2[p2][0]) <= Math.min(s1[p1][1], s2[p2][1])) {
      result.push([
        Math.max(s1[p1][0], s2[p2][0]),
        Math.min(s1[p1][1], s2[p2][1]),
      ]);
    }

    if (s1[p1][1] < s2[p2][1]) {
      p1++;
    } else {
      p2++;
    }
  }

  return result;
}

// --- пример ---
//
//   s1[p1]=[0,2], s2[p2]=[1,5] → пересечение [1,2], end 2<5 → p1++
//   [5,10] и [1,5] → [5,5], p2++
//   ...
//
console.log(
  intersectIntervals(
    [
      [0, 2],
      [5, 10],
      [13, 23],
      [24, 25],
    ],
    [
      [1, 5],
      [8, 12],
      [15, 24],
      [25, 26],
    ]
  )
);
// [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

console.log(intersectIntervals([[1, 3], [5, 9]], [[4, 7], [10, 12]])); // [[5,7]]

module.exports = { isOverlapping, overlapTwoSegments, intersectIntervals };
