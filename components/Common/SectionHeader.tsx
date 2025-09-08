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
        className="animate_top mx-auto text-center"
      >
        <div className="mb-6 inline-block rounded-full glass-effect px-6 py-2 shadow-lg">
          <span className="text-sectiontitle font-semibold text-primary">
            {title}
          </span>
        </div>
        <h2 className="mx-auto mb-6 text-4xl lg:text-5xl font-bold gradient-text md:w-4/5 xl:w-1/2">
          {subtitle}
        </h2>
        <p className="mx-auto text-lg text-waterloo dark:text-manatee leading-relaxed md:w-4/5 lg:w-3/5 xl:w-[46%]">{description}</p>
      </motion.div>
      {/* <!-- Section Title End --> */}
    </>
  );
};

export default SectionHeader;
