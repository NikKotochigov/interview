/**
 * Полифилл Array.prototype.some (упрощённый).
 *
 * Идея:
 * - идём по индексам от 0 до length-1
 * - пропускаем "дыры" (проверка `i in arr`)
 * - вызываем callback со стандартной сигнатурой (value, index, arrayLike)
 * - если callback вернул truthy хотя бы раз — возвращаем true и выходим
 * - иначе возвращаем false
 *
 * Параметры:
 * - fn(value, index, arr) — функция-предикат
 *
 * Примеры:
 *   [2, 5, 8, 1, 4].some((x) => x > 10)  // false
 *   [12, 5, 8, 1, 4].some((x) => x > 10) // true
 *   new Array(3).some(() => true)        // false (колбэк не вызовется из-за дыр)
 */
if (!Array.prototype.some) {
  Array.prototype.some = function (fn) {
    if (this == null) throw new TypeError('Array.prototype.some called on null or undefined');
    if (typeof fn !== 'function') throw new TypeError('callback is not a function');

    // Приводим this к объекту: some работает и с array-like, не только с массивами.
    const arr = Object(this);
    for (let i = 0; i < arr.length; i += 1) {
      // `i in arr` — пропускаем "дыры" (элементы, которых нет, но length большой).
      if (i in arr && fn(arr[i], i, arr)) return true;
    }
    return false;
  };
}

