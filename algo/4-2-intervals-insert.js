// =============================================================================
// Условие задачи (LeetCode 57 — Insert Interval)
// =============================================================================
//
// Дано:
//   - intervals — отсортирован по start, интервалы не пересекаются
//   - newInterval — один новый интервал [start, end]
//
// Вернуть:
//   - intervals после вставки newInterval со слиянием пересечений
//
// Примеры:
//   [[1,3],[6,9]], [2,5]                          →  [[1,5],[6,9]]
//   [[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]    →  [[1,2],[3,10],[12,16]]
//   [], [5,7]                                     →  [[5,7]]
//   [[1,2],[6,9]], [3,5]                          →  [[1,2],[3,5],[6,9]]
//
// Сложность:
//   Время:  O(n)
//   Память: O(n) — массив результата
//
// Пересечение (включая касание границ):
//   [a,b] и [c,d] пересекаются, если c <= b
//   Пример: [1,4] и [4,5] → сливаются в [1,5]
//
// Почему O(n), а не сортировка + merge:
//   массив уже отсортирован → три фазы за один проход по i
//
//   |--- фаза 1: слева ---|--- фаза 2: слияние ---|--- фаза 3: справа ---|
//   [1,2]  [3,5][6,7][8,10]  [12,16]     + new [4,8]
//   в ответ   расширяем new → [3,10]      в ответ
//   итог: [[1,2], [3,10], [12,16]]

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    const result = [];
    let i = 0; // указатель по intervals
    const n = intervals.length;

    // ── Фаза 1: интервалы СЛЕВА от newInterval ─────────────────────────────
    // Условие: interval полностью левее new → его end < new.start
    // Такие интервалы не пересекаются с new — копируем в ответ как есть.
    //
    // Пример: intervals=[[1,3],[6,9]], new=[2,5]
    //   [1,3]: end=3, new.start=2 → 3 < 2? нет → выходим из фазы 1
    //   (на самом деле [1,3] пересекается, пойдём в фазу 2)
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // ── Фаза 2: слияние newInterval со всеми пересекающимися ───────────────
    // Условие пересечения: interval.start <= new.end
    //   (если interval начинается правее new.end — он уже справа, фаза 3)
    //
    // На каждом пересечении расширяем newInterval:
    //   start = min(всех start)  — самая левая граница
    //   end   = max(всех end)    — самая правая граница
    //
    // Пример: [[3,5],[6,7],[8,10]] + new=[4,8]
    //   [3,5]: 3 <= 8 → new = [min(4,3), max(8,5)] = [3,8]
    //   [6,7]: 6 <= 8 → new = [3, max(8,7)] = [3,8]
    //   [8,10]: 8 <= 8 → new = [3, max(8,10)] = [3,10]
    //   [12,16]: 12 <= 10? нет → стоп
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++; // пропускаем слитый интервал — он уже «внутри» newInterval
    }

    // Один объединённый интервал (новый или расширенный)
    result.push(newInterval);

    // ── Фаза 3: интервалы СПРАВА от объединённого ──────────────────────────
    // Всё, что осталось после i, гарантированно start > new.end — без слияния
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}


/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    let n = intervals.length - 1;

    while (i < n && newInterval[0] > intervals[i][1]) {
        result.push(intervals[i]);
        i++;
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
        i++;
    }
    result.push(newInterval);

    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}


// --- примеры ---

// new пересекается с [1,3], сливается → [1,5]; [6,9] остаётся
console.log(insert([[1, 3], [6, 9]], [2, 5])); // [[1,5],[6,9]]

// new [4,8] сливает [3,5],[6,7],[8,10] → [3,10]
console.log(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])); // [[1,2],[3,10],[12,16]]

// пустой массив — только newInterval
console.log(insert([], [5, 7])); // [[5,7]]

// new не пересекается ни с кем — встаёт между
console.log(insert([[1, 2], [6, 9]], [3, 5])); // [[1,2],[3,5],[6,9]]

module.exports = { insert };
