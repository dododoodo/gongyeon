import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/main.scss";
import allBtn from "../images/home_allbtn_01.png";
import { useNavigate } from 'react-router-dom';

import useShowApi from "../api/useShowApi";
import defaultImg from '../images/home_preview_01.png';
import { useEffect } from "react";

// 이미지 객체에서 진짜 이미지 URL을 꺼내는 함수
function getImageUrl(imageObject) {
  // 문자열일때 - 그대로 나오기
  if (typeof imageObject === "string") return imageObject;
  // 배열일 때
  if (Array.isArray(imageObject)) {
    const first = imageObject[0] || {};
    return first.imageUrl || Object.values(first)[0] || "";
  }
  if (typeof imageObject === "object" && imageObject !== null) {
    return imageObject.imageUrl || Object.values(imageObject)[0] || "";
  }
  return "";
}

function Slide({onLoad}) {
  const navigate = useNavigate();
  const { latestList, musicalList, classicList } = useShowApi();

  useEffect(() => {
    const isAllLoaded = [latestList, musicalList, classicList].every(
      (list) => Array.isArray(list) && list.length > 0
    );
    if (isAllLoaded) {
      onLoad?.();
    }
  }, [latestList, musicalList, classicList, onLoad]);
  
  const renderSlides = (list) =>
    // 3개 공연만 자르기
    (list || []).slice(0, 6).map((item, index) => {
      const realImageUrl = getImageUrl(item.IMAGE_OBJECT);

      const hasValidImage = typeof realImageUrl === "string" // 문자열인지 체크
      && realImageUrl.trim() !== "" // 공백 제거
      && !realImageUrl.includes("[object Object]"); // 객체로 들어가지 않았는지 체크

      // 다 아닐 시에는 기본 이미지 적용시키기
      const finalImageUrl = hasValidImage ? realImageUrl : defaultImg;

      return (
        <SwiperSlide className="slide" key={index}>
          <div className="slide_content" onClick={() => showBtn(item)}>
            <img
              className="slide_img" src={finalImageUrl}
              // 이미지 로드 오류 대처하기
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImg;
              }}
            />
            <span className="slide_genre">{item.GENRE}</span>
            <p className="slide_title">{item.TITLE}</p>
          </div>
        </SwiperSlide>
      );
    });

    const showBtn = (show) => {
      const selectedShow = {
        TITLE: show.TITLE,
        GENRE: show.GENRE,
        PERIOD: show.PERIOD,
        AUDIENCE: show.AUDIENCE,
        CHARGE: String(show.CHARGE),
        DESCRIPTION: show.DESCRIPTION,
        IMAGE_OBJECT: show.IMAGE_OBJECT,
        URL: show.URL,
      };

      sessionStorage.setItem("selectedShow", JSON.stringify(selectedShow));
      navigate('/contents');
    };
    
  return (
    <div className="swiper_container">
      {/* 최신 공연 */}
      <div className="slide_box">
        <div className="swiper_text">
          <p>최근에 나온 공연들이에요</p>
          <button> 모두보기 <img src={allBtn} alt="화살표 버튼 이미지" /></button>
        </div>
      </div>
      <Swiper className="mySwiper" slidesPerView={3} spaceBetween={15} loop={false}>
        {latestList ? renderSlides(latestList) : null}
      </Swiper>

      {/* 뮤지컬 공연 */}
      <div className="slide_box">
        <div className="swiper_text">
          <p>요즘 인기있는 뮤지컬이에요</p>
          <button> 모두보기 <img src={allBtn} alt="화살표 버튼 이미지" /> </button>
        </div>
        <Swiper className="mySwiper" slidesPerView={3} spaceBetween={15} loop={false}>
          {musicalList ? renderSlides(musicalList) : null}
        </Swiper>
      </div>

      {/* 클래식 공연 */}
      <div className="slide_box">
        <div className="swiper_text">
          <p>요즘 인기있는 클래식이에요</p>
          <button> 모두보기 <img src={allBtn} alt="화살표 버튼 이미지" /> </button>
        </div>
        <Swiper className="mySwiper" slidesPerView={3} spaceBetween={15} loop={false}>
          {classicList ? renderSlides(classicList) : null}
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
