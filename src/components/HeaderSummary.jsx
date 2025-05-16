'use client';

import { headerSummaryStats } from '@/config/headerConfig';
import { motion, useMotionValue, animate, useTransform } from 'motion/react';
import { useEffect } from 'react';

const HeaderSummaryItem = ({ value, text }) => {
  const count = useMotionValue(0);
  const number = useTransform(() => Math.round(count.get()));
  useEffect(() => {
    console.log(value);
    const controls = animate(count, value, { duration: 3 });
    return () => controls.stop();
  }, [count, value]);
  return (
    <div className="flex-1 flex gap-4 items-center justify-center">
      <div className='text-3xl lg:text-5xl font-extrabold'><motion.span>{number}</motion.span>+</div>
      <div className='text-sm'>{text}</div>
    </div>
  );
};

const HeaderSummary = () => {


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className='container mx-auto px-4 py-8 rounded-md shadow-sm  border-[1px] border-gray-600'>
      <div className="flex flex-wrap gap-6 max-w-[80vw]  mx-auto font-openSans">
        {
          headerSummaryStats.map((item, index) => (
            <HeaderSummaryItem key={index} value={item.number} text={item.text} />
          ))
        }
      </div>
    </motion.div>
  );
};

export default HeaderSummary;