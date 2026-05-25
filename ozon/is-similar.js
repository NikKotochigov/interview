/**
 * Задача: проверить, «совпадают» ли два массива чисел.
 *
 * Под «совпадают» здесь обычно понимают: в массивах один и тот же набор чисел
 * (с учётом количества повторов), но порядок может быть любым.
 *
 * Примеры:
 * isSimilar([0, 1, 2], [2, 1, 0]) === true   // просто перестановка
 * isSimilar([0, 1],    [2, 1, 0]) === false  // разная длина → точно не совпадают
 * isSimilar([0, 5, 1], [0, 1, 5]) === true   // перестановка
 * isSimilar([1, 1, 2], [1, 2, 2]) === false  // разные количества чисел
 */

function isSimilar(arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  const count = {};

  for (let i = 0; i < arr1.length; i++) {
    count[arr1[i]] = (count[arr1[i]] || 0) + 1;
  }

  for (let i = 0; i < arr2.length; i++) {
    if (!(arr2[i] in count)) return false
    count[arr2[i]] -= 1;
    if (count[arr2[i]] === 0) delete count[arr2[i]]
  }

  return Object.keys(count) === 0;

}

function isSimilarMap(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const count = new Map();

  for (let i = 0; i < arr1.length; i++) {
    count.set(arr1[i], (count.get(arr1[i]) || 0) + 1);
    count.set(arr2[i], (count.get(arr2[i]) || 0) - 1);
  }

  for (const v of count.values()) {
    if (v !== 0) return false;
  }
  return true;
}

// Быстрая самопроверка (можно удалить)
// console.log(isSimilar([0, 1, 2], [2, 1, 0])); // true
// console.log(isSimilar([0, 1], [2, 1, 0])); // false
// console.log(isSimilar([0, 5, 1], [0, 1, 5])); // true

