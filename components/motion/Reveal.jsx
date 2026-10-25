"use client";

import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Natural editorial cubic-bezier ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
