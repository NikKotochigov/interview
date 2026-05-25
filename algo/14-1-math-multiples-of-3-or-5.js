// =============================================================================
// Условие задачи (Codewars / Project Euler #1 — Multiples of 3 or 5)
// =============================================================================
//
// Дано:
//   - целое n
//
// Вернуть:
//   - сумму всех чисел СТРОГО МЕНЬШЕ n, кратных 3 или 5
//   - кратные 15 считаются один раз
//   - n < 0 → 0
//
// Примеры:
//   n=10   →  23  (3+5+6+9)
//   n=15   →  45  (15 не входит, т.к. i < n)
//   n=-5   →  0
//
// Сложность:
//   solution:     O(n) время, O(1) память
//   solutionFast: O(1) время, O(1) память
//
// Алгоритм: перебор или формула арифметической прогрессии.
// Для больших n можно формулами сумм арифметических прогрессий — O(1).

function solution(n) {
  if (n < 0) return 0;

  let sum = 0;

  // i < n, не включая само n (для 10 берём 0..9, кратные: 3,5,6,9)
  for (let i = 0; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
    // i % 15 === 0 попадает в оба условия, но || срабатывает один раз — суммируем один раз
  }

  return sum;
}

// --- вариант O(1): сумма кратных 3 + кратных 5 − кратных 15 (включились дважды) ---

function sumMultiplesBelow(limit, step) {
  // последнее кратное строго меньше limit: step * k, где k = floor((limit-1)/step)
  const last = Math.floor((limit - 1) / step) * step;
  if (last <= 0) return 0;
  const count = last / step;
  return (step + last) * count / 2; // сумма арифметической прогрессии
}

function solutionFast(n) {
  if (n < 0) return 0;
  return (
    sumMultiplesBelow(n, 3) +
    sumMultiplesBelow(n, 5) -
    sumMultiplesBelow(n, 15)
  );
}

// --- примеры ---

console.log(solution(10)); // 23  → 3+5+6+9
console.log(solution(-5)); // 0
console.log(solution(15)); // 45 → 3+5+6+9+10+12 (15 не входит, т.к. i < 15)

console.log(solutionFast(10)); // 23
console.log(solutionFast(15)); // 45

module.exports = { solution, solutionFast };
