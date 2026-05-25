// =============================================================================
// Условие задачи (классика — бинарный поиск)
// =============================================================================
//
// Дано:
//   - отсортированный по возрастанию массив arr
//   - целое target
//
// Вернуть:
//   - индекс элемента target в arr, или -1 если нет
//
// Примеры:
//   arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   target = 2   →  1
//   target = 11  →  -1
//
// Сложность:
//   Время:  O(log n)
//   Память: O(1)
//
// Алгоритм: два указателя left/right.

const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        if (arr[mid] > target) {
            right = arr[mid] -1 
        } else {
            left = arr[mid] + 1
        }
    }


    return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(binarySearch(arr, 2));
