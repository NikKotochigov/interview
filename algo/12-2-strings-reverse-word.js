// =============================================================================
// Условие задачи (Codewars — Reverse words)
// =============================================================================
//
// Дано:
//   - строка sentence из слов, разделённых пробелами
//
// Вернуть:
//   - sentence, где каждое слово длиной ≥ 5 символов — перевернуто посимвольно
//   - слова короче 5 символов — без изменений
//
// Пример:
//   "Hey fellow warriors"  →  "yeH wollef sroirraw"
//   (Hey→yeH, fellow→wollef, warriors→sroirraw)
//
// Сложность:
//   Время:  O(n) — n длина строки
//   Память: O(n) — split/map/join

/**
 * @param {string} sentence
 * @return {string}
 */
function reverseWord(sentence) {
    return sentence
        .split(' ')
        .map((w) =>
            w.length >= 5 ? w.split('').reverse().join('') : w
        )
        .join(' ');
}

console.log(reverseWord("Hey fellow warriors"));