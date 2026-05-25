/**
 * Замыкание — простыми словами
 *
 * Функция «помнит» переменные из того места, где она была создана, даже если это место
 * уже отработало и снаружи к этим переменным не подступиться. У внутренней функции есть
 * связь с окружением (лексическое окружение): это не просто код, а код + скрытые переменные
 * родительской области видимости.
 */

function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const next = makeCounter();
// next(); // 1
// next(); // 2 — тот же count, снаружи до него нет доступа

// =============================================================================
// Ещё один классический пример: функция "помнит" x из outer()
// =============================================================================

const x = 20;

function outer() {
  let x = 0;
  return function inner() {
    x = x + 1;
    return x;
  };
}

const innerFunc = outer();
innerFunc();
innerFunc();

// console.log(innerFunc()); // 3
// console.log(x); // 20 (это глобальный x, он не менялся)

/**
 * Где полезно: приватное состояние без глобальных переменных — debounce, throttle,
 * счётчики, обработчики с «настройками», кеш на один колбэк.
 */

function debounce(fn, waitMs) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), waitMs);
  };
}

// const onResize = debounce(() => console.log("resize"), 200);
// window.addEventListener("resize", onResize);

module.exports = { makeCounter, debounce };
