"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function EditorAnimatedItem({
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: "hidden",
      }}
      transition={{
        layout: {
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.18,
        },
        scale: {
          duration: 0.2,
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}