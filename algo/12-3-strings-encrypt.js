// =============================================================================
// Условие задачи (Codewars 6 kyu — Encrypt / Decrypt)
// =============================================================================
//
// Дано:
//   - строка text
//   - целое n — число шагов
//
// Один шаг encrypt:
//   символы с нечётными индексами (1,3,5…) + с чётными (0,2,4…)
//   "012345" → "135" + "024" → "135024"
//
// Вернуть:
//   - encrypt(text, n)  — применить шаг n раз
//   - decrypt(text, n)  — обратная операция n раз
//   - если text пустой или n <= 0 → text без изменений
//
// Примеры:
//   encrypt("012345", 1)  →  "135024"
//   encrypt("012345", 2)  →  "304152"
//   encrypt("012345", 3)  →  "012345"
//   decrypt("135024", 1)  →  "012345"
//
// Сложность:
//   Время:  O(n · k) — k шагов encrypt/decrypt, каждый O(n)
//   Память: O(n) — строки odd/even

function encryptStep(text) {
  let odd = '';
  let even = '';

  for (let i = 0; i < text.length; i++) {
    if (i % 2 === 1) {
      odd += text[i]; // индексы 1, 3, 5…
    } else {
      even += text[i]; // индексы 0, 2, 4…
    }
  }

  return odd + even;
}

function decryptStep(encrypted) {
  const len = encrypted.length;
  // длина «нечётной» части: индексы 1,3,… → floor(len / 2)
  const oddLen = Math.floor(len / 2);

  const oddPart = encrypted.slice(0, oddLen);
  const evenPart = encrypted.slice(oddLen);

  let original = '';
  let o = 0;
  let e = 0;

  for (let i = 0; i < len; i++) {
    if (i % 2 === 1) {
      original += oddPart[o++];
    } else {
      original += evenPart[e++];
    }
  }

  return original;
}

function encrypt(text, n) {
  if (!text || n <= 0) return text;

  let result = text;
  for (let k = 0; k < n; k++) {
    result = encryptStep(result);
  }
  return result;
}

function decrypt(encryptedText, n) {
  if (!encryptedText || n <= 0) return encryptedText;

  let result = encryptedText;
  for (let k = 0; k < n; k++) {
    result = decryptStep(result);
  }
  return result;
}

// --- примеры из условия ---

console.log(encrypt('012345', 1)); // 135024
console.log(encrypt('012345', 2)); // 304152
console.log(encrypt('012345', 3)); // 012345

console.log(decrypt('135024', 1)); // 012345
console.log(decrypt('304152', 2)); // 012345

module.exports = { encrypt, decrypt, encryptStep, decryptStep };
