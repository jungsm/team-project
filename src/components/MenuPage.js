import { LikeOutlined, SmileOutlined, SyncOutlined, SkinOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import "../scss/Style.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("A : 미개봉 상품 및 A급 물건", "sub1", <LikeOutlined />, [getItem("남성의류", "1"), getItem("여성의류", "2"), getItem("신발", "3"), getItem("잡화", "4")]),
  getItem("N : 무료 나눔", "sub2", <SmileOutlined />, [getItem("남성의류", "1"), getItem("여성의류", "2"), getItem("신발", "3"), getItem("잡화", "4")]),
  getItem("B : 물물교환", "sub4", <SyncOutlined />, [getItem("남성의류", "1"), getItem("여성의류", "2"), getItem("신발", "3"), getItem("잡화", "4")]),
  getItem("D : 사용감있는 중고상품", "sub4", <SkinOutlined />, [getItem("남성의류", "1"), getItem("여성의류", "2"), getItem("신발", "3"), getItem("잡화", "4")]),
  getItem("제휴사 이벤트", []),
  getItem("고객센터 오픈채팅", []),
  getItem("자주 묻는 질문", "sub4", []),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const App = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
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
    <div id="container">
      <motion.div variants={list} initial="hidden" animate="visible" className="inner">
        <motion.div variants={item} className="title">
          카테고리
        </motion.div>
        <motion.div className="menus" variants={item}>
          <span className="ant-menu-title-content"></span>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{
              width: 440,
            }}
            items={items}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App;
