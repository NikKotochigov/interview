// =============================================================================
// Условие задачи (Codewars 6 kyu — Pick Peaks)
// =============================================================================
//
// Дано:
//   - массив arr чисел
//
// Вернуть:
//   - объект { pos, peaks }
//   - pos  — индексы пиков
//   - peaks — значения на этих индексах
//
// Пик:
//   - слева строго ниже
//   - справа (после возможного плато) строго ниже
//   - индексы 0 и last не считаются
//   - плато: в ответ только начало (первый индекс плато после подъёма)
//
// Примеры:
//   [1, 2, 2, 2, 1]           →  { pos: [1], peaks: [2] }
//   [3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]  →  { pos: [3, 7], peaks: [6, 3] }
//
// Сложность:
//   Время:  O(n)
//   Память: O(k) — k число пиков в ответе
//
// Алгоритм: один проход.
//   если arr[i-1] < arr[i] — мы на подъёме / начале плато:
//     пропускаем равные справа, проверяем спад
//   иначе если оба соседа строго ниже — обычный пик

function pickPeaks(arr) {
    const pos = [];
    const peaks = [];

    for (let i = 1; i < arr.length - 1; i++) {
        const v = arr[i];

        if (v > arr[i - 1]) {
            let j = i + 1;

            while (j < arr.length && arr[j] === v) j++

            if (j < arr.length && v > arr[j]) {
                pos.push(i);
                peaks.push(arr[i])
            }
        }
        // Середина плато (arr[i-1] === v) и склон (arr[i-1] > v) — пропускаем
    }

    return { pos, peaks };
}

// --- вариант 2: сжать подряд идущие дубли, затем сравнить соседей ---
//
// [1, 2, 2, 2, 1] → [{ val: 1, pos: 0 }, { val: 2, pos: 1 }, { val: 1, pos: 4 }]
// В сжатом: 1 < 2 > 1 → пик, в ответ идёт pos: 1 (начало плато в исходнике)
//
// Плато обрабатывается автоматически: серия 2,2,2 → одна запись с pos первой двойки

function pickPeaksDedup(arr) {
    if (arr.length < 3) return { pos: [], peaks: [] };

    const runs = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === 0 || arr[i] !== arr[i - 1]) {
            runs.push({ val: arr[i], pos: i });
        }
    }

    const pos = [];
    const peaks = [];

    for (let i = 1; i < runs.length - 1; i++) {
        if (runs[i - 1].val < runs[i].val && runs[i].val > runs[i + 1].val) {
            pos.push(runs[i].pos);
            peaks.push(runs[i].val);
        }
    }

    return { pos, peaks };
}

// --- тесты ---

const tests = [
    [[3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3], { pos: [3, 7], peaks: [6, 3] }],
    [[1, 2, 2, 2, 1], { pos: [1], peaks: [2] }],
    [[1, 2, 2, 2, 3], { pos: [], peaks: [] }],
    [[1, 2, 2, 2, 2], { pos: [], peaks: [] }],
    [[0, 1, 2, 5, 1, 0], { pos: [3], peaks: [5] }],
];

for (const [input, expected] of tests) {
    const a = pickPeaks(input);
    const b = pickPeaksDedup(input);
    const ok = (x) => JSON.stringify(x) === JSON.stringify(expected);
    console.log('pickPeaks     ', ok(a) ? 'OK' : 'FAIL', input.slice(0, 6), '…', a);
    console.log('pickPeaksDedup', ok(b) ? 'OK' : 'FAIL', input.slice(0, 6), '…', b);
}

module.exports = { pickPeaks, pickPeaksDedup };
