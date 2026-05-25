// =============================================================================
// Условие задачи (LeetCode 33 — Search in Rotated Sorted Array)
// =============================================================================
//
// Дано:
//   - массив nums без дубликатов, изначально отсортирован, затем «повёрнут»
//     [0,1,2,4,5,6,7]  →  [4,5,6,7,0,1,2]
//   - целое target
//
// Вернуть:
//   - индекс target, или -1 если элемента нет
//   - за O(log n)
//
// Примеры:
//   [4,5,6,7,0,1,2], target=0  →  4
//   [4,5,6,7,0,1,2], target=3  →  -1
//   [1], target=0              →  -1
//
// Сложность:
//   Время:  O(log n)
//   Память: O(1)
//
// Алгоритм: модифицированный бинарный поиск — одна половина всегда отсортирована.
//
// Ключ: на каждом шаге ОДНА половина (от left до mid ИЛИ от mid до right)
//       гарантированно отсортирована как обычный массив.
//
// Пример пошагово: nums = [4,5,6,7,0,1,2], target = 0
//
//   Шаг 1: left=0, right=6, mid=3, nums[mid]=7
//          nums[left]=4 <= nums[mid]=7 → левая половина [4,5,6,7] отсортирована
//          target=0 в диапазоне [4..7)? Нет → ищем справа: left=4
//
//   Шаг 2: left=4, right=6, mid=5, nums[mid]=1
//          nums[left]=0 <= nums[mid]=1 → левая [0,1] отсортирована
//          target=0 в [0..1)? Да (0 <= 0 < 1) → right=4
//
//   Шаг 3: left=4, right=4, mid=4, nums[mid]=0 === target → return 4

function search(nums, target) {
    // Границы текущего диапазона поиска (сужаем как в бинарном поиске)
    let left = 0;
    let right = nums.length - 1;

    let i = 0;

    // <= важно: когда left === right, остался один индекс — его тоже проверяем
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Шаг 1: середина — то, что ищем?
        if (nums[mid] === target) return mid;

        if (nums[left] <= nums[mid]) {
            // левая [left..mid] отсортирована
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // правая [mid..right] отсортирована
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    // Цикл закончился — диапазон пуст, target нет в массиве
    return -1;
}

// --- примеры ---

console.log(search([5, 6, 7, 8, 0, 1, 2, 3], 3)); // 4
// console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1  (3 нет в массиве)
// console.log(search([1], 0)); // -1
// console.log(search([1], 1)); // 0
// console.log(search([7, 8, 9, 0, 1, 2, 3], 1)); // 4

module.exports = { search };
