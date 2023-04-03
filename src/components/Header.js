import { Button } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import "../scss/Style.scss";
import { BellOutlined, LoginOutlined } from "@ant-design/icons";

function Header() {
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
    <header id="header">
      <div id="container">
        <div className="inner">
          <motion.div variants={list} initial="hidden" animate="visible" className="content_wrap">
            <motion.div variants={item}>
              <Button size="large" href="https://pf.kakao.com/_tdIxcxj/99360875">
                <BellOutlined />
              </Button>
            </motion.div>

            <Link to="/">
              <motion.img variants={item} src="/images/icons/img_header_logo.png" alt="" className="logo" />
            </Link>

            <motion.div variants={item}>
              <Link className="login-link" to={`/LoginPage`}>
                <Button size="large">
                  <LoginOutlined />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
export default Header;
