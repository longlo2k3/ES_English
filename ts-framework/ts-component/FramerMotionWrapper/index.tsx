import React from "react";
import {
  LegacyAnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
  HTMLMotionProps,
} from "framer-motion";

interface IProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration: number;
  style?: React.CSSProperties;
  transition?: Transition;
  animate:
    | boolean
    | TargetAndTransition
    | VariantLabels
    | LegacyAnimationControls
    | undefined;
  initial: boolean | TargetAndTransition | VariantLabels | undefined;
}

function FramerMotionWrapper(props: IProps) {
  const {
    children,
    duration,
    style,
    transition,
    animate,
    initial,
    ...motionProps
  } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: duration, ...transition }}
      {...motionProps}
      style={style}>
      {children}
    </motion.div>
  );
}

export default FramerMotionWrapper;
