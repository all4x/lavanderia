function formatNumber(number) {
  const numberDDI = number.substr(0, 2);
  const numberDDD = number.substr(2, 2);
  const numberUser = number.substr(-8, 8);
  let numberFinally;

  if (number <= 30) {
    numberFinally = numberDDI + numberDDD + "9" + numberUser + "@c.us";
  } else {
    numberFinally = numberDDI + numberDDD + numberUser + "@c.us";
  }
  return numberFinally;
}

module.exports = { formatNumber };
