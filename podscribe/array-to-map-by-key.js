// =============================================================================
// Задача (собес / live coding)
// =============================================================================
//
// Дано:
//   - массив объектов { name: string, age: number }
//
// Вернуть:
//   - один объект: ключ = name, значение = age
//
// Пример:
//   [{ name: "John", age: 22 }, { name: "Jane", age: 25 }]
//   →  { John: 22, Jane: 25 }
//
// Сложность:
//   Время:  O(n)
//   Память: O(n) — новый объект

const exampleData = [
  { name: "John", age: 22 },
  { name: "Jane", age: 25 },
];

// --- вариант 1: reduce (часто ждут на собесе) ---

const result = exampleData.reduce((acc, item) => {
  // на каждом шаге добавляем пару name → age
  acc[item.name] = item.age;
  return acc; // тот же объект накапливаем дальше
}, {});

// --- вариант 2: Object.fromEntries (короче, тоже ок) ---
//
// const result = Object.fromEntries(
//   exampleData.map((item) => [item.name, item.age])
// );

console.log("result", result);
// { John: 22, Jane: 25 }

// --- по шагам reduce ---
//
// acc = {}
// item { name: "John", age: 22 }  →  acc = { John: 22 }
// item { name: "Jane", age: 25 }  →  acc = { John: 22, Jane: 25 }

module.exports = { result };
