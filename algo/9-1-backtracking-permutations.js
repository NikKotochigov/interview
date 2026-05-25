// =============================================================================
// Условие задачи (LeetCode 46 — Permutations)
// =============================================================================
//
// Дано:
//   - массив nums из попарно различных чисел
//
// Вернуть:
//   - все возможные перестановки (любой порядок в ответе)
//
// Примеры:
//   [1, 2, 3]  →  [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//   [0, 1]     →  [[0,1],[1,0]]
//   [1]        →  [[1]]
//
// Сложность:
//   Время:  O(n · n!) — n! перестановок, сборка каждой за O(n)
//   Память: O(n) — path + used + стек рекурсии
//
// Алгоритм: backtracking — на каждом шаге пробуем число, которое ещё не взяли.
//
// used[i] — nums[i] уже в текущей перестановке
// path — текущая перестановка (длина n → сохраняем в result)

function permute(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// --- примеры ---

console.log(permute([1, 2, 3]));
console.log(permute([0, 1]));
console.log(permute([1]));

module.exports = { permute };
