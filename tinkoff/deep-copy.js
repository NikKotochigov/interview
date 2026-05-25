/**
 * Реализуйте функцию deepCopy (глубокое копирование) для объекта в JavaScript.
 *
 * Ограничения задачи:
 * - Типы: примитивы, объекты и массивы
 * - Считаем вход POJO (plain old js object): прототип и конструктор игнорируем
 * - Циклических ссылок нет
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
function deepCopy(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepCopy(item))
  }

  const out = {};
  for (const key of Object.keys(value)) {
    out[key] = deepCopy(value[key]);
  }
  return out;

}

// Примеры самопроверки:
// const src = { a: 1, b: { c: 2 }, d: [1, { x: 3 }, [4]] };
// const copy = deepCopy(src);
// copy.b.c = 999;
// copy.d[1].x = 777;
// console.log(src.b.c); // 2
// console.log(src.d[1].x); // 3
// console.log(copy !== src, copy.b !== src.b, copy.d !== src.d); // true true true

module.exports = { deepCopy };
