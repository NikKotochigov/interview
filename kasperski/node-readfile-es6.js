/**
 * Review + переписать на ES6+
 *
 * Ошибки в исходнике со скрина:
 * - fs.readFile асинхронный, поэтому `return result` вернёт undefined (колбэк сработает позже)
 * - throw внутри колбэка не "вернёт" ошибку вызывающему коду синхронно
 *
 * Правильный подход: Promise API (fs/promises) + async/await.
 */

import { readFile } from "node:fs/promises";

/**
 * Асинхронно читает файл и возвращает содержимое.
 * @param {string} path
 * @param {BufferEncoding | null} [encoding]
 * @returns {Promise<string|Buffer>}
 */
export async function getFile(path, encoding = "utf8") {
  // Если encoding === null, readFile вернёт Buffer
  return await readFile(path, encoding === null ? undefined : { encoding });
}

// Пример:
// (async () => {
//   try {
//     const text = await getFile("./data.txt");
//     console.log(text);
//   } catch (e) {
//     console.error("read error:", e);
//   }
// })();

