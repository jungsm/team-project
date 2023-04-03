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

const Section2 = () => {
  const [products, setProducts] = useState([]);

    useEffect(() => {
		axios
			.get(`${API_URL}/products2`)
			.then((result) => {
				const products = result.data.product2;
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
  const productsB = products.filter(product => product.category === "B");
  const productsD = products.filter(product => product.category === "D");

  return (
    <>
      <motion.section variants={list} initial="hidden" animate="visible" id="section3" className="product">
        <h2 className="ir_so">나눔을 해보세요</h2>
        <div id="container">
          <div className="inner">
            <div className="product_container">
              <motion.h2 variants={item} className="prooduct_title">
                <span>바</span>꿔서 사용해보세요
              </motion.h2>
              <p>
              <motion.div variants={item}>
                <Link className="product_link" to={"/products3"}>
                  전체보기
                  <RightOutlined />
                </Link>
                </motion.div>
              </p>
              <Swiper slidesPerView={2} spaceBetween={20} freeMode={true} modules={[FreeMode]} className="swiper_slide_wrap">
                {productsB.length < 1 ? <p className="not_have">등록된 상품이 없습니다.</p> :
                  products.filter((category) => category.category === "B")
                  .map((product) => {
                    return(
                      <SwiperSlide className="product_card swiper_slide" key={product.id}>
                          {product.soldout === 1 ? <div className="sold_out"><h2>품절</h2></div> : null }
                          <motion.div variants={item}>
                          <Link className="detail_link" to={`/Detail2/${product.id}`}>
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
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section variants={list} initial="hidden" animate="visible" id="section4" className="product">
        <h2 className="ir_so">다시 사용해보세요</h2>
        <div id="container">
          <div className="inner">
            <div className="product_container">
              <motion.h2 variants={item} className="prooduct_title">
                <span>다</span>시 사용해보세요
              </motion.h2>
              <p>
              <motion.div variants={item}>
                <Link className="product_link" to={"/products4"}>
                  전체보기
                  <RightOutlined />
                </Link>
                </motion.div>
              </p>
              <Swiper slidesPerView={2} spaceBetween={20} freeMode={true} modules={[FreeMode]} className="swiper_slide_wrap">
                {productsD.length < 1 ? <p className="not_have">등록된 상품이 없습니다.</p> : 
                  products.filter((category) => category.category === "D")
                  .map((product) => {
                    return(
                      <SwiperSlide className="product_card swiper_slide" key={product.id}>
                          {product.soldout === 1 ? <div className="sold_out"><h2>품절</h2></div> : null }
                          <motion.div variants={item}>
                          <Link className="detail_link" to={`/Detail2/${product.id}`}>
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

export default Section2;
