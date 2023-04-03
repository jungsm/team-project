import React from "react";
import { motion } from "framer-motion";
import "../scss/Style.scss";
import { Link } from "react-router-dom";
import { Button, Drawer, Collapse, Card } from "antd";
import { HomeOutlined, UploadOutlined, MenuOutlined, CompassOutlined } from "@ant-design/icons";
import { useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import { LikeOutlined, SmileOutlined, SyncOutlined, SkinOutlined } from "@ant-design/icons";

function BottomNav() {
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

  const { Meta } = Card;
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (key) => {
    console.log(key);
  };

  const { Panel } = Collapse;

  return (
    <nav className="nav_bottom">
      <div id="container">
        <motion.div variants={list} initial="hidden" animate="visible" className="inner">
          <motion.div variants={item} className="nav_btns">
            <div className="btn_nav">
              <Link to={`/`}>
                <Button>
                  <HomeOutlined />
                  <br />홈
                </Button>
              </Link>
            </div>
            {/* <div className="btn_nav">
                <Link className="login-link" to={`/LoginPage`}>
                  <Button>
                  <LoginOutlined /><br />로그인
                  </Button>
                </Link>
              </div> */}
            <div className="btn_nav">
              <Link className="map-link" to={`/MapPage`}>
                <Button>
                  <CompassOutlined />
                  <br />
                  장소찾기
                </Button>
              </Link>
            </div>
            <div className="btn_nav">
              <Link className="upload-link" to={`/Category`}>
                <Button>
                  <UploadOutlined />
                  <br />
                  내물건팔기
                </Button>
              </Link>
            </div>
            <div className="btn_nav">
              <Button onClick={showDrawer}>
                <MenuOutlined />
                <br />
                더보기
              </Button>
              <Drawer title="더보기" placement="bottom" onClose={onClose} open={open}>
                <img variants={item} src="/images/icons/img_header_logo.png" alt="" className="logo" style={{ width: "90px", marginBottom: "20px" }} />
                <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                  <Panel header="로그인" key="1">
                    <Link to="/LoginPage">
                      <Button>로그인 하러가기</Button>
                    </Link>
                  </Panel>
                </Collapse>
                <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                  <Panel header="카테고리" key="2">
                    <Link to="/products1">
                      <Button>
                        <LikeOutlined />A : 미개봉 상품 및 A급 물건
                      </Button>
                    </Link>
                    <br />
                    <br />
                    <Link to="/products2">
                      <Button>
                        <SmileOutlined />N : 무료 나눔
                      </Button>
                    </Link>
                    <br />
                    <br />
                    <Link to="/products3">
                      <Button>
                        <SyncOutlined />B : 물물교환
                      </Button>
                    </Link>
                    <br />
                    <br />
                    <Link to="/products4">
                      <Button>
                        <SkinOutlined />D : 사용감있는 중고상품
                      </Button>
                    </Link>
                    <br />
                  </Panel>
                </Collapse>
                <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                  <Panel header="소식" key="2">
                    <Button href="https://pf.kakao.com/_tdIxcxj">공지소식</Button>
                    <br />
                  </Panel>
                </Collapse>
                <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                  <Panel header="고객센터" key="2">
                    <Button href="https://pf.kakao.com/_tdIxcxj/chat">고객센터 1:1 오픈채팅</Button>
                    {/*  <br />
                    <br />
                    <Button>자주 묻는 질문</Button> */}
                  </Panel>
                </Collapse>
              </Drawer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}

export default BottomNav;
