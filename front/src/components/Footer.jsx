import React from 'react'


function Footer() {
  return (
    <div className='footer_container'>

      <div className='footer_text'>
        <div className='footer_contents'>
          <div className='left'>
            <p>고객센터</p>
            <p>09:00 ~ 18:00</p>
            <p>Information</p>
            <p>Category</p>
          </div>

          <div className="right">
            <p>1588-0000</p>
            <p>{`(주말,공휴일 제외)`}</p>
            <div className='right_text'>
              <p>서비스 이용약관</p>
              <p>개인정보 처리방침</p>
            </div>
            <div className='right_text'>
              <p>공연찾기</p>
              <p>나의공연</p>
              <p>마이페이지</p>
            </div>
          </div>
        </div>
          <div className="footer_found">
            <p>만든이&nbsp;&nbsp;&nbsp;김도연</p>
            <p>서울특별시 강남구 강남대로 428</p>
            <p>이메일&nbsp;&nbsp;&nbsp;gotoashow@gmail.com</p>
          </div>
          <p className='footer_explain'>‘공연본당’은 <span>문화체육관광부 산하 공공기관인 예술의 전당 데이터</span>를 기반으로
          운영하는 서비스입니다.</p>
      </div>
    </div>
  )
}

export default Footer