import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

// image import
import searchText from "../images/search_text_01.png";
import preview from "../images/search_preview_01.png";
import categoryImg1 from "../images/search_category_01.png";
import categoryImg2 from "../images/search_category_02.png";
import categoryImg3 from "../images/search_category_03.png";
import categoryImg4 from "../images/search_category_04.png";
import categoryImg5 from "../images/search_category_05.png";
import categoryImg6 from "../images/search_category_06.png";
import categoryImg7 from "../images/search_category_07.png";
import categoryImg8 from "../images/search_category_08.png";
import categoryImg9 from "../images/search_category_09.png";

function CategoryGrid() {
  const navigate = useNavigate();
  const [randomShows, setRandomShows] = useState([]);
  const [latestShows, setLatestShows] = useState([]);

  const categories = [
    { name: '클래식', sub: 'CLASSIC M.', image: categoryImg1 },
    { name: '성악', sub: 'VOCAL M.', image: categoryImg2 },
    { name: '실내악', sub: 'CHAMBER M.', image: categoryImg3 },
    { name: '독주', sub: 'RECITAL', image: categoryImg4 },
    { name: '뮤지컬', sub: 'MUSICAL', image: categoryImg5 },
    { name: '오페라', sub: 'OPERA', image: categoryImg6 },
    { name: '콘서트', sub: 'CONCERT', image: categoryImg7 },
    { name: '무용', sub: 'DANCE', image: categoryImg8 },
    { name: '교향곡', sub: 'SYMPHONY', image: categoryImg9 },
  ];

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();

        let items = data?.response?.body?.items?.item || [];
        if (!Array.isArray(items)) {
          items = [items];
        }

        // 랜덤 공연 5개 가져오기
        const random = [...items].sort(() => 0.5 - Math.random()).slice(0, 5);
        setRandomShows(random);

        // 최신 공연 5개 가져오기
        const latest = items.slice(0, 5);
        setLatestShows(latest);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 카테고리 버튼 클릭 시
  const CategoryBtn = (genre) => {
    navigate('/category', { state: { selectedGenre: genre } });
  };

  const bannerBtn = () => {
    navigate('/contents');
  };

  // 슬라이드 생성 함수
  const renderSlides = (data) => {
    return data.map((show, index) => {
      const showData = {
        TITLE: show.TITLE || '제목 없음',
        IMAGE_OBJECT: show.IMAGE_OBJECT || null,
        GENRE: show.GENRE || '장르 없음',
        AUDIENCE: show.AUDIENCE || '정보 없음',
        PERIOD: show.PERIOD || '정보 없음',
        EVENT_PERIOD: show.EVENT_PERIOD || '정보 없음',
        CHARGE: show.CHARGE || '정보 없음',
        DESCRIPTION: show.DESCRIPTION || '정보 없음',
        URL: show.URL || '',
      };

      return (
        <SwiperSlide key={index}>
          <div
            className="slide_item"
            onClick={() => navigate('/contents', { state: { show: showData } })}
          >
            <img
              src={show.IMAGE_OBJECT || '기본이미지.png'}
              alt={show.TITLE}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = preview;
              }}
            />
            <div className="slide_overlay" />
            <div className="slide_text">
              <p className="genre">{show.GENRE}</p>
              <p className="title">{show.TITLE}</p>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      <div className='category_text'>
        <p>카테고리로 손쉽게 공연을 찾아보세요</p>
        <img src={searchText} alt="" />
      </div>
      <div className="category_grid">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className="category_btn"
            style={{ backgroundImage: `url(${cat.image})` }}
            onClick={() => CategoryBtn(cat.name)}
          >
            <div className="overlay" />
            <div className="text_group">
              <span className="kor">{cat.name}</span>
              <span className="eng">{cat.sub}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="banner_box">
        <div className='banner_container'>
          <p>오늘의 인기 공연이에요!</p>
          <div className="banner" >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 4500,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {renderSlides(randomShows)}
            </Swiper>
          </div>
        </div>

        <div className='banner_container'>
          <p>가장 최신에 나온 공연이에요!</p>
          <div className="banner">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 4500,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {renderSlides(latestShows)}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryGrid;
