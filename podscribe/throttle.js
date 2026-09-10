// throttle(fn, wait) — не чаще раза в wait мс
// leading: первый вызов сразу
// trailing: если звонили в окне — ещё раз после паузы (рекурсия в setTimeout)

function throttle(fn, wait) {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  function wrapper(...args) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    fn.apply(this, args);
    isThrottled = true;

    setTimeout(function tick() {
      isThrottled = false;

      if (savedArgs) {
        fn.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
        isThrottled = true;
        setTimeout(tick, wait); // рекурсия: снова ждём окно
      }
    }, wait);
  }

  return wrapper;
}

module.exports = { throttle };


// function throttle(func, limit) {
//   let inThrottle;
  
//   return function(...args) {
//     if (!inThrottle) {
//       func.apply(this, args);
//       inThrottle = true;
      
//       setTimeout(() => inThrottle = false, limit);
//     }
//   };
// }
