/**
 * Review кода со скрина (async + forEach)
 *
 * Проблема:
 * list.forEach(async (updater) => await updater(...))
 * - forEach НЕ ждёт промисы и не возвращает общий Promise
 * - поэтому doStorageUpdate завершится сразу, а апдейтеры продолжат выполняться в фоне
 *
 * Ниже — два корректных подхода:
 * 1) Параллельно: Promise.all
 * 2) Последовательно: for...of + await
 */

// Заглушка "обновлятора" (реальный updater уже дан в задаче)
const updater = async (storage, data) => {
  storage.push(data);
};

const list = [
  async (s, d) => updater(s, d),
  async (s, d) => updater(s, d),
  async (s, d) => updater(s, d),
];

// =============================================================================
// Вариант 1: параллельно (быстрее, если нет зависимостей между апдейтерами)
// =============================================================================
export async function doStorageUpdateParallel(storage, data) {
  await Promise.all(list.map((fn) => fn(storage, data)));
}

// =============================================================================
// Вариант 2: последовательно (если важен порядок/есть зависимости)
// =============================================================================
export async function doStorageUpdateSequential(storage, data) {
  for (const fn of list) {
    // eslint-disable-next-line no-await-in-loop
    await fn(storage, data);
  }
}

// Пример:
// (async () => {
//   const storage = [];
//   await doStorageUpdateParallel(storage, 123);
//   console.log(storage); // [123, 123, 123]
// })();

