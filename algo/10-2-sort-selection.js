// =============================================================================
// Условие задачи (сортировка — выбором)
// =============================================================================
//
// Дано:
//   - массив arr чисел
//
// Вернуть:
//   - тот же массив, отсортированный по возрастанию (in-place)
//
// Пример:
//   [5, 2, 1, 10, 8, 11]  →  [1, 2, 5, 8, 10, 11]
//
// Сложность:
//   Время:  O(n²)
//   Память: O(1)
//
// Алгоритм: selection sort — минимум в хвосте → на позицию i.
//
// Пример [5, 2, 11, 1, 10]:
//
// i=0 | ищем min в [5,2,11,1,10] → minIndex=3 (1) | swap → [1, 2, 11, 5, 10]
// i=1 | ищем min в [2,11,5,10]    → minIndex=1 (2) | swap не нужен
// i=2 | ищем min в [11,5,10]      → minIndex=3 (5) | swap → [1, 2, 5, 11, 10]
// i=3 | ищем min в [11,10]        → minIndex=4 (10)| swap → [1, 2, 5, 10, 11] ✓

const sortSelection = (arr) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        console.log(arr)
    }

    return arr
}

const arr = [5, 2, 1, 10, 8, 11];

console.log(sortSelection(arr));
