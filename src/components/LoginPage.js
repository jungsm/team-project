import "../scss/Style.scss";
import { motion } from "framer-motion";

function LoginPage() {
  const REST_API_KEY = "dbdb989ca8e076423375424f2e440654";
  const REDIRECT_URI = "https://anbd.vercel.app";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Le9ywWBU613n5i0TBz2U&redirect_uri=https://anbd.vercel.app/&response_type=code";
  const NAVER_1_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Le9ywWBU613n5i0TBz2U&redirect_uri=http://localhost:8080&response_type=code";
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
      <div className="inner">
        <div className="login_wrap">
          <div className="header"></div>
          <motion.div variants={list} initial="hidden" animate="visible" className="logo_box">
            <motion.span variants={item}>모두를 위한 쇼핑몰 </motion.span>
            <motion.img variants={item} src="/images/icons/img_login_logo.png" alt="" />
          </motion.div>
          <motion.ul variants={list} initial="hidden" animate="visible" className="login_btn">
            <motion.li variants={item} className="kakao_btn">
              <a href={KAKAO_AUTH_URL}>카카오 계정으로 로그인</a>
            </motion.li>
            <motion.li variants={item} className="naver_btn">
              <a href={NAVER_AUTH_URL}>
                <span>NAVER</span> 계정으로 로그인
              </a>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
