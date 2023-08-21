const { formatNumber } = require("./formatNumber");

const numbersToNotify = [
  "554195354439", // Jefferson
  "5541985243845", // Igor
  // "5563992084934", // Alex 
  // Adicione outros números aqui
];

function notificarAtendentes(client, clientName) {
  for (const number of numbersToNotify) {
    const numberFormatted = formatNumber(number);

    try {
      client.sendMessage(
        numberFormatted,
        `Um novo cliente está esperando para ser atendido: ${clientName}`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { notificarAtendentes };

