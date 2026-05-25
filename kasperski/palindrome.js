/**
 * Палиндром — строка, которая читается одинаково слева направо и справа налево.
 * Пример: "abba", "level".
 *
 * Задача: написать isPalindrom(str) -> boolean
 */

function isPalindrom(str) {
  const s = String(str);
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    if (s[i] !== s[j]) return false;
    i += 1;
    j -= 1;
  }

  return true;
}

// Примеры:
// console.log(isPalindrom("abba")); // true
// console.log(isPalindrom("abca")); // false

module.exports = { isPalindrom };

