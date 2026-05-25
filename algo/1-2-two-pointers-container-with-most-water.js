// =============================================================================
// Условие задачи (LeetCode 11 — Container With Most Water)
// =============================================================================
//
// Дано:
//   - массив height длины n, height[i] — высота вертикальной линии на оси x=i
//   - две линии вместе с осью X образуют контейнер
//
// Вернуть:
//   - максимальную площадь воды, которую может вместить контейнер
//   - площадь = min(height[i], height[j]) * (j - i), i < j
//
// Примеры:
//   [1, 8, 6, 2, 5, 4, 8, 3, 7]  →  49
//   [1, 1]                       →  1
//
// Сложность:
//   Время:  O(n)
//   Память: O(1)
//
// Алгоритм: два указателя с концов.

/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let max = 0;
    let left = 0;
    let right = height.length - 1;
    let result = 0;

    while (left < right) {

        max = Math.min(height[left], height[right]) * (right - left);
        result = Math.max(max, result);

        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }

    return result;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));