import "../scss/Style.scss";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
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
  return (
    <>
      <div id="container">
        <motion.div variants={list} initial="hidden" animate="visible" className="inner">
          <motion.div variants={item} className="content_box">
            <h1>업로드할 카테고리를 선택하세요</h1>
            <motion.button
              variants={item}
              class="btn category_btn category_btn_ani"
              onClick={() => {
                navigate("/UploadPage");
              }}
            >
              # 미개봉상품 <br /> # 무료나눔<br></br>
            </motion.button>
            <motion.button
              variants={item}
              class="btn category_btn category_btn_ani"
              onClick={() => {
                navigate("/UploadPage2");
              }}
            >
              # 중고상품 <br /> # 물물교환
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Category;
