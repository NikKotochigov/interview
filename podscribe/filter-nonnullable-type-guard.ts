/**
 * TypeScript: filter + type guard — убрать null из типа без `as`
 *
 * Вопрос с собеса:
 *   const arr1 = [1, 2, null, 3]
 *   const arr2 = arr1.filter((item) => item !== null)
 *
 *   arr1 → (number | null)[]
 *   arr2 → (number | null)[]  ← TypeScript НЕ сужает тип после filter
 *
 * Почему: callback filter не type predicate, TS не знает, что null убрали в runtime.
 */

// =============================================================================
// Проблема
// =============================================================================

const arr1 = [1, 2, null, 3];
// arr1: (number | null)[]

const arr2Bad = arr1.filter((item) => item !== null);
// arr2Bad: (number | null)[]  — всё ещё с null в типе

// arr2Bad.forEach((n) => n.toFixed(1)); // ошибка: n может быть null

// =============================================================================
// Решение: type predicate (type guard) — без `as`
// =============================================================================

function isNonNullable<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null;
}

const arr2 = arr1.filter(isNonNullable);
// arr2: number[]  ← compile-time понял, что null отфильтрован

arr2.forEach((n) => n.toFixed(1)); // ok

// =============================================================================
// Как это работает
// =============================================================================
//
// Сигнатура `value is T` говорит компилятору:
//   если функция вернула true → value имеет тип T (не null и не undefined)
//
// filter с type guard сужает тип массива:
//   (number | null)[]  →  number[]
//
// =============================================================================
// Альтернативы
// =============================================================================
//
// 1. Встроенный NonNullable<T> — только тип, не runtime:
//    type A = NonNullable<number | null>; // number
//
// 2. filter(Boolean) — тоже НЕ сужает до number[] (Boolean не type guard)
//
// 3. as number[] — работает, но обход системы типов (на собесе хуже type guard)
//
// 4. Inline type guard:
//    arr1.filter((x): x is number => x !== null)

export { isNonNullable, arr1, arr2 };
