"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="section-padding overflow-hidden">
        <div className="mx-auto max-w-c-1390 container-padding">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-meta rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/30 rounded-full animate-pulse delay-500"></div>
            </div>
            
            <div className="relative z-10 flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -20,
                  },

                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_left md:w-[70%] lg:w-1/2"
              >
                <h2 className="mb-6 text-4xl lg:text-5xl font-bold gradient-text leading-tight">
                  Join Our Community Today
                </h2>
                <p className="text-lg text-waterloo dark:text-manatee leading-relaxed">
                  Connect with fellow Agarwal Samaj members, discover opportunities, 
                  and be part of a thriving community that supports each other's growth and success.
                </p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 20,
                  },

                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_right lg:w-[45%]"
              >
                <div className="flex items-center justify-end xl:justify-between">
                  <div className="hidden xl:block text-8xl opacity-20">🤝</div>
                  <a
                    href="/auth/signup"
                    className="btn-primary text-lg px-8 py-4 hover-lift group"
                  >
                    Join Community
                    <svg
                      className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}
    </>
  );
};

export default CTA;
