// Паттерн: хэш-счётчик + bucket sort (сортировка по частоте)
//
// Задача (LeetCode 451 Sort Characters By Frequency):
//   переставить символы строки так, чтобы чаще встречающиеся шли раньше.
//   "tree" → "eert" или "eetr" (e встречается 2 раза)
//
// Идея:
//   1. Map — частота каждого символа O(n)
//   2. freqList[freq] — «корзины»: в ячейке i лежат символы с частотой i
//   3. Обход корзин с конца (макс. частота → мин.) — собираем ответ
//
// Почему не sort по Map:
//   bucket sort здесь O(n), обычная сортировка O(n log n).
//
// Сложность: O(n) время, O(n) память.

// =============================================================================
// Условие задачи (LeetCode 451 — Sort Characters By Frequency)
// =============================================================================
//
// Дано:
//   - строка s из символов (латиница, цифры и т.д.)
//
// Нужно вернуть:
//   - новую строку из тех же символов, где более частые идут раньше
//   - при равной частоте порядок символов может быть любым
//
// Примеры:
//   "tree"   → "eert" или "eetr"  (e:2, t:1, r:1)
//   "cccaaa" → "aaaccc" или "cccaaa"
//   "Aabb"   → "bbAa" или "bbaA"  (регистр — разные символы)
//
// Паттерн по фреймворку (3-1): сортировка по частоте / top-k → KV → VK
//   KV: символ → частота,  VK: частота → список символов (корзины)
//
// =============================================================================

/**
 * @param {string} s
 * @returns {string}
 */
function frequencySort(s) {
  // 1. Считаем частоты
  const count = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    count.set(char, (count.get(char) || 0) + 1);
  }

  // 2. Корзины: индекс = частота, значение = массив символов с этой частотой
  const freqList = Array.from({ length: s.length + 1 }, () => []);
  for (const [char, freq] of count.entries()) {
    freqList[freq].push(char);
  }

  // 3. С конца freqList — сначала самые частые символы
  const result = [];
  for (let freq = freqList.length - 1; freq > 0; freq--) {
    for (let j = 0; j < freqList[freq].length; j++) {
      const char = freqList[freq][j];
      for (let i = 0; i < freq; i++) {
        result.push(char);
      }
    }
  }

  return result.join('');
}

// --- пример ---
//
// "tree" → t:1, r:1, e:2
// freqList[2] = ['e'], freqList[1] = ['t','r']
// результат: "ee" + "tr" или "ee" + "rt" → "eert" / "eetr"
//
console.log(frequencySort('tree')); // eetr (порядок t,r в корзине 1 может дать eert)

console.log(frequencySort('cccaaa')); // aaaccc или cccaaa

// --- визуально bucket sort ---
//
//   частота:  1    2    3
//   корзина: [t,r] [e]  []
//             ↑ обход с max freq вниз
//
// Связь: 3-1-hash-table-palindrome.js — тот же Map для подсчёта,
//        здесь + второй этап — упорядочивание по freq без sort().

module.exports = { frequencySort };
