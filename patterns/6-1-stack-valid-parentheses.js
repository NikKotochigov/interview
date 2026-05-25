// Паттерн: стек (Stack)
//
// LIFO — последний открытый скобкой закрываем первым.
// Подходит: вложенные пары, обратный порядок закрытия, «последний вошёл — первый вышел».

// =============================================================================
// Условие задачи (LeetCode 20 — Valid Parentheses)
// =============================================================================
//
// Дано:
//   - строка s из скобок: () [] {} <>  (в LC 20 обычно без <>, здесь с <>)
//
// Нужно вернуть:
//   - true, если скобки закрыты в правильном порядке и каждая открытая имеет пару
//   - false иначе
//
// Примеры:
//   "()[]{}"     → true
//   "(]"        → false
//   "([)]"      → false
//   "{[]}"      → true
//   "<>"        → true
//
// Алгоритм:
//   открывающая → push в стек
//   закрывающая → pop и проверить пару; пустой стек → false
//   в конце стек должен быть пуст
//
// Сложность: O(n) время, O(n) память (стек).
//
// =============================================================================

/**
 * @param {string} s
 * @returns {boolean}
 */
function isValid(s) {
  const stack = [];
  const mapping = new Map([
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
    ['<', '>'],
  ]);

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (mapping.has(char)) {
      // открывающая скобка
      stack.push(char);
    } else if (stack.length === 0) {
      // закрывающая без пары
      return false;
    } else {
      const lastChar = stack.pop();
      if (mapping.get(lastChar) !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

/**
 * @param {string} s
 * @returns {boolean}
 */
function isValid(s) {
  const stack = [];
  const mapping = new Map([
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
    ['<', '>'],
  ]);

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (mapping.has(char)) {
      stack.push(char)
    } else if (stack.length === 0) {
      return false
    } else {
      const lastChar = stack.pop();
      if (mapping.get(lastChar) !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}


// --- пример ---
//
// s = "{[()]}"
// { → stack ['{']
// [ → ['{','[']
// ( → ['{','[','(']
// ) → pop '(', пара ok
// ] → pop '[', ok
// } → pop '{', ok
// stack пуст → true
//
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
console.log(isValid('([)]')); // false
console.log(isValid('{[]}')); // true

module.exports = { isValid };
