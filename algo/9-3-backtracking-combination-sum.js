// =============================================================================
// Условие задачи (LeetCode 39 — Combination Sum)
// =============================================================================
//
// Дано:
//   - массив candidates уникальных положительных чисел
//   - целое target
//
// Вернуть:
//   - все комбинации, где сумма = target
//   - одно число можно использовать неограниченно
//   - комбинации без учёта порядка ([2,2,3] и [2,3,2] — одно и то же)
//
// Примеры:
//   [2,3,6,7], target=7   →  [[2,2,3],[7]]
//   [2,3,5], target=8     →  [[2,2,2,2],[2,3,3],[3,5]]
//   [2], target=1         →  []
//
// Сложность:
//   Время:  O(2^target) в худшем — экспоненциально по глубине дерева
//   Память: O(target) — глубина рекурсии и path
//
// Алгоритм: backtracking (DFS с откатом).
//
// start — с какого индекса можно брать (чтобы не было [3,2] и [2,3])
// remain — сколько ещё нужно набрать до target
// path — текущая комбинация

function combinationSum(candidates, target) {
    const result = [];
    const path = [];

    function back(start, remain) {
        if (remain === 0) {
            result.push([...path]);
            return;
        }
        if (remain < 0) return
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            back(i, remain - candidates[i]);
            path.pop();
        }
    }

    back(0, target);
    return result;
}

// --- примеры ---

console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1)); // []

module.exports = { combinationSum };
// if (remain === 0) {

// }

// if (remain > target) return;