import React from "react";
import { motion, Transition, HTMLMotionProps } from "framer-motion";

interface IProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  options?: Transition;
  type?: "whileInView" | "animate";
}

function SlideInFromRight({
  children,
  duration = 0.8,
  style = {},
  options = {},
  type = "whileInView",
  ...motionProps
}: IProps) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      {...(type === "whileInView"
        ? { whileInView: { x: 0, opacity: 1 } }
        : { animate: { x: 0, opacity: 1 } })}
      transition={{ duration: duration, ease: "easeOut" }}
      {...motionProps}
      style={style}>
      {children}
    </motion.div>
  );
}

export default SlideInFromRight;
