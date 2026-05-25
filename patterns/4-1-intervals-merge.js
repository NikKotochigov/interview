// =============================================================================
// Фреймворк: точки и отрезки (какой вариант выбрать на собесе)
// =============================================================================
//
//                        ┌─────────┐
//                        │  START  │
//                        └────┬────┘
//                             │
//              ┌──────────────▼──────────────┐
//              │   два массива отрезков?     │
//              └──────────────┬──────────────┘
//                    ДА       │       НЕТ
//         ┌───────────────────┘       └──────────────────────────────┐
//         ▼                                                          ▼
//  ┌──────────────────────────────┐              ┌─────────────────────────────────┐
//  │ два указателя на отрезках    │              │ нужно макс. число событий       │
//  │ (каждому списку — свой p)    │              │ в один момент времени?        │
//  └──────────────┬───────────────┘              └──────────────┬──────────────────┘
//                 │                                    ДА       │        НЕТ
//                 ▼                          ┌─────────────────┘        └────────────┐
//    4-2-intervals-intersect.js              ▼                                      ▼
//    intersectIntervals                       ┌──────────────┐              ┌─────────────────┐
//    p1/p2, сдвиг по меньшему end             │ метод точек  │              │ метод отрезков  │
//                                              │ sweep line   │              │ sort + merge    │
//                                              └──────┬───────┘              └────────┬────────┘
//                                                     ▼                               ▼
//                                          4-3-intervals-meeting-rooms.js    ЭТОТ ФАЙЛ (4-1)
//                                          countMeetingRooms                 merge
//
// Метод точек: start → +1, end → -1, сортировка, макс. сумма.
// Метод отрезков: один список, sort по start, слияние / вставка.
//
// =============================================================================

// Паттерн: точки и отрезки — слияние (метод отрезков)
// См. algo/4-1-intervals-merge.js, algo/4-2-intervals-insert.js

/**
 * Пересекаются ли отрезки a и b (включая касание границ)?
 * @param {number[]} a [start, end]
 * @param {number[]} b
 */
function isOverlapping(a, b) {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}

/**
 * Объединить два отрезка в один.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */
function mergeTwo(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

// =============================================================================
// Условие задачи (LeetCode 56 — Merge Intervals)
// =============================================================================
//
// Дано:
//   - segments — массив интервалов [start, end], start ≤ end
//   - порядок произвольный (массив можно менять — сортируем на месте)
//
// Нужно вернуть:
//   - интервалы без пересечений, покрывающие те же точки на прямой
//   - пересекающиеся или касающиеся отрезки → один общий
//
// Пересечение (включая касание):
//   [1,3] и [2,6]  →  [1,6]
//   [1,4] и [4,5]  →  [1,5]
//
// Примеры:
//   [[1,3],[2,6],[8,10],[15,18]]  →  [[1,6],[8,10],[15,18]]
//   [[1,4],[4,5]]                 →  [[1,5]]
//   [[4,7],[1,4]]                 →  [[1,7]]
//
// Алгоритм merge:
//   1. sort по start
//   2. result = [первый интервал]
//   3. для каждого current: если пересекается с last → mergeTwo, иначе push
//
// Хелперы выше: isOverlapping, mergeTwo
//
// =============================================================================

/**
 * @param {number[][]} segments
 * @returns {number[][]}
 */
function merge(segments) {
  if (segments.length === 0) return [];

  segments.sort((x, y) => x[0] - y[0]);

  const result = [segments[0]];

  for (let i = 1; i < segments.length; i++) {
    const last = result[result.length - 1];
    const current = segments[i];

    if (isOverlapping(last, current)) {
      result[result.length - 1] = mergeTwo(last, current);
    } else {
      result.push(current);
    }
  }

  return result;
}

/**
 * @param {number[][]} segments
 * @returns {number[][]}
 */
function merge(segments) {
  if (segments.length === 0) return [];

  segments.sort((a, b) => a[0] - b[0]);

  const result = [segments[0]];

  for (let i = 1; i < segments.length; i++) {
    const last = result[result.length - 1];
    const current = segments[i];

    if (Math.max(last[0], current[0]) <= Math.min(last[1], current[1])) {
      result[result.length - 1] = [
        Math.min(last[0], current[0]),
        Math.max(last[1], current[1]),
      ];
    } else {
      result.push(current);
    }
  }

  return result;
}

// --- пример ---
//
//   [[1,3], [2,6], [8,10], [15,18]]
//
// sort → то же
// [1,3]+[2,6] пересекаются → [1,6]
// [8,10] отдельно, [15,18] отдельно
//
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1, 4], [4, 5]])); // [[1,5]]
console.log(merge([[4, 7], [1, 4]])); // [[1,7]] — после sort

// --- isOverlapping на числовой прямой ---
//
//   a:  |-----|
//   b:      |-----|
//       ^max(start)  ^min(end)  → пересечение если max(start) <= min(end)

module.exports = { isOverlapping, mergeTwo, merge };
