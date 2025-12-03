import React from "react";
import { motion, Transition, HTMLMotionProps } from "framer-motion";

interface IProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  options?: Transition;
  type?: "whileInView" | "animate";
}

function Opacity({
  children,
  duration = 0.8,
  style = {},
  options = {},
  type = "whileInView",
  ...motionProps
}: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      {...(type === "whileInView"
        ? { whileInView: { opacity: 1 } }
        : { animate: { opacity: 1 } })}
      transition={{ duration: duration, ease: "easeOut", ...options }}
      {...motionProps}
      style={style}>
      {children}
    </motion.div>
  );
}

export default Opacity;
