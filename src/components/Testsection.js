import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../config/constants";
/* day */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Testsection = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const url = `${API_URL}/products`; /* 서버 json값 url저장 */

    axios
      .get(url)
      .then((result) => {
        const products = result.data.product;
        setProducts(products);
        console.log("data:", products); /* table 콘솔확인 */
      })
      .catch((error) => {
        console.log(error);
      });
    /* banners */
    /*     axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
        console.log("data:", banners);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); */
  }, []);
  return (
    <>
      {/* test */}
      <h1>Products test</h1>
      <div id="product-list">
        {/* product = value, idx = 인덱스번호 */}
        {products.map((product, idx) => {
          console.log("product");

          return (
            <div className="product-card" key={idx}>
              {/* {product.soldout === 1 ? <div className="product-blur" key={idx}></div> : null} */}

              {/* 메인 */}
              <Link className="product-link" to={`/Detail1/${product.id}`}>
                <div>
                  <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.imageUrl} />
                </div>
                <div className="product-content">
                  <span className="product-name">상품명:{product.name}</span>
                  <br />
                  <span className="product-price">가격:{product.price}</span>
                  <br />
                  <span className="product-brand">브랜드:{product.brand}</span>
                  <br />
                  <span className="product-size">사이즈:{product.size}</span>

                  <div className="product-footer">
                    <span className="product-seller">
                      <span>판매자명:{product.seller}</span>
                      <br />
                    </span>
                    {/* typescript 공부 후 적용 */}
                    {/* <span className="product-date">{dayjs(product.createdAt).format("YYYY년MM월DD일HH:MM:ss")}</span> */}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Testsection;
