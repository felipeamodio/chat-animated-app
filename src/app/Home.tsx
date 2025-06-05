import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Message, MessageProps } from "../components/Message";
import { LoadingMessage } from "../components/LoadingMessage";
import { autoReply } from "../utils/autoReplies";
import { typeWriterEffect } from "../utils/typeWriterEffect";

type Feedback = {
  type: "loading" | "typing";
  text: string;
};

export function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [feedback, setFeedback] = useState<null | Feedback>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev, //todas as mensagens anteriores
      { id: Date.now().toString(), text: input, user: "me" },
    ]);

    setInput("");
    setIsMyTurn(false);
    setFeedback({ type: "loading", text: "" });

    const reply = await autoReply();
    setFeedback({ type: "typing", text: "" });

    typeWriterEffect({
      text: reply.text,
      onUpdate: (current) => setFeedback({ type: "typing", text: current }),
      onDone: () => {
        setMessages((prev) => [...prev, reply]); //vai puxar todas as mensagens anteriores + a mensagem que acabou de adicionar
        setFeedback(null);
        setIsMyTurn(true);
      },
    });
  }

  const displayMessages: MessageProps[] = //montar a mensagem que será exibida incluindo o feedback
    feedback && feedback.type === "typing"
      ? [
          //vai pegar todas as mensagens anteriores e adicionar mais uma
          ...messages,
          {
            id: Date.now().toString(),
            text: feedback.text,
            user: "other",
          },
        ]
      : messages;

  return (
    <View style={styles.container}>
      <FlatList
        data={displayMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Message message={item} />}
        style={styles.messages}
        ListFooterComponent={() =>
          feedback?.type === "loading" ? <LoadingMessage /> : null
        }
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
        />

        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Feather name="send" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37343A",
    paddingVertical: 52,
    paddingHorizontal: 24,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: "#454248",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
  },
  messages: {
    flex: 1,
    marginBottom: 10,
  },
  button: {
    height: 42,
    width: 42,
    backgroundColor: "#454248",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
