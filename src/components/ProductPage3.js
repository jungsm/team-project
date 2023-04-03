import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
import { useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";
import "../scss/Style.scss";
import { motion } from "framer-motion";
import { LeftOutlined } from '@ant-design/icons';

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

const ProductPage3 = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState(""); // 검색어 추가

    useEffect(() => {
		axios
			.get(`${API_URL}/products2`)
			.then((result) => {
				const products = result.data.product2;
				setProducts(products);
                // console.log(products);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

    const navigate = useNavigate();

    // 필터링 검색 기능
    const filteredProducts = products.filter(
        (product) =>
            product.category === "B" &&
            product.name.toLowerCase().includes(searchText.toLowerCase())
    );
	const productsB = products.filter(product => product.category === "B");
    const list = {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.5,
          },
        },
      };
      const item = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      };
    return(
        <motion.div variants={list} initial="hidden" animate="visible">
        <motion.div variants={item}>
            <header id="productSearch">
                <h2 className="ir_so">제품페이지</h2>
                <div id="container">
                    <div className="inner">                    
                        <div className="header">
                            <button
                                onClick={() => {
                                    navigate(-1);
                                }}
                                className="back_btn"
                            >
                                <LeftOutlined className="left_arrow" style={{fontSize: "20px"}} />
                            </button>
                            <form className="search_form">
                                <div className="search_input_wrap">
                                    <label htmlFor="user_search" className="ir_so">품목 검색</label>
                                    <input id="user_search" name="user_search" className="search_input" placeholder="구매하고 싶은 상품을 검색하세요" value={searchText} onChange={(e) =>  setSearchText(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <nav className="nav">
                            <ul className="product_category">
                                <li className="categories"><Link to="/products1">아껴사용</Link></li>
                                <li className="categories"><Link to="/products2">무료나눔</Link></li>
                                <li className="categories active"><Link to="/products3">바꾸기</Link></li>
                                <li className="categories"><Link to="/products4">다시쓰기</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                <section id="productItem">
                    <h2 className="ir_so">바꾸기</h2>
                    <div id="container">
                        <div className="inner">
                            <div className="product_container">
                                <Swiper
                                    slidesPerView={"auto"}
                                    spaceBetween={10}
                                    direction={"vertical"}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    loop={false}
                                    allowTouchMove={true}
                                    resistance={false}
                                    className="swiper_slide_wrap"
                                >
                                    {productsB.length < 1 ? <p className="not_have">등록된 상품이 없습니다.</p> : filteredProducts.length > 0 ? 
                                        filteredProducts.map((product) => (
                                            <SwiperSlide className="product_card swiper_slide" key={product.id}>
                                                {product.soldout === 1 ? <div className="sold_out"><h2>품절</h2></div> : null }
                                                <Link className="detail_link" to={`/Detail2/${product.id}`}>
                                                    <div className="product_img_box">
                                                        <img className="product_img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                                                        <button className="heart_btn" type="button">
                                                            <img src="../images/icons/heart.png" alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="product_text">
                                                        <ul className="product_text_top">
                                                            <li className="name">{product.name}</li>
                                                            {product.price === null ? null : <li className="price">{product.price}원</li>}
                                                        </ul>
                                                        <ul className="product_text_center">
                                                            {product.brand === null ? null : <li className="brand"><span>{product.brand}</span></li>}
                                                            {product.size === null ? null : <li className="size"><span>{product.size}</span></li>}
                                                        </ul>
                                                        <div className="product_text_bottom">
                                                            <p className="time">{dayjs(product.createdAt).fromNow()}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )) : <p className="not_have">검색하신 상품이 없습니다.</p> 
                                    } 
                                </Swiper> 
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            </motion.div>
		</motion.div>
    )
}

export default ProductPage3;
