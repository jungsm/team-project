import React from "react";
import "../scss/Style.scss";
import { motion } from "framer-motion";
import { Button, Space } from "antd";
import { FacebookFilled, TwitterOutlined, YoutubeFilled, InstagramOutlined, FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";

function Footer() {
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
    <>
      <footer>
        <div id="container">
          <motion.div variants={list} initial="hidden" animate="visible" className="inner">
            <motion.img  variants={item} src="/images/icons/img_footer_logo.png" alt="" className="logo" />
            <motion.p variants={item} className="info">
              (주)ANBD | 대표: 호문섭건 | 개인정보관리자: 기명섭
              <br />
              사업자등록번호: 123-45-78900
              <br />
              통신판매업신고번호: 2023-서울강남-12345호
              <br />
              주소: 서울 강남구 강남대로 123, 4층 (리액트빌딩)
              <br />
              대표번호: 1234-5678 ㅣ 메일: was7894@gmail.com
            </motion.p>
            <motion.div variants={item} className="icon">
            <Space size={30}>
              <Button ghost size="middle" shape="circle" icon={<FacebookFilled />}></Button>
              <Button ghost size="middle" shape="circle" icon={<TwitterOutlined />}></Button>
              <Button ghost size="middle" shape="circle" icon={<YoutubeOutlined />}></Button>
              <Button ghost size="middle" shape="circle" icon={<InstagramOutlined />}></Button>
            </Space>
            </motion.div>
            <motion.p  variants={item} className="copyright">Copyrightⓒ ANBD Inc. All rights reserved.</motion.p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
