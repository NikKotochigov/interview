// =============================================================================
// Условие задачи (сортировка — быстрая, схема Хоара, in-place)
// =============================================================================
//
// Дано:
//   - массив arr чисел
//
// Вернуть:
//   - тот же массив, отсортированный по возрастанию (in-place)
//
// Пример:
//   [5, 2, 11, 1, 10]  →  [1, 2, 5, 10, 11]
//
// Сложность:
//   Время:  O(n log n) в среднем, O(n²) в худшем
//   Память: O(log n) — стек рекурсии (in-place)
//
// Алгоритм: quick sort (Hoare partition).
//
// Пример [5, 2, 11, 1, 10] (индексы 0..4):
//
// partition(0,4) | pivot=11 | swap 11↔10 → [5,2,10,1,11] | return j=3
//   → sortQuickHoare(0,3) и sortQuickHoare(4,4)
//
// partition(0,3) | pivot=2  | swap 5↔1  → [1,2,10,5,11] | return j=1
//   → sortQuickHoare(0,1) и sortQuickHoare(2,3)
//
// partition(0,1) | pivot=1  | без swap  | return j=0
// partition(2,3) | pivot=10 | swap 10↔5 → [1,2,5,10,11] | return j=2
//
// Итог: [1, 2, 5, 10, 11] ✓

const partition = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    let i = left - 1;
    let j = right + 1;

    while (true) {
        do {
            i++;
        } while (arr[i] < pivot);

        do {
            j--;
        } while (arr[j] > pivot);

        if (i >= j) return j;

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

const sortQuickHoare = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;

    const pivotIndex = partition(arr, left, right);

    sortQuickHoare(arr, left, pivotIndex);
    sortQuickHoare(arr, pivotIndex + 1, right);
};

const arr = [5, 2, 11, 1, 10];

sortQuickHoare(arr);
console.log(arr);
