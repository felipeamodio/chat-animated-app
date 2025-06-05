type Reply = {
  id: string;
  text: string;
  user: "me" | "other";
};

const autoReplies: Reply[] = [
  { id: "1", text: "Olá! Como posso te ajudar?", user: "other" },
  { id: "2", text: "Que interessante, me conte mais!", user: "other" },
  { id: "3", text: "Entendi. Tem mais alguma dúvida?", user: "other" },
  { id: "4", text: "Legal!", user: "other" },
  { id: "5", text: "Pode repetir, por favor?", user: "other" },
];

export function autoReply(): Promise<Reply> {
  //Selecionar uma resposta aleatória
  const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

  //Simula uma Promise com 1s de delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reply);
    }, 1000);
  });
}
