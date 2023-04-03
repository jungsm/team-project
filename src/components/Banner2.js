import React from "react";
import { motion } from "framer-motion";
// import {Link} from "react-router-dom";
import "../scss/Style.scss";

// import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";

const Banner2 = () => {
  const list = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.section variants={list} initial="hidden" animate="visible" id="banner2" className="banner2">
      <div id="container">
        <div className="inner">
          <div className="banner_container">
            <Swiper
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              slidesPerView={1}
              spaceBetween={25}
              modules={[Autoplay, Navigation]}
              className="swiper_banner_slide_wrap"
            >
              <SwiperSlide id="bannerCard1" className="swiper_banner2_slide">
                <div className="img_banner" style={{ backgroundImage: "url('../images/banner/img_bban1.svg')" }}></div>
              </SwiperSlide>
              <SwiperSlide id="bannerCard1" className="swiper_banner2_slide">
                <div className="img_banner" style={{ backgroundImage: "url('../images/banner/img_bban2.svg')" }}></div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
export default Banner2;
