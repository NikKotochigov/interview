/**
 * memoize(asyncFn, ttlMs) — кэширование результата асинхронной функции на время.
 *
 * Идея простыми словами:
 * - первый вызов реально выполняет asyncFn и запоминает Promise/результат
 * - следующие вызовы в течение ttlMs возвращают то же значение (без повторного запроса)
 * - после истечения ttlMs — считаем кэш протухшим и выполняем asyncFn заново
 *
 * Важно:
 * - параллельные вызовы, пока первый ещё "в полёте", должны ждать один и тот же Promise
 * - если asyncFn упала с ошибкой — кэш не сохраняем (следующий вызов попробует снова)
 */

/**
 * @template T
 * @param {() => Promise<T>} asyncFn
 * @param {number} ttlMs
 * @returns {() => Promise<T>}
 */
function memoize(asyncFn, ttlMs) {
  let cachedPromise = null;
  let expiresAt = 0;

  return async function memoizedAsyncFn() {
    const now = Date.now();

    if (cachedPromise && now < expiresAt) {
      return cachedPromise;
    }

    expiresAt = now + ttlMs;

    cachedPromise = Promise.resolve()
      .then(() => asyncFn())
      .catch(err => {
        cachedPromise = null;
        expiresAt = 0;
        throw err;
      });

    return cachedPromise;
  };
}

// Самопроверка (node):
// let count = 0;
// const sleep = ms => new Promise(r => setTimeout(r, ms));
// const getData = async () => {
//   await sleep(500);
//   return ++count;
// };
// const getDataMemo = memoize(getData, 1000);
// (async () => {
//   console.log(await getDataMemo()); // 1
//   console.log(await getDataMemo()); // 1 (из кэша)
//   await sleep(1500);
//   console.log(await getDataMemo()); // 2 (кэш протух)
// })();

module.exports = { memoize };

