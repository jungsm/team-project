import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../scss/Style.scss";
import { RightOutlined } from "@ant-design/icons";

// import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기

dayjs.extend(relativeTime);
dayjs.locale("ko");

const Section1 = () => {
  const [products, setProducts] = useState([]);

    useEffect(() => {
		axios
			.get(`${API_URL}/products`)
			.then((result) => {
				const products = result.data.product;
				setProducts(products);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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

  // 상품 필터링 
  const productsA = products.filter(product => product.category === "A");
  const productsN = products.filter(product => product.category === "N");

  return (
    <>
      <section id="section1" className="product">
        <h2 className="ir_so">아껴쓴 물건을 팔아보세요</h2>
        <div id="container">
          <div className="inner">
            <motion.div variants={list} initial="hidden" animate="visible" className="product_container">
              <motion.h2 variants={item} className="prooduct_title">
                <span>아</span>껴쓴 물건을 팔아보세요
              </motion.h2>
              <p>
                <motion.div variants={item}>
                <Link className="product_link" to={"/products1"}>
                  전체보기
                  <RightOutlined />
                </Link>
                </motion.div>
              </p>
              <Swiper slidesPerView={2} spaceBetween={20} freeMode={true} modules={[FreeMode]} className="swiper_slide_wrap">
                {productsA.length < 1 ? <p className="not_have">등록된 상품이 없습니다.</p> :
                  products.filter((category) => category.category === "A")
                  .map((product) => {
                    return(
                      
                      <SwiperSlide className="product_card swiper_slide" key={product.id}>
                          {product.soldout === 1 ? <div className="sold_out"><h2>품절</h2></div> : null }
                          <motion.div variants={item}>
                          <Link className="detail_link" to={`/Detail1/${product.id}`}>
                            <div className="product_img_box">
                              <img className="product_img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                              <button className="heart_btn" type="button">
                                  <img src="../images/icons/heart.png" alt="" />
                              </button>
                            </div>
                            <div className="product_text">
                              <ul className="product_text_top">
                                {product.brand === null ? null : <li className="brand"><span>{product.brand}</span></li>}
                                <li className="name">{product.name}</li>
                                {product.price === null ? null : <li className="price">{product.price}원</li>}
                              </ul>
                              <div className="product_text_bottom">
                                {product.size === null ? null : <li className="size"><span>{product.size}</span></li>}
                                <p className="time">{dayjs(product.createdAt).fromNow()}</p>
                              </div>
                            </div>
                          </Link>
                          </motion.div>
                      </SwiperSlide>
                    );
                  })
                }
              </Swiper>
            </motion.div>
          </div>
        </div>
      </section>
      <motion.section variants={list} initial="hidden" animate="visible" id="section2" className="product">
        <h2 className="ir_so">나눔을 해보세요</h2>
        <div id="container">
          <div className="inner">
            <div className="product_container">
              <motion.h2 variants={item} className="prooduct_title">
                <span>나</span>눔을 해보세요
              </motion.h2>
              <p>
              <motion.div variants={item}>
                <Link className="product_link" to={"/products2"}>
                  전체보기
                  <RightOutlined />
                </Link>
                </motion.div>
              </p>
              <Swiper slidesPerView={2} spaceBetween={20} freeMode={true} modules={[FreeMode]} className="swiper_slide_wrap">
                {productsN.length < 1 ? <p className="not_have">등록된 상품이 없습니다.</p> : 
                  products.filter((category) => category.category === "N")
                  .map((product) => {
                    return(
                      
                      <SwiperSlide className="product_card swiper_slide" key={product.id}>
                          {product.soldout === 1 ? <div className="sold_out"><h2>품절</h2></div> : null }
                          <motion.div variants={item}>
                          <Link className="detail_link" to={`/Detail1/${product.id}`}>
                            <div className="product_img_box">
                              <img className="product_img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                              <button className="heart_btn" type="button">
                                  <img src="../images/icons/heart.png" alt="" />
                              </button>
                            </div>
                            <div className="product_text">
                              <ul className="product_text_top">
                                <li className="brand"><span>{product.brand}</span></li>
                                <li className="name">{product.name}</li>
                                {product.price === null ? null : <li className="price">{product.price}원</li>}
                              </ul>
                              <div className="product_text_bottom">
                                {product.size === null ? null : <li className="size"><span>{product.size}</span></li>}
                                <p className="time">{dayjs(product.createdAt).fromNow()}</p>
                              </div>
                            </div>
                          </Link>
                          </motion.div>
                      </SwiperSlide>
                    );
                  })
                }
              </Swiper>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Section1;
