function isValidIranianNationalCode(input) {
  if (!/^\d{10}$/.test(input)) return false;

  const check = +input[9];
  const sum =
    Array(9)
      .fill()
      .map((_, i) => +input[i] * (10 - i))
      .reduce((x, y) => x + y) % 11;
  return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}

module.exports = isValidIranianNationalCode;
