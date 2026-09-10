// =============================================================================
// Задача (собес) — своя реализация Array.prototype.reduce
// =============================================================================
//
// myReduce(callback, initialValue?)
//   callback(acc, item, index, arr) → новый acc
//
// Если initialValue передан — старт с него, цикл с i = 0
// Если нет — acc = arr[0], цикл с i = 1
//
// Примеры:
//   [1, 2, 3, 4].myReduce((acc, n) => acc + n, 0)  →  10
//   [1, 2, 3, 4].myReduce((acc, n) => acc * n)     →  24

type ReduceCallback<T, U> = (
  acc: U,
  item: T,
  index: number,
  arr: readonly T[]
) => U;

// --- расширяем Array глобально, чтобы TS знал про myReduce ---

declare global {
  interface Array<T> {
    myReduce(callback: ReduceCallback<T, T>): T;
    myReduce<U>(callback: ReduceCallback<T, U>, initialValue: U): U;
  }
}

function myReduce<T, U>(
  this: readonly T[],
  callback: ReduceCallback<T, U>,
  initialValue?: U
): T | U {
  const hasInitial = arguments.length >= 2;

  let acc: T | U = hasInitial ? initialValue! : this[0];
  const start = hasInitial ? 0 : 1;

  for (let i = start; i < this.length; i++) {
    // acc: T | U — TS ругается, что U ожидается в cb; на runtime ок, cast для собеса
    acc = callback(acc as U, this[i], i, this);
  }

  return acc;
}

Array.prototype.myReduce = myReduce;

// --- пример из CodeSandbox: массив → объект name → age ---

const exampleData = [
  { name: "John", age: 22 },
  { name: "Jane", age: 25 },
];

const result = exampleData.myReduce(
  (acc, item) => {
    acc[item.name] = item.age; // ключ = name, значение = age
    return acc;
  },
  {} as Record<string, number>
);

// { John: 22, Jane: 25 }
// console.log("result", result);

// --- ошибка CodeSandbox: Argument of type 'T | U' is not assignable to 'U' ---
//
// Причина: acc = initValue (U) или this[0] (T) → тип acc = T | U
// Фикс 1: acc as U в вызове callback (см. цикл выше)
// Фикс 2: два overload у myReduce — с initialValue и без
// Фикс 3: declare global { interface Array<T> { ... } } + export {}

// --- отдельная функция (без prototype) — то же самое ---

export function reduce<T, U>(
  arr: readonly T[],
  callback: ReduceCallback<T, U>,
  initialValue: U
): U;
export function reduce<T>(
  arr: readonly T[],
  callback: ReduceCallback<T, T>
): T;
export function reduce<T, U>(
  arr: readonly T[],
  callback: ReduceCallback<T, U>,
  initialValue?: U
): T | U {
  // у функции 3-й аргумент = initialValue; у метода 2-й — не путаем undefined с «не передан»
  const list = arr as T[];
  if (arguments.length >= 3) {
    return list.myReduce(callback, initialValue as U);
  }
  return list.myReduce(callback as unknown as ReduceCallback<T, T>);
}

export {};

export { myReduce, exampleData, result };
