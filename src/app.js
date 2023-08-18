const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { notificarAtendente } = require("../utils/notificarAtendente");
const { formatNumber } = require("../utils/formatNumber");

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "lavanderia" }),
  puppeteer: {
    args: ["--no-sandbox"],
    executablePath: "/usr/bin/google-chrome",
  },
});

const Steps = {
  GREETING: 0,
  STEP_ONE: 1,
  STEP_TWO: 2,
  STEP_THREE: 3,
};

// numero de quem vai ser notificado
// const number = "554195354439";
const number = "5563992084934";

const numberFormated = formatNumber(number);

const StepMessages = {
  [Steps.GREETING]:
    "Oie, tudo bem? Eu vim pelo site, e estou procurando um serviço para os meus calçados. Vocês podem me fornecer mais informações? Agradeço desde já!",
  [Steps.STEP_ONE]:
    "Seja bem-vindo à Trato Lavanderia de Calçados! Eu sou o Sr. Trato, e vou auxiliá-lo. Qual o seu nome, por favor?",
  [Steps.STEP_TWO]:
    `Ótimo {clientName} Escolhe um número de acordo com a sua necessidade.\n` +
    `[ 1 ] – Quero entender melhor os serviços de lavanderia \n` +
    `[ 2 ] – Quero fazer um orçamento\n` +
    "[ 3 ] – Quero enviar o meu calçado para lavar, como faço?",
  [Steps.STEP_THREE]:
    "Excelente! Qual é o seu endereço para que possamos providenciar a coleta?",
};

const userStates = new Map();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const chat = await msg.getChat();

  if (msg.fromMe || chat.isGroup || !chat.lastMessage) {
    return;
  }

  const user = msg.from;

  let userState = userStates.get(user) || Steps.GREETING;

  HandleProcess(msg, chat, userState);
});

async function HandleProcess(msg, chat, userState) {
  const user = msg.from;
  const respostaUsuario = msg.body; // Obtenha a resposta do usuário
  const lastMessage = chat.lastMessage;
  const clientName =
    lastMessage && lastMessage._data && lastMessage._data.notifyName
      ? lastMessage._data.notifyName
      : "Cliente";

  switch (userState) {
    case Steps.GREETING:
      // Processar a saudação do usuário
      // Avançar para a próxima etapa
      userStates.set(user, Steps.STEP_ONE);
      clientName, client.sendMessage(user, StepMessages[Steps.STEP_ONE]);
      break;

    case Steps.STEP_ONE:
      // Processar o nome do usuário
      // Avançar para a próxima etapa
      userStates.set(user, Steps.STEP_TWO);
      client.sendMessage(
        user,
        StepMessages[Steps.STEP_TWO].replace("{clientName}", clientName),
      );
      break;

    case Steps.STEP_TWO:
      // Processar a escolha do usuário
      if (respostaUsuario === "1") {
        // O usuário quer saber sobre serviços
        client.sendMessage(msg.from, "Veja Mais Sobre nossos serviços👇");
        const media = await MessageMedia.fromUrl(
          "https://raw.githubusercontent.com/all4x/lavanderia/main/trato.png",
        );
        await client.sendMessage(msg.from, media);
        msg.reply(`Saiba mais nesse video!` + `: linkdovideo`);

        // Avançar para a próxima etapa
        userStates.set(user, Steps.STEP_THREE);
        client.sendMessage(user, StepMessages[Steps.STEP_THREE]);
      } else if (respostaUsuario === "2") {
        // O usuário quer fazer uma consulta

        client.sendMessage(
          msg.from,
          "Veja Mais Sobre como fazer um orçamento👇",
        );
      } else if (respostaUsuario === "3") {
        // O usuário quer enviar sapatos para limpeza

        await client.sendMessage(
          msg.from,
          "Em breve, um de nossos atendentes entrará em contato com você. Por favor, aguarde.",
        );
        notificarAtendente(numberFormated, client, clientName);
        // Lidar de acordo e avançar, se necessário
      } else {
        // Escolha inválida, pedir novamente ou fornecer orientação
        client.sendMessage(
          user,
          "Escolha inválida. Por favor, selecione uma opção válida.",
        );
      }
      break;

    case Steps.STEP_THREE:
      // Processar o endereço do usuário
      // Avançar para a próxima etapa ou finalizar a conversa
      // ...

      // Se a conversa estiver completa, redefina o estado do usuário
      // userStates.delete(user);
      break;

    // ... (outros casos)

    default:
      // Lidar com estado de usuário inesperado
      client.sendMessage(msg.from, "Ops, algo deu errado.");
      break;
  }
}
client.initialize();
