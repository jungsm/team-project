import React, { useState } from "react";
import { Form, Divider, Upload, message, Input, InputNumber, Select } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import "../scss/Style.scss";
import axios from "axios";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const UploadPage2 = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const info = () => {
    messageApi.open({
      type: "error",
      content: "상품을 등록할 수 없습니다.",
    });
  };
  const { TextArea } = Input;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onFinish = (val) => {
    console.log(val);

    axios
      .post(`${API_URL}/products2`, {
        category: val.category,
        name: val.name,
        brand: val.brand,
        size: val.size,
        price: val.price,
        description: val.description,
        imageUrl: imageUrl,
        seller: val.seller,
      })
      .then((result) => {
        // console.log(result);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        message.error(`error!`);
      });
  };
  const onChangeImage = function (info) {
    if (info.file.status === "uploading") {
      return;
    } else if (info.file.status === "done") {
      const reponse = info.file.response;
      // const imageUrl = reponse.image;
      const imageUrl = reponse.imageUrl; /* 0324변경 */
      console.log(imageUrl);
      setImageUrl(imageUrl);
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
        staggerChildren: 0.5,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div id="container">
      <motion.div variants={list} initial="hidden" animate="visible"  className="inner">
        <motion.div variants={item}>
        <div className="upload_h1">
          <div style={{ fontSize: "18px" }}>상품등록</div>
          <div style={{ fontSize: "12px" }}>
            <span style={{ color: "red" }}>*필수항목</span>은 꼭 입력해주세요
          </div>
        </div>
        <Form name="uploadForm" onFinish={onFinish}>
          {/* 이미지업로드 */}
          <Form.Item name="upload" valuePropName="image" className="upload_image">
            <Upload name="image" action={`${API_URL}/image`} listType="picture" showUploadList={false} onChange={onChangeImage}>
              {imageUrl ? (
                <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="" />
              ) : (
                <div id="upload-img-placeholder">
                  <CameraOutlined className="upload-img" />
                  <p className="img_upload">상품 이미지를 등록해주세요</p>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Divider></Divider>
          <Form.Item className="category" label={<span className="upload_label">상품 카테고리</span>} name="category" rules={[{ required: true, message: "상품 카테고리는 필수 선택 사항입니다." }]}>
            {/* category */}

            <Select
              showSearch
              placeholder="상품 카테고리를 선택해주세요"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={[
                { value: "B", label: "B(물물교환)" },
                { value: "D", label: "D(사용감있는 중고상품)" },
              ]}
            />
          </Form.Item>
          <Divider></Divider>

          {/* 상품명*/}
          <Form.Item label={<span className="upload_label">상품명</span>} name="name" rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}>
            <Input className="upload_name" placeholder="상품명을 입력해주세요" size="large" />
          </Form.Item>
          <Divider></Divider>
          {/* 브랜드 */}
          <Form.Item label={<span className="upload_brand">브랜드명</span>} name="brand">
            <Input className="upload_brand" placeholder="브랜드명을 입력해주세요" size="large" />
          </Form.Item>
          <Divider></Divider>

          {/* 사이즈 */}
          <Form.Item label={<span className="upload_size">사이즈</span>} name="size">
            <Input className="upload_size" placeholder="사이즈를 입력해주세요" size="large" />
          </Form.Item>
          <Divider></Divider>

          {/* 상품가격 */}
          <Form.Item label={<span className="upload_price">판매가</span>} name="price" rules={[{ required: true, message: "상품가격은 필수 입력 사항입니다." }]}>
            {/* err initioalvalue=0 */}
            <InputNumber className="upload_price" size="large" min={0} placeholder="0" /* defaultValue={1000} */ />
          </Form.Item>
          <Divider></Divider>

          {/* 상품설명 */}
          <Form.Item label={<span className="upload-label">상품설명</span>} name="description" rules={[{ required: true, message: "상품설명은 필수 입력 사항입니다." }]}>
            <TextArea size="large" id="description" showCount maxLength={300} placeholder="상품설명을 작성해주세요"></TextArea>
          </Form.Item>
          <Divider></Divider>
          {/* 판매자명 */}
          <Form.Item label={<span className="upload-seller">판매자명</span>} name="seller" rules={[{ required: true, message: "판매자명은 필수 입력 사항입니다." }]}>
            <Input className="upload-name" placeholder="판매자명을 입력해주세요" size="large" />
          </Form.Item>
          <Divider></Divider>
          <Form.Item>
            {/* button과 use연결 */}
            {contextHolder}
            {/* <Button id="submit-button" htmlType="submit" onClick={info}>
            상품등록하기
          </Button> */}
            <button class="btn category_btn category_btn_ani" htmlType="submit" onClick={info}>
              상품등록하기
            </button>
          </Form.Item>
        </Form>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default UploadPage2;
