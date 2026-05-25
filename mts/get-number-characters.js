/**
 * getNumberCharacters(str) — для каждого уникального символа: количество + символ,
 * в порядке первого появления в строке.
 *
 * Пример: 'aaabbcagff' → '4a2b1c1g2f'
 */

const getNumberCharacters = (str) => {
  const counts = new Map();

  for (const ch of str) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  // Map сохраняет порядок вставки ключей; повторный set не меняет порядок.
  return [...counts.entries()].map(([ch, n]) => `${n}${ch}`).join("");
};

module.exports = { getNumberCharacters };

// const string = "aaabbcagff";
// console.log(getNumberCharacters(string)); // 4a2b1c1g2f
