type Props = {
  text: string;
  onUpdate: (current: string) => void;
  onDone: () => void;
};

const CURSOR = "|";

export function typeWriterEffect({ text, onUpdate, onDone }: Props) {
  let i = 0; //indice da letra atual

  function type() {
    onUpdate(text.slice(0, i + 1) + CURSOR); //recortando o texto na posição i + 1
    i++;

    if (i < text.length) {
      setTimeout(type, 30);
    } else {
      setTimeout(onDone, 300);
    }
  }

  type();
}
