// =============================================================================
// Условие задачи (Codewars 6 kyu — Parts of a list)
// =============================================================================
//
// Дано:
//   - массив arr строк (слова)
//
// Вернуть:
//   - массив пар [левая часть, правая часть] для каждого разреза
//   - разрез после i-го слова: слова 0..i | слова i+1..конец
//   - части склеиваются через пробел
//
// Пример:
//   ["az", "toto", "picaro", "zone", "kiwi"]
//   → [
//       ["az", "toto picaro zone kiwi"],
//       ["az toto", "picaro zone kiwi"],
//       ["az toto picaro", "zone kiwi"],
//       ["az toto picaro zone", "kiwi"]
//     ]
//
// Сложность:
//   Время:  O(n² · L) — n слов, L средняя длина (slice + join)
//   Память: O(n² · L) — массив пар строк

function partlist(arr) {
    const result = [];

    for (let i = 0; i < arr.length - 1; i++) {
        result.push([
            arr.slice(0, i + 1).join(' '),
            arr.slice(i + 1).join(' '),
        ]);
    }
    return result;
}

console.log(partlist(["az", "toto", "picaro", "zone", "kiwi"]))