// =============================================================================
// Условие задачи (LeetCode 47 — Permutations II)
// =============================================================================
//
// Дано:
//   - массив nums (могут быть дубликаты)
//
// Вернуть:
//   - все уникальные перестановки (без повторов в ответе)
//
// Примеры:
//   [1, 1, 2]  →  [[1,1,2],[1,2,1],[2,1,1]]  (3 штуки)
//   [1, 2, 3]  →  6 перестановок
//
// Сложность:
//   Время:  O(n · n!) в худшем (уникальных меньше при дубликатах)
//   Память: O(n)
//
// Алгоритм:
//   1. Сортируем nums — одинаковые рядом
//   2. Backtracking как в Permutations
//   3. Пропуск: nums[i] === nums[i-1] && !used[i-1]

function permuteUnique(nums) {
  nums = [...nums].sort((a, b) => a - b);

  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function back() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      // дубликат на этом уровне for — пропускаем
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue

      used[i] = true;
      path.push(nums[i]);
      back();
      path.pop();
      used[i] = false;
    }
  }

  back();
  return result;
}

// --- примеры ---

console.log(permuteUnique([1, 1, 2])); // 3 перестановки, без повторов в ответе
console.log(permuteUnique([1, 2, 3])); // 6 перестановок

module.exports = { permuteUnique };
