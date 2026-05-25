// Паттерн: точки и отрезки — sweep line (события start/end)
//
// Вместо попарного сравнения интервалов — разбиваем на точки на оси времени:
//   [start, +1]  встреча началась → +1 комната
//   [end,   -1]  встреча закончилась → -1 комната
// Сортируем точки, один проход → макс. одновременных встреч.
//
// См. 4-1 merge, 4-2 intersect — тот же блок «отрезки».

// =============================================================================
// Условие задачи (LeetCode 253 — Meeting Rooms II)
// =============================================================================
//
// Дано:
//   - segments — массив интервалов [start, end], время встречи
//   - start < end, интервалы могут пересекаться
//
// Нужно вернуть:
//   - минимальное число переговорок, чтобы все встречи прошли
//   (сколько встреч идут ОДНОВРЕМЕННО в пиковый момент)
//
// Примеры:
//   [[0,30],[5,10],[15,20]]  →  2
//     0──────30
//        5─10
//              15─20   → в момент 5..10 две встречи
//
//   [[7,10],[2,4]]  →  1  (не пересекаются)
//
// Сортировка точек при равном времени:
//   сначала end (-1), потом start (+1) → если одна заканчивается
//   в T и другая начинается в T, хватает одной комнаты
//
// =============================================================================

/**
 * @param {number[][]} segments
 * @returns {number}
 */
function countMeetingRooms(segments) {
  const points = [];

  for (let i = 0; i < segments.length; i++) {
    points.push([segments[i][0], 1]); // start — заняли комнату
    points.push([segments[i][1], -1]); // end — освободили
  }

  points.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1]; // при равном времени: -1 раньше +1
    return a[0] - b[0];
  });

  let maxRooms = 0;
  let currRooms = 0;

  for (let i = 0; i < points.length; i++) {
    currRooms += points[i][1];
    maxRooms = Math.max(maxRooms, currRooms);
  }

  return maxRooms;
}

/**
 * @param {number[][]} segments
 * @returns {number}
 */
function countMeetingRooms(segments) {
  const points = [];

  for (let i = 0; i < segments.length; i++) {
    points.push([segments[i][0], 1]);
    points.push([segments[i][1], -1]);
  }

  points.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  let maxRooms = 0;
  let currentRooms = 0;

  for (let i = 0; i < points.length; i++) {
    currentRooms += points[i][1];
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
}

// --- пошагово: [[0,30], [5,10], [15,20]] ---
//
// ШАГ 1 — события (points)
//   [0,30]  → [0, +1]  встреча началась
//           → [30, -1] встреча закончилась
//   [5,10]  → [5, +1], [10, -1]
//   [15,20] → [15, +1], [20, -1]
//
//   points = [[0,1],[30,-1],[5,1],[10,-1],[15,1],[20,-1]]
//
// ШАГ 2 — сортировка по времени (при равном t: end -1 раньше start +1)
//   [0,1] [5,1] [10,-1] [15,1] [20,-1] [30,-1]
//
// ШАГ 3 — sweep: currRooms = сколько встреч СЕЙЧАС идут
//
//   время | событие      | currRooms | maxRooms
//   ------|--------------|-----------|----------
//    0    | start +1     |     1     |    1
//    5    | start +1     |     2     |    2  ← пик (A и B вместе)
//   10    | end   -1     |     1     |    2
//   15    | start +1     |     2     |    2  (A ещё идёт + C)
//   20    | end   -1     |     1     |    2
//   30    | end   -1     |     0     |    2
//
// ответ: 2 переговорки
//
console.log(countMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
console.log(countMeetingRooms([[7, 10], [2, 4]])); // 1

// --- визуально ---
//
//   время →
//   |--A--------|
//      |-B-|
//            |-C-|
//   в интервале B и A вместе → 2 комнаты

module.exports = { countMeetingRooms };
