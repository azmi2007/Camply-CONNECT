import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  wordClassName = ''
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 120
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 120
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={`inline-block mr-[0.28em] last:mr-0 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
