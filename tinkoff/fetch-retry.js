/**
 * fetchRetry(url, retries, delay) — отправка HTTP-запросов через Fetch API с ретраями.
 *
 * Контракт (типичная трактовка для интервью):
 * - retries: число повторных попыток ПОСЛЕ первой (т.е. всего 1 + retries)
 * - delay: задержка между попытками в мс
 * - если fetch зарезолвился с ok=true — вернуть response
 * - иначе (network error или response.ok=false) — повторить, либо пробросить ошибку
 *
 * @param {string} url
 * @param {number} retries
 * @param {number} delay
 * @returns {Promise<Response>}
 */
async function fetchRetry(url, retries, delay = 300) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (i < retries) await sleep(delay);
  }

  throw lastError ?? new Error('fetchRetry failed');
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Самопроверка (в браузере):
// fetchRetry('https://rickandmortyapi.com/api/character', 5, 300)
//   .then(r => r.json())
//   .then(console.log)
//   .catch(console.error);

module.exports = { fetchRetry, sleep };

