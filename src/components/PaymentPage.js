import { Image } from "antd";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import DaumPostcode from "react-daum-postcode";

import "../scss/Style.scss";
function Header() {
  const [address, setAddress] = useState(""); // 주소 정보를 저장할 상태
  const [zipCode, setZipCode] = useState(""); // 우편번호 정보를 저장할 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창을 열고 닫을 상태

  const handleComplete = (data) => {
    const { roadAddress, zonecode } = data; // 선택한 주소 정보에서 도로명 주소와 우편번호 추출
    setAddress(roadAddress); // 상태에 도로명 주소 저장
    setZipCode(zonecode); // 상태에 우편번호 저장
    setIsModalOpen(false); // 모달 창 닫기
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    // 팝업창 상태 관리
      const [isPopupOpen, setIsPopupOpen] = useState(false)
   
    // 팝업창 열기
      const openPostCode = () => {
          setIsPopupOpen(true)
      }
   
    // 팝업창 닫기
      const closePostCode = () => {
          setIsPopupOpen(false)
      }
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
    <section id="container">
      <motion.div variants={list} initial="hidden" animate="visible" className="inner">
        <motion.p  variants={item} className="title">주문서</motion.p>
        <motion.div variants={item} className="item_list">
          <div className="item_imgbox">
            <Image
              width={100}
              height={100}
              src="error"
              fallback="data:image/png;base64,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"
            />
          </div>
          <div className="item_text_box">
            <p className="item_name">(새상품) 나이키 정품 모자</p>
            <p className="itme_price">15,000원</p>
            <p className="itme_delivery">무료배송</p>
          </div>
        </motion.div>
        <motion.section variants={item} className="main_order">
          <div className="main_title">
            <p>배송지</p>
          </div>
          <div className="main_address">
            <div className="addres_box">
              <p className="addres_text">이름</p>
              <input type="text" className="addres_inputbox" placeholder="이름을 입력하세요" />
            </div>

            <div className="addres_box">
              <p className="addres_text">연락처</p>
              <input type="text" className="addres_inputbox" placeholder="숫자만 입력하세요" />
            </div>
            <div className="addres_post_box">
              <p className="addres_text">주소</p>
              <input type="text" placeholder="우편번호" className="addres_inputpost" value={zipCode} onChange={(e) => setZipCode(e.target.value)}  />
              <button className="addres_post_button" onClick={openModal} >주소찾기</button>
            </div>
            {isModalOpen && (
            <div>
          <DaumPostcode onComplete={handleComplete} />
          </div>
            )}
            <div className="addres-post_box2">
              <input type="text" className="addres_inputpost" placeholder="기본주소 입력" value={address} onChange={(e) => setAddress(e.target.value)}></input>
              <input type="text" className="addres_inputpost2" placeholder="상세 주소 입력"></input>
            </div>
          </div>
        </motion.section>
        <motion.section variants={item} className="coupon_card">
          <div className="title_box">쿠폰/포인트 할인</div>
          <div className="coupon_text_box">
            <span> 쿠폰</span>
            <div className="coupon_right">
              <div className="coupon_right_text">
                <span>보유 4장</span>
              </div>
              <div className="coupon_right_btn">
                <button className="coupon_btn">쿠폰선택</button>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section variants={item} className="price_card">
          <div className="price_title">결제수단</div>
          <div className="price_btn_box">
            <div className="price_btn">
              <button>카카오페이</button>
              <button>토스결제</button>
              <button>간편 계좌이체</button>
              <button>신용카드</button>
            </div>
          </div>
        </motion.section>
        <motion.section variants={item} className="amount_card">
          <div className="amount_title">최종결제금액</div>
          <div className="amount_box">
            <div className="amount_list_box">
              <ul className="amount_left_text">
                <li>상품가격</li>
                <li>쿠폰 사용</li>
                <li>배송비</li>
                <li>안전거래수수료</li>
              </ul>
              <ul className="amount_right_text">
                <li>15,000원</li>
                <li>0원</li>
                <li>무료배송</li>
                <li>1,000원</li>
              </ul>
            </div>
            <div className="amount_last">
              <ul className="amount_last_left">
                <li>최종결제금액</li>
              </ul>
              <ul className="amount_last_right">
                <li>16,480원</li>
              </ul>
            </div>
          </div>
        </motion.section>
        <div className="checkbox">
          <input type="checkbox" />
          결제하기 클릭시 <span>결제시 유의사항</span> 및 <span>반품환불정책</span>을 모두 이해하고 이에동의함을 의미합니다
        </div>
        <motion.div variants={item} className="payment_btn">
          <button>결제하기</button>
        </motion.div>
      </motion.div>
    </section>
  );
}
export default Header;
