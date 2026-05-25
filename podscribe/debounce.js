// debounce(fn, wait) — fn вызывается только после паузы wait мс
// при серии вызовов таймер сбрасывается; срабатывает последний вызов

function debounce(fn, wait) {
  let timeoutId = null;

  function wrapper(...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, wait);
  }

  wrapper.cancel = function cancel() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return wrapper;
}

module.exports = { debounce };
