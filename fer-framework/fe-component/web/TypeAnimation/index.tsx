import React from "react";
import { TypeAnimation } from "react-type-animation";

interface SequenceItem {
  text: string;
  delay?: number;
}

interface IProps {
  sequence: SequenceItem[];
  styles?: React.CSSProperties;
  speed?: any;
}

function TypeAnimationWrapper({ sequence, styles, speed }: IProps) {
  const typeSequence = sequence.flatMap((item) => [
    item.text,
    item.delay ?? 1000,
  ]);

  return (
    <TypeAnimation
      sequence={typeSequence}
      wrapper="span"
      speed={speed ?? 50}
      repeat={Infinity}
      style={styles}
    />
  );
}

export default TypeAnimationWrapper;
