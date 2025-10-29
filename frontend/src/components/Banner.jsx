import React from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/banner.jpg";
import { Trans, useTranslation } from "react-i18next";

const Banner = () => {
  // Call the useTranslation hook to get the 't' function
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Trans i18nKey="common.welcomeToBrand">
            Welcome to <span className="text-green-300">Farmer Support</span>
          </Trans>
        </motion.h1>
        <motion.p
          className="text-xl opacity-90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {t("banner.description")}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Banner;
