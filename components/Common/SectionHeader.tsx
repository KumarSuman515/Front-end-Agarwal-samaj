"use client";
import { motion } from "framer-motion";

type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
    <>
      {/* <!-- Section Title Start --> */}
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="animate_top mx-auto text-center relative"
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full opacity-30 blur-sm"></div>
        <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-40 blur-sm"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-20 blur-lg"></div>
        
        {/* Main Title Badge */}
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-lg opacity-50"></div>
          <div className="relative rounded-full bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 px-10 py-4 shadow-xl border border-orange-200/50 dark:from-orange-900/40 dark:via-amber-900/40 dark:to-yellow-900/40 dark:border-orange-700/30">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent tracking-wide">
              {title}
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="mx-auto mb-8 text-5xl lg:text-7xl font-bold relative">
          <span className="bg-gradient-to-r from-gray-900 via-orange-700 to-amber-700 bg-clip-text text-transparent dark:from-white dark:via-orange-300 dark:to-amber-300">
            {subtitle}
          </span>
          {/* Decorative underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
        </h2>

        {/* Description */}
        <div className="relative mx-auto md:w-4/5 lg:w-3/5 xl:w-[50%]">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            {description}
          </p>
          {/* Decorative quote marks */}
          <div className="absolute -top-4 -left-4 text-6xl text-orange-200 dark:text-orange-800 font-serif opacity-30">"</div>
          <div className="absolute -bottom-8 -right-4 text-6xl text-amber-200 dark:text-amber-800 font-serif opacity-30">"</div>
        </div>
      </motion.div>
      {/* <!-- Section Title End --> */}
    </>
  );
};

export default SectionHeader;
