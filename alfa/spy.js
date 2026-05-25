/**
 * Условие (задача со скрина, ES6 / Babel)
 * =============================================================================
 * Реализовать утилиту spy, которая принимает любую функцию и возвращает
 * «шпионскую» обёртку с тем же поведением при вызове, плюс методы для проверок.
 *
 * Пример:
 *   function foo(a) { return a; }
 *   const spyFoo = spy(foo);
 *   spyFoo('test');
 *
 * Требования к API обёртки:
 *   spyFoo.calledWith(arg) — true, если функция хотя бы раз вызывалась с этим
 *     аргументом (в примере после spyFoo('test') вызов calledWith('test') даёт true,
 *     calledWith('test123') — false).
 *   spyFoo.callCount() — сколько раз вызывали обёртку (после одного вызова — 1).
 *   spyFoo.returned(value) — true, если хотя бы один вызов вернул это значение
 *     (в примере returned('test') — true).
 *
 * Реализация (ниже): замыкание с массивом вызовов { args, returnValue }; вызов
 * оригинала через fn.apply(this, args), чтобы сохранить this; сравнения через ===.
 */

function spy(fn) {
  const calls = [];

  function wrapper(...args) {
    const returnValue = fn.apply(this, args);
    calls.push({ args, returnValue });
    return returnValue;
  }

  wrapper.callCount = () => calls.length;

  wrapper.calledWith = (...expected) =>
    calls.some(
      (c) =>
        c.args.length === expected.length &&
        c.args.every((a, i) => a === expected[i])
    );

  wrapper.returned = (value) => calls.some((c) => c.returnValue === value);

  return wrapper;
}

module.exports = spy;
