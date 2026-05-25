/**
 * Условие задачи (со скрина)
 * =============================================================================
 * Исходная функция (слабая типизация):
 *
 *   const arrayFromKeys = (obj: Record<string, any>, keys: string[]) => {
 *     const out = [];
 *     for (const key of keys) {
 *       out.push(obj[key]);
 *     }
 *     return out;
 *   };
 *
 * Пример объекта:
 *   const obj = { a: 1, b: 'B', 'c d': null };
 *
 * Проблемы, которые нужно исправить типами:
 *   1) arrayFromKeys(obj, ['z']) — ключ 'z' в obj нет, но string[] это пропускает;
 *      нужно, чтобы была ошибка типизации.
 *   2) const result = arrayFromKeys(obj, ['c d', 'a']);
 *      сейчас result получается any[]; нужно сузить тип до значений по выбранным
 *      ключам (и желательно сохранить подсказки IDE по порядку ключей).
 *
 * Решение ниже (простой вариант): K — только keyof T, возврат T[K][] — массив
 * значений по выбранным ключам (тип элемента — объединение, не any[]).
 * Порядок элементов в рантайме совпадает с keys; тип позиции [0], [1] так не сужает.
 */

const obj = {
  a: 1,
  b: 'B',
  'c d': null,
} as const;

function arrayFromKeys<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): T[K][] {
  return keys.map((k) => obj[k]);
}

// Ошибка: 'z' не ключ obj
// @ts-expect-error Type '"z"' is not assignable to type ...
arrayFromKeys(obj, ['z']);

// result: (number | null)[] — не [null, number], зато без приведений типов
const result = arrayFromKeys(obj, ['c d', 'a']);

export { arrayFromKeys, obj, result };
