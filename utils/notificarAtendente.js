function notificarAtendente(number, client, clientName) {
  try {
    client.sendMessage(
      number,
      `Um novo cliente está esperando para ser atendido : ${clientName}`,
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = { notificarAtendente };
