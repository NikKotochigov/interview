/**
 * debounce — вызывает fn не чаще, чем раз в wait мс; при серии вызовов
 * срабатывает только после паузы длительностью wait (последний аргумент выигрывает).
 *
 * @template {(...args: any[]) => any} F
 * @param {F} fn
 * @param {number} wait
 * @returns {F & { cancel: () => void }}
 */
function debounce(fn, wait) {
  let timeoutId = null;

  /** @type {F & { cancel: () => void }} */
  const debounced = function debounced(...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, wait);
  };

  debounced.cancel = function cancel() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

module.exports = { debounce };

/**
 * Разница this: arrow vs function
 *
 * const myCat = {
 *   sound: "meow",
 *   say: () => console.log(this.sound),
 *   say2: function () { console.log(this.sound); },
 * };
 *
 * myCat.say();  // undefined
 * myCat.say2(); // "meow"
 *
 * Почему:
 * - arrow-функция НЕ имеет своего this и берёт его из внешней области видимости
 *   (в модуле/скрипте это не объект myCat), поэтому this.sound -> undefined.
 * - function имеет this, зависящий от способа вызова: myCat.say2() задаёт this = myCat.
 */
