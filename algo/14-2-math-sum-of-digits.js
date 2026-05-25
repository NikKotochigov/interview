// =============================================================================
// Условие задачи (Codewars — Sum of digits / digital root)
// =============================================================================
//
// Дано:
//   - натуральное число n
//
// Вернуть:
//   - однозначное число — сумма цифр, повторённая до одной цифры
//   - (digital root: 942 → 9+4+2=15 → 1+5=6)
//
// Примеры:
//   16      →  7
//   942     →  6
//   132189  →  9
//   493193  →  2
//
// Сложность:
//   sumOfDigits:  O(log n) за итерацию, до 10 итераций → O(log n)
//   sumOfDigits2: O(1)

/**
 * @param {number} n
 * @return {number}
 */
function sumOfDigits(n) {
    while (n >= 10) {
        let sum = 0;
        while (n > 0) {
            sum += n % 10;
            n = Math.floor(n / 10);
        }
        n = sum;
    }
    return n;
}

function sumOfDigits2(n) {
    return n === 0 ? 0 : 1 + ((n - 1) % 9);
}

console.log(sumOfDigits(16))
console.log(sumOfDigits(942))
console.log(sumOfDigits(132189))
console.log(sumOfDigits(493193))