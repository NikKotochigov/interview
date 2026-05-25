/**
 * Условие (задача со скрина)
 * =============================================================================
 * На вход — массив операций (date, amount).
 * Отсортировать операции по дате и сгруппировать по году.
 * Результат — объект: ключи — годы (строки), значения — массивы дат в формате MM-DD
 * (в порядке сортировки по полной дате).
 *
 * Пример структуры результата:
 *   {
 *     "2017": ["07-31", "08-22"],
 *     "2018": ["01-01", "02-22"],
 *   }
 */

const operations = [
  { date: '2017-07-31', amount: '1' },
  { date: '2017-06-30', amount: '1' },
  { date: '2017-05-31', amount: '1' },
  { date: '2017-08-31', amount: '1' },
  { date: '2017-09-30', amount: '1' },
  { date: '2018-03-31', amount: '1' },
  { date: '2017-10-31', amount: '1' },
  { date: '2017-12-31', amount: '1' },
  { date: '2018-01-31', amount: '1' },
  { date: '2017-11-30', amount: '1' },
  { date: '2018-02-28', amount: '1' },
  { date: '2018-04-14', amount: '1' },
];

/**
 * @param {{ date: string, amount?: string }[]} ops
 * @returns {Record<string, string[]>}
 */
function sortOperations(ops) {
  const sorted = [...ops].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  /** @type {Record<string, string[]>} */
  const result = {};

  for (const { date } of sorted) {
    const [y, m, d] = date.split('-');
    if (!result[y]) result[y] = [];
    result[y].push(`${m}-${d}`);
  }

  return result;
}

module.exports = { sortOperations, operations };
