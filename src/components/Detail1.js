import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import "../scss/Style.scss";
// import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";
import { Button, message, Spin } from "antd";
import dayjs from "dayjs";

const Detail1 = () => {
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        console.log(result);
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (product == null) {
    return (
      <div style={{ height: "150px", paddingTop: "80px" }}>
        <Spin tip="상품정보를 받아오는 중입니다...." size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }
  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        navigate(`/`, { replace: true });
        message.info("결제가 완료 되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.info("결제오류.");
        console.log(error);
      });
  };

  return (
    <div>
      <div id="container">
        <div className="inner">
          {/* 이미지 */}
          <div className="image_box">
            <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
          </div>

          <div id="content_box_detail">
            {/* 상품명 */}
            <div className="product_name">{product.name}</div>
            {/* 가격 */}
            <div className="product_price">
              <div>&#8361; {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* 브랜드 */}
              <span className="product_brand">{product.brand}</span>
              {/* 사이즈 */}
              <span className="product_size">size {product.size}</span>
            </div>
            <hr />
            {/* 상세설명 */}
            {/* 판매자 */}
            <div className="product_description_box">
              <h3>
                판매자 <span style={{ color: "#558c03", fontWeight: "bold" }}>{product.seller}</span>의 말
              </h3>
              <p className="product_description">{product.description}</p>
            </div>
            <hr />
            {/* adress */}
            <div className="product_name">배송지</div>
            <div className="inputbox">
              <input type="text" placeholder="우편번호" className="addres_inputpost" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              <button className="addres_post_button" onClick={openModal}>
                주소찾기
              </button>
            </div>
            {isModalOpen && (
              <div>
                <DaumPostcode onComplete={handleComplete} />
              </div>
            )}
            <div className="addres-post_box2">
              <input type="text" className="addres_inputpost1" placeholder="기본주소 입력" value={address} onChange={(e) => setAddress(e.target.value)}></input>
              <input type="text" className="addres_inputpost1" placeholder="상세 주소 입력"></input>
            </div>
            {/* 등록일 */}
            <p className="product_createAt">
              <span>등록일 :&nbsp;</span>
              {dayjs(product.createdAt).format("YYYY.MM.DD HH:mm")}
            </p>
            {/* 구매버튼 */}
            <button siz="large" type="primary" danger={true} className="btn category_btn category_btn_ani" onClick={onClickPurchase} disabled={product.soldout === 1}>
              즉시결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail1;
