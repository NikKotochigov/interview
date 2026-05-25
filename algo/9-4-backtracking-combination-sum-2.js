// =============================================================================
// Условие задачи (LeetCode 40 — Combination Sum II)
// =============================================================================
//
// Дано:
//   - массив candidates (могут быть дубликаты)
//   - целое target
//
// Вернуть:
//   - все уникальные комбинации с суммой target
//   - каждое число — не более одного раза в комбинации
//
// Пример:
//   [10,1,2,7,6,1,5], target=8
//   →  [[1,1,6],[1,2,5],[1,7],[2,6]]
//
// Сложность:
//   Время:  O(2^n) в худшем — backtracking по подмножествам
//   Память: O(n) — path + стек рекурсии
//
// Алгоритм: сортировка + backtracking + пропуск дублей на одном уровне.

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
    const sortedCandidates = candidates.sort((a, b) => a - b);
    const result = [];
    const path = [];

    function back(start, remain) {
        if (remain === 0) {
            result.push([...path]);
            return;
        }
        if (remain < 0) return;

        for (let i = start; i < sortedCandidates.length; i++) {
            if (i > start && sortedCandidates[i] === sortedCandidates[i - 1]) continue
            path.push(sortedCandidates[i]);
            back(i + 1, remain - sortedCandidates[i]);
            path.pop();
        }
    }

    back(0, target);

    return result;

}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
// [1, 1, 2, 5, 6, 7, 10] 8