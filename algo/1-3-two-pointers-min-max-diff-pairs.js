// =============================================================================
// Условие задачи (олимпиадная — min/max разность пары)
// =============================================================================
//
// Дано:
//   - n и массив a[1..n] (в коде — 1-based индексы в ответе)
//
// Вернуть (две строки):
//   1) пару (i, j), i < j, где a[i] - a[j] минимальна
//      при равенстве — меньший i, затем меньший j
//   2) пару (i, j), i < j, где a[i] - a[j] максимальна
//      при равенстве — меньший i, затем меньший j
//
// Пример:
//   a = [2, 1, 3, 5, 2, 4]
//   min diff: i=2, j=4  →  1 - 5 = -4
//   max diff: i=4, j=5  →  5 - 2 = 3
//
// Сложность:
//   Время:  O(n)
//   Память: O(1)
//
// Алгоритм: один проход, для каждого j — лучший i слева.
//   min diff → i с минимальным a[i] (при равенстве — меньший индекс i)
//   max diff → i с максимальным a[i] (при равенстве — меньший индекс i)
//
// Пример [2, 1, 3, 5, 2, 4]:
//   min: i=2, j=4 → 1 - 5 = -4
//   max: i=4, j=5 → 5 - 2 = 3

const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');
const n = Number(input[0]);
const a = input[1].split(' ').map(Number);

let minDiff = Infinity;
let minPair = [1, 2];
let maxDiff = -Infinity;
let maxPair = [1, 2];

let minVal = a[0];
let minIdx = 1;
let maxVal = a[0];
let maxIdx = 1;

const betterMinPair = (i, j, diff) => {
    if (diff < minDiff) return true;
    if (diff > minDiff) return false;
    if (i < minPair[0]) return true;
    if (i > minPair[0]) return false;
    return j < minPair[1];
};

const betterMaxPair = (i, j, diff) => {
    if (diff > maxDiff) return true;
    if (diff < maxDiff) return false;
    if (i < maxPair[0]) return true;
    if (i > maxPair[0]) return false;
    return j < maxPair[1];
};

for (let j = 2; j <= n; j++) {
    const aj = a[j - 1];
    const diffMin = minVal - aj;
    const diffMax = maxVal - aj;

    if (betterMinPair(minIdx, j, diffMin)) {
        minDiff = diffMin;
        minPair = [minIdx, j];
    }

    if (betterMaxPair(maxIdx, j, diffMax)) {
        maxDiff = diffMax;
        maxPair = [maxIdx, j];
    }

    if (aj < minVal || (aj === minVal && j < minIdx)) {
        minVal = aj;
        minIdx = j;
    }

    if (aj > maxVal || (aj === maxVal && j < maxIdx)) {
        maxVal = aj;
        maxIdx = j;
    }
}

console.log(minPair.join(' '));
console.log(maxPair.join(' '));
