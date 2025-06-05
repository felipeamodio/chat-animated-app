import { StyleSheet, Text, View } from "react-native";

type MessageProps = {
  id: string;
  text: string;
  user: "me" | "other";
};

function Message({ message }: { message: MessageProps }) {
  return (
    <View
      style={[styles.message, message.user === "me" ? styles.me : styles.other]}
    >
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: "80%",
  },
  text: {
    color: "#FFFFFF",
  },
  me: {
    backgroundColor: "#444146",
    alignSelf: "flex-end",
  },
  other: {
    alignSelf: "flex-start",
  },
});

export { MessageProps, Message };
