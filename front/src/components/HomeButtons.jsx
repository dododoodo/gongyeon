import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/main.scss";

// image import
import allBtn from "../images/home_allbtn_01.png";

function HomeButtons() {
  const navigate = useNavigate();

  const goToGenre = (genre) => {
    navigate('/category', { state: { selectedGenre: genre } });
  };

  return (
    <div className='buttons_container'>
      <div className='buttons_text1'>
        <p>장르로 찾아보는 건 어때요?</p>
      </div>

      <div className='category_buttons'>
        <div className="c_button_1">
          <button onClick={() => goToGenre('오페라')}>#오페라</button>
          <button onClick={() => goToGenre('독주')}>#독주</button>
        </div>

        <div className="c_button_2">
          <button onClick={() => goToGenre('무용')}>#무용</button>
          <button onClick={() => goToGenre('실내악')}>#실내악</button>
          <button onClick={() => goToGenre('성악')}>#성악</button>
        </div>

        <div className="c_button_3">
          <button onClick={() => goToGenre('클래식')}>#클래식</button>
          <button onClick={() => goToGenre('콘서트')}>#콘서트</button>
        </div>
      </div>

      <div className='buttons_text2'>
        <p className='btn_text'>클릭 시 클릭한 장르의 공연 카테고리로 이동됩니다.</p>
        <img src={allBtn} alt="화살표 아이콘 이미지" />
      </div>
    </div>
  );
}

export default HomeButtons;
