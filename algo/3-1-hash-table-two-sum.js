// =============================================================================
// Условие задачи (LeetCode 1 / Codewars — Two Sum)
// =============================================================================
//
// Дано:
//   - массив numbers целых
//   - целое target
//   - ровно одна пара с суммой target, один элемент — не более одного раза
//
// Вернуть:
//   - два разных индекса [i, j], numbers[i] + numbers[j] === target
//
// Примеры:
//   [2, 7, 11, 15], target=9   →  [0, 1]
//   [3, 2, 4], target=6        →  [1, 2]
//
// Сложность:
//   Время:  O(n)
//   Память: O(n)
//
// Алгоритм: один проход + хеш-таблица (Map / объект).
// Для текущего x ищем complement = target - x среди уже просмотренных.
//   если complement был на индексе j → ответ [j, i]
//   иначе запоминаем x → i и идём дальше

function twoSum(numbers, target) {
  const seen = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i];
    const diff = target - x;

    if (seen.has(diff)) {
      return [seen.get(diff), i];
    }

    seen.set(numbers[i], i);
  }

}

// --- примеры ---

console.log(twoSum([1, 2, 3], 4)); // [0, 2]  (1 + 3)
console.log(twoSum([3, 2, 4], 6)); // [1, 2]  (2 + 4)
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]  (2 + 7)

module.exports = { twoSum };
