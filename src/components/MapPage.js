import React, { useState } from 'react'
import MapContainer from "./MapContainer"
import { SearchOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
import { Button } from 'antd';

function LandingPage() {
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
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  return (
    <>
     <div id="container">
          <div className="inner">
            <motion.div variants={list} initial="hidden" animate="visible"  className='search'>
      <motion.form variants={item} className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <Button type="submit" shape="circle" className='search_btn' icon={<SearchOutlined />} />
      </motion.form>
      </motion.div>
      </div>
      </div>
      <MapContainer searchPlace={Place} />
    </>
  )
}

export default LandingPage