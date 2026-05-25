/**
 * Требуется выдать запрошенную сумму купюрами (от крупных к мелким).
 *
 * Дано:
 * - sum: число (сколько нужно выдать)
 * - limits: объект { номинал: количество } — лимит банкнот каждого номинала
 *
 * Нужно:
 * - вернуть объект { номинал: количество_выданных }, используя купюры от крупных к мелким
 * - или вернуть undefined, если выдать сумму невозможно
 *
 * Важно: простая жадная стратегия (взять максимум крупных) иногда НЕ работает,
 * поэтому используем поиск с ограничениями.
 */

function atm(sum, limits) {
  if (!Number.isFinite(sum) || sum < 0) return undefined;
  if (!limits || typeof limits !== 'object') return undefined;
  if (sum === 0) return {};

  const denoms = Object.keys(limits)
    .map(Number)
    .filter(d => Number.isFinite(d) && d > 0 && Number.isFinite(limits[d]) && limits[d] > 0)
    .sort((a, b) => b - a);

  // Быстрые отказы
  const maxPossible = denoms.reduce((acc, d) => acc + d * limits[d], 0);
  if (sum > maxPossible) return undefined;

  /** @type {Record<string, number> | null} */
  let best = null;

  function dfs(idx, remaining, picked) {
    if (remaining === 0) {
      best = { ...picked };
      return true;
    }
    if (idx >= denoms.length) return false;

    const d = denoms[idx];
    const maxCount = Math.min(limits[d], Math.floor(remaining / d));

    // Перебираем от большего к меньшему, чтобы решение получилось “крупнее → мельче”
    for (let k = maxCount; k >= 0; k--) {
      const nextRemaining = remaining - k * d;

      // Отсечение: даже если взять ВСЕ оставшиеся номиналы, не набираем сумму
      let restMax = 0;
      for (let j = idx + 1; j < denoms.length; j++) {
        const dd = denoms[j];
        restMax += dd * limits[dd];
      }
      if (nextRemaining > restMax) continue;

      if (k > 0) picked[d] = k;
      else delete picked[d];

      if (dfs(idx + 1, nextRemaining, picked)) return true;
    }

    delete picked[d];
    return false;
  }

  const ok = dfs(0, sum, Object.create(null));
  if (!ok || !best) return undefined;

  // Вернём в “красивом” порядке: от крупного к мелкому
  const result = Object.create(null);
  for (const d of denoms) {
    if (best[d] > 0) result[d] = best[d];
  }
  return result;
}

// Самопроверка (пример из скрина; номиналы могут быть любые)
// const limits = { 5000: 5, 1000: 20, 500: 25, 100: 10, 50: 20, 23: 10, 15: 5 };
// console.log(atm(12345, limits));

module.exports = { atm };

