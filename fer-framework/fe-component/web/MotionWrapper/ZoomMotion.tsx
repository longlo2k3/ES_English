import React from "react";
import { motion, Transition, HTMLMotionProps } from "framer-motion";
import { extend } from "lodash";

interface IProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  options?: Transition;
  type?: "whileInView" | "animate";
}

function ZoomMotion({
  children,
  duration = 0.8,
  style = {},
  options = {},
  type = "whileInView",
  ...motionProps
}: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      {...(type === "whileInView"
        ? { whileInView: { opacity: 1, scale: 1 } }
        : { animate: { opacity: 1, scale: 1 } })}
      transition={{ duration: duration, ease: "easeOut", ...options }}
      {...motionProps}
      style={style}>
      {children}
    </motion.div>
  );
}

export default ZoomMotion;
