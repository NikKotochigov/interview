// =============================================================================
// Условие задачи (LeetCode 56 — Merge Intervals)
// =============================================================================
//
// Дано:
//   - массив интервалов intervals[i] = [start, end], start ≤ end
//
// Вернуть:
//   - интервалы без пересечений, покрывающие те же точки
//   - пересекающиеся или касающиеся сливаются: [1,4] + [4,5] → [1,5]
//
// Примеры:
//   [[1,3],[2,6],[8,10],[15,18]]  →  [[1,6],[8,10],[15,18]]
//   [[1,4],[4,5]]                 →  [[1,5]]
//   [[4,7],[1,4]]                 →  [[1,7]]
//
// Сложность:
//   Время:  O(n log n) — сортировка; O(n) после sort
//   Память: O(n) — массив результата
//
// Алгоритм:
//   1. Сортировка по start
//   2. Если пересекаются — расширяем end последнего
//      иначе — добавляем новый интервал

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (intervals.length === 0) return [];

  const sorted = intervals.sort((a, b) => a[0] - b[0]);
  const result = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push(sorted[i]);
    }
  }

  return result;
}

// --- примеры ---

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1, 4], [4, 5]])); // [[1,5]]
console.log(merge([[4, 7], [1, 4]])); // [[1,7]]

console.log(merge([[1, 3], [2, 6]])); // [[1,6]]

module.exports = { merge };
