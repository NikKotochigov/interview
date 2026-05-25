/**
 * Задача: makeCounter — одна глобальная переменная и postfix ++ (Сбер / подготовка).
 */

// =============================================================================
// Задача
// =============================================================================
//
// Исходный код:
//
//   var makeCount = 0;
//   function makeCounter() {
//     return function() {
//       return makeCount++;
//     };
//   }
//
//   var counter = makeCounter();
//   var counter2 = makeCounter();
//   console.log( counter() );   // 0
//   console.log( counter() );   // 1
//   console.log( counter2() );  // 2
//   console.log( counter2() );  // 3
//
// Что будет выведено (по строкам): 0, 1, 2, 3

// =============================================================================
// Исправление и объяснение
// =============================================================================
//
// counter и counter2 — разные функции-замыкания, но обе читают одну и ту же глобальную makeCount.
// Один счётчик на все вызовы, порядок любых counter()/counter2() увеличивает его подряд.
//
// Постфиксный ++: выражение возвращает значение ДО инкремента (сначала вернуть, потом +1).
//
// Типичный «правильный» счётчик на замыкание — хранить счётчик в области makeCounter, не в global:
// let count = 0; return () => count++; — тогда у каждого вызова makeCounter() свой count.

var makeCount = 0;

function makeCounter() {
  return function () {
    return makeCount++;
  };
}

function demo() {
  const counter = makeCounter();
  const counter2 = makeCounter();
  console.log(counter()); // 0
  console.log(counter()); // 1
  console.log(counter2()); // 2
  console.log(counter2()); // 3
}

// demo();
