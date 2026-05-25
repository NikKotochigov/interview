/**
 * Задача: setTimeout, new Promise с async-executor, вложенные промисы, await.
 *
 * Вывод в консоль (по порядку): 1, 2, 9, 7, 3, 8, 5, 6, 4, 0
 */

// =============================================================================
// Исходный код
// =============================================================================

const run = () => {
  setTimeout(() => console.log(0), 3000);

  console.log(1);

  new Promise(async (resolve, reject) => {
    console.log(2);
    resolve(3);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        new Promise((resolve, reject) => {
          reject(4);
          console.log(5);
        })
          .catch(console.log);
        console.log(6);
      }, 0);

      resolve(7);
    });

    await promise.then(console.log);

    console.log(8);
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

  console.log(9);
};

// =============================================================================
// Разбор
// =============================================================================
//
// Синхронно: log 1; в async-executor сразу log 2; resolve(3) помечает внешний
// промис выполненным, но .then((res) => console.log(res)) ещё НЕ привязан —
// выражение new Promise(...) ещё не закончило вычисляться.
// Дальше: внутренний промис синхронно resolve(7); await promise.then(console.log)
// ставит в микрозадачи вывод 7 и приостанавливает executor.
// new Promise возвращает объект; затем вешается .then — промис уже fulfilled,
// реакция на 3 ставится в микрозадачи ПОСЛЕ микрозадачи на 7. Потом log 9.
//
// Микрозадачи: 7, 3, затем продолжение async-executor → 8.
// Макрозадача setTimeout(0): sync reject(4)+log 5, .catch ставит log 4 в микрозадачи,
// sync log 6; затем микрозадача catch → 4.
// Макрозадача setTimeout(3000): 0.
//
// async-executor у new Promise — антипаттерн: ломает ожидаемый порядок resolve/then.

// run();
