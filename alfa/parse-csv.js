/**
 * Простой парсер CSV: первая строка — заголовки, пустые строки игнорируются.
 * Поля — split по запятой (запятые внутри значений не поддерживаются).
 */
function parse(csv) {
  const lines = csv
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row = {};
    headers.forEach((key, i) => {
      row[key] = (cells[i] ?? '').trim();
    });
    return row;
  });
}

module.exports = { parse };
