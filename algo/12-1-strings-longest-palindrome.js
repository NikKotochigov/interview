// =============================================================================
// Условие задачи (LeetCode 5 — Longest Palindromic Substring)
// =============================================================================
//
// Дано:
//   - строка s
//
// Вернуть:
//   - самую длинную подстроку-палиндром (читается одинаково слева и справа)
//
// Примеры:
//   "babad"  →  "bab" или "aba"
//   "cbbd"   →  "bb"
//   "a"      →  "a"
//   "ac"     →  "a"
//
// Сложность:
//   Время:  O(n²)
//   Память: O(1)
//
// Алгоритм: expand around center.
//
// Палиндром может быть:
//   - нечётной длины: центр — один символ (aba, центр b)
//   - чётной длины:   центр — между двумя символами (bb, центр между b|b)
//
// Для каждой позиции i расширяем влево/вправо и запоминаем лучший ответ.

/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  // expand(left, right) — расширение от центра, возвращает длину
  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // вышли за границы — реальная длина на 2 меньше
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    // нечётный: центр в i          (a)
    const lenOdd = expand(i, i);
    // чётный: центр между i и i+1  (a|a)
    const lenEven = expand(i, i + 1);

    const len = Math.max(lenOdd, lenEven);

    if (len > maxLen) {
      maxLen = len;
      // left после цикла = (i - len/2), но проще из формулы expand:
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.slice(start, start + maxLen);
}

// --- примеры ---

console.log(longestPalindrome('babad')); // "bab" или "aba"
console.log(longestPalindrome('cbbd')); // "bb"
console.log(longestPalindrome('a')); // "a"
console.log(longestPalindrome('ac')); // "a"

module.exports = { longestPalindrome };
