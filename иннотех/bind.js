/**
 * bind — простая реализация для собеседования:
 * - привязывает `this`
 * - поддерживает частичные аргументы
 * - корректно ведёт себя с `new` (как нативный bind)
 */

function myBind(fn, thisArg, ...boundArgs) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');

  function bound(...callArgs) {
    const isNew = this instanceof bound; // вызвали через new?
    return fn.apply(isNew ? this : thisArg, [...boundArgs, ...callArgs]);
  }

  // чтобы `new bound()` создавал объект с прототипом fn.prototype
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);

  return bound;
}

// -----------------------------------------------------------------------------
// Упрощённый вариант как метод (часто пишут на собеседованиях)
// -----------------------------------------------------------------------------
// Важно: этот вариант НЕ повторяет поведение нативного bind при вызове через `new`.
Function.prototype.myBind = function (context, ...args) {
  // `this` — функция, на которой вызвали myBind
  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Пример:
// const obj = { x: 10 };
// function sum(a, b) { return this.x + a + b; }
// const f = myBind(sum, obj, 1);
// f(2) -> 13

