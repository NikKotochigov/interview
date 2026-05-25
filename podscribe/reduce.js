// reduce(arr, callback, initialValue?)
// callback(acc, item, index, arr)

// Array.prototype.myReduce = function (callback, initialValue) {
//   return reduce(this, callback, initialValue);
// };

function reduce(arr, callback, initialValue) {
  const hasInitial = arguments.length >= 3;

  let acc = hasInitial ? initialValue : arr[0];
  let start = hasInitial ? 0 : 1;

  for (let i = start; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }

  return acc;
}

// [1, 2, 3, 4].reduce((acc, n) => acc + n, 0)  → 10
// [1, 2, 3, 4].reduce((acc, n) => acc * n)     → 24 (acc = arr[0])

module.exports = { reduce };
