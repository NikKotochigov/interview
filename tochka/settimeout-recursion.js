/**
 * setTimeout recursion (macrotask loop)
 */

function func1() {
  console.log(1);
  return setTimeout(func1); // планируем следующий вызов (macrotask)
}

func1(); // будет печатать 1 бесконечно, НЕ блокируя microtasks полностью

function func2() {
  console.log(2);
  return Promise.resolve().then(func2); // рекурсия через очередь microtasks
}

func2(); // 2 будет печататься бесконечно и "забьёт" event loop

