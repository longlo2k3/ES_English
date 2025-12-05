import React from "react";
import { motion, Transition, HTMLMotionProps } from "framer-motion";

interface IProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  options?: Transition;
  type?: "whileInView" | "animate";
}

function SlideInFromBottom({
  children,
  duration = 0.8,
  style = {},
  options = {},
  type = "whileInView",
  ...motionProps
}: IProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      {...(type === "whileInView"
        ? { whileInView: { y: 0, opacity: 1 } }
        : { animate: { y: 0, opacity: 1 } })}
      transition={{ duration: duration, ease: "easeOut", ...options }}
      {...motionProps}
      style={style}>
      {children}
    </motion.div>
  );
}

export default SlideInFromBottom;
