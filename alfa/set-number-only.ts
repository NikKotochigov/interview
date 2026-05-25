/**
 * Задача со скрина: типизировать Set так, чтобы он принимал только числа.
 * add(42) — ок; add('42') — должна быть ошибка типов.
 */

// Было: const numberSet = new Set();
const numberSet = new Set<number>();

// OK
numberSet.add(42);

// Ошибка типизации (ниже намеренно подавляем, чтобы файл компилировался в репо):
// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'.
numberSet.add('42');

export { numberSet };
