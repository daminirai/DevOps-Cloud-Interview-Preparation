function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function isPrime(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 2) {
    return false;
  }

  if (number === 2) {
    return true;
  }

  if (number % 2 === 0) {
    return false;
  }

  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

module.exports = {
  add,
  subtract,
  multiply,
  isPrime,
};
