// 1. Iterative approach using a for loop
var sum_to_n_a = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// 2. Mathematical formula (Gauss' formula)
var sum_to_n_b = function(n) {
  return (n * (n + 1)) / 2;
};

// 3. Functional approach using reduce()
var sum_to_n_c = function(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
};

// Test cases
console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15