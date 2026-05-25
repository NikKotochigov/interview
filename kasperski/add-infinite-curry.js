/**
 * Задача:
 * Написать функцию add, которая принимает число и может вызываться бесконечно:
 * пока не будет вызвана без аргументов — тогда возвращается сумма переданных ранее чисел.
 *
 * Примеры:
 * add(9)(10)() -> 19
 * add(9)() -> 9
 * add() -> 0
 */

function add(first) {
  let sum = typeof first === "number" ? first : 0;

  function next(n) {
    if (arguments.length === 0) return sum; // вызвали без аргументов -> вернуть сумму
    sum += n;
    return next;
  }

  // Если самый первый вызов был add() без аргументов — сразу вернуть 0
  if (arguments.length === 0) return 0;

  return next;
}

// console.log(add(9)(10)()); // 19
// console.log(add(9)()); // 9
// console.log(add()); // 0

module.exports = { add };

