import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

export function LoadingMessage() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ".")); //se for menor q 3 pego o conteúdo e adiciono mais um ponto se Não reseto ele
    }, 400);

    return () => clearInterval(interval); //recomenda que limpemos o interval sempre
  }, []);

  return <Text style={styles.text}>{dots}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 18,
  },
});
