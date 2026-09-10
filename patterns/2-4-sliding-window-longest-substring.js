// =============================================================================
// Условие задачи (LeetCode 3 — Longest Substring Without Repeating Characters)
// =============================================================================
//
// Дано:
//   - строка s
//
// Вернуть:
//   - длину самой длинной подстроки без повторяющихся символов
//     (подстрока = подряд идущие символы, не subsequence)
//
// Примеры:
//   "abcabcbb"  →  3   ("abc")
//   "bbbbb"     →  1
//   "pwwkew"    →  3   ("wke")
//
// Паттерн: скользящее окно переменной длины (пересекающиеся окна, 2-1 фреймворк)
//
// Сложность:
//   Время:  O(n) — l и r двигаются только вперёд
//   Память: O(min(n, |алфавит|)) — Map последних позиций символов
//
// Идея:
//   r расширяет окно; при повторе символа сдвигаем l сразу за его прошлую позицию
//   lastSeen — индекс последнего вхождения символа в текущем «валидном» окне

/**
 * @param {string} s
 * @returns {number}
 */
function lengthOfLongestSubstring(s) {
  let l = 0;
  let maxLen = 0;
  const lastSeen = new Map(); // символ → последний индекс в окне [l .. r]

  for (let r = 0; r < s.length; r++) {
    const ch = s[r];

    // повтор внутри окна — ужимаем левую границу (не шаг за шагом, а прыжком)
    if (lastSeen.has(ch) && lastSeen.get(ch) >= l) {
      l = lastSeen.get(ch) + 1;
    }

    lastSeen.set(ch, r);
    maxLen = Math.max(maxLen, r - l + 1);
  }

  return maxLen;
}

// --- примеры ---

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3

// --- прогон "abcabcbb" ---
//
//   r=0 'a'  окно [a]           len=1
//   r=1 'b'  [a,b]              len=2
//   r=2 'c'  [a,b,c]            len=3  max=3
//   r=3 'a'  повтор → l=1       [b,c,a] len=3
//   r=4 'b'  повтор → l=2       [c,a,b] len=3
//   r=5 'c'  повтор → l=3       [a,b,c] len=3
//   r=6 'b'  повтор → l=5       [c,b]   len=2
//   r=7 'b'  повтор → l=7       [b]     len=1
//
// Наивно: все подстроки O(n²) + Set на каждую → O(n³)
// Окно:   один проход, l только вперёд → O(n)

module.exports = { lengthOfLongestSubstring };
