// Паттерн: счётчик баланса (упрощённый Valid Parentheses)
//
// Работает ТОЛЬКО для одного типа скобок: ( )
// Без стека — O(1) память.
//
// Если скобок несколько видов () [] {} — нужен стек: 6-1-stack-valid-parentheses.js

// =============================================================================
// Условие задачи (LeetCode 20 — только круглые скобки)
// =============================================================================
//
// Дано:
//   - строка s из символов '(' и ')' и только они
//
// Нужно вернуть:
//   - true, если скобки сбалансированы и закрыты в правильном порядке
//   - false иначе
//
// Примеры:
//   "()"        → true
//   "(()())"    → true
//   ")("        → false  (balance < 0 на ')')
//   "(()"       → false  (в конце balance !== 0)
//
// Идея:
//   '(' → balance++
//   ')' → balance--
//   balance < 0 → лишняя ')'
//   в конце balance === 0
//
// Сложность: O(n) время, O(1) память.
//
// =============================================================================

/**
 * @param {string} s — только '(' и ')'
 * @returns {boolean}
 */
function isValid(s) {
  let balance = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '(') {
      balance++;
    } else {
      balance--;
    }

    if (balance < 0) {
      return false;
    }
  }

  return balance === 0;
}

// --- пример по шагам: "(()")" ---
//
// '(' → balance=1
// '(' → balance=2
// ')' → balance=1
// '(' → balance=2
// конец balance=2 !== 0 → false
//
console.log(isValid('()')); // true
console.log(isValid('(()())')); // true
console.log(isValid(')(')); // false
console.log(isValid('(()')); // false

module.exports = { isValid };
