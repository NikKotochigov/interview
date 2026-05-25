// =============================================================================
// Условие задачи (сортировка — быстрая, с новыми массивами)
// =============================================================================
//
// Дано:
//   - массив arr чисел
//
// Вернуть:
//   - новый массив, отсортированный по возрастанию
//
// Пример:
//   [5, 2, 11, 1, 10]  →  [1, 2, 5, 10, 11]
//
// Сложность:
//   Время:  O(n log n) в среднем, O(n²) в худшем
//   Память: O(n) — новые массивы left/right на каждом уровне
//
// Алгоритм: quick sort — pivot, left/right, рекурсия; не in-place.
//
// Пример [5, 2, 11, 1, 10]:
//
// Уровень 1 | pivot=11 (индекс 2)
//   left=[5,2,1,10]  right=[]  →  sortQuick(left) + 11 + []
//
// Уровень 2 | [5,2,1,10], pivot=1
//   left=[]  right=[5,2,10]  →  [] + 1 + sortQuick([5,2,10])
//
// Уровень 3 | [5,2,10], pivot=2
//   left=[]  right=[5,10]  →  [] + 2 + sortQuick([5,10])
//
// Уровень 4 | [5,10], pivot=10
//   left=[5]  right=[]  →  sortQuick([5]) + 10 + []  →  [5] + [10]
//
// Сборка снизу вверх:
//   [5,10] → [2,5,10] → [1,2,5,10] → [1,2,5,10,11] ✓

const sortQuick = (arr) => {
    if (arr.length <= 1) return arr;

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue;

        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...sortQuick(left), pivot, ...sortQuick(right)];
};

const arr = [5, 2, 11, 1, 10];

console.log(sortQuick(arr));
