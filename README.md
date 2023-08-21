**Bot de Atendimento para Lavanderia - Fluxo Simples**

Este repositório contém um bot de atendimento desenvolvido em Node.js (versão 18.17.0) e JavaScript, destinado a ser utilizado por lavanderias. O bot facilita o processo de atendimento ao cliente, oferecendo um fluxo simples e eficiente, e inclui notificações para atendimento manual quando necessário.

### Funcionalidades

- Fluxo de atendimento simplificado para lavanderias.
- Notificações para atendimento manual quando necessário.
- Fixação de contatos de clientes durante atendimento manual para evitar interrupções.

### Como Utilizar

1. Certifique-se de ter o Node.js na versão 18.17.0 instalado em sua máquina.
2. Clone este repositório para o seu ambiente local.
3. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install
```

4. Após a instalação das dependências, inicie o bot com o seguinte comando:

```bash
npm start
```

5. Para configurar os contatos que serão notificados para atendimento manual, acesse o arquivo `/utils/notificarAtendente.js` e siga as instruções de configuração.

### Funcionalidade de Fixação de Contatos

Quando o bot notificar um atendente manual, ele fixará o contato do cliente que está sendo atendido. Durante esse período de fixação, o bot ignorará as mensagens de outros clientes para garantir que o atendimento seja contínuo e sem interrupções. Uma vez que o atendimento manual seja concluído, o bot retornará ao fluxo normal de atendimento.

### Contato

Caso tenha alguma dúvida ou precise de suporte, sinta-se à vontade para entrar em contato conosco:

- Email: seuemail@example.com
- Telefone: (XX) XXXX-XXXX

### Contribuições

Contribuições para a melhoria deste bot são sempre bem-vindas. Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir um problema ou enviar um pull request.

### Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).

---

**Observação:** Certifique-se de ter configurado corretamente as notificações para atendimento manual, incluindo a funcionalidade de fixação de contatos. Adaptações adicionais podem ser necessárias para atender às suas necessidades individuais.

*Este é um projeto de exemplo e não garante total funcionalidade para todos os cenários de lavanderia. Modificações podem ser necessárias para atender às suas necessidades específicas. Para execução do bot em produção, recomendamos testes e ajustes adequados.*
