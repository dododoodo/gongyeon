import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import Slide from '../components/Slide';
import HomeButtons from '../components/HomeButtons';
import LoadingSpinner from '../components/LoadingSpinner';

import searchBtn from "../images/home_search_01.png";
import Footer from '../components/Footer';

function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [randomKeyword, setRandomKeyword] = useState('');
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [slideLoaded, setSlideLoaded] = useState(false);
  

  const keywords = ['소리','축제','리사이틀','예술','소프라노','열정','이야기','미학','해설이 있는','앙상블','바리톤'];

  const SearchBtn = () => {
    navigate('/search');
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const storedUserName = localStorage.getItem('userName');
    const naverProfile = JSON.parse(localStorage.getItem('profile'));

    if (loggedInUser?.nickname) setUserName(loggedInUser.nickname);
    else if (storedUserName) setUserName(storedUserName);
    else if (naverProfile?.nickname) setUserName(naverProfile.nickname);
    else setUserName("Guest");

    const randomIndex = Math.floor(Math.random() * keywords.length);
    setRandomKeyword(keywords[randomIndex]);
  }, []);

  const isAllLoaded = bannerLoaded && slideLoaded;

  useEffect(() => {
    if (!isAllLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAllLoaded]);
  


  return (
    <>
      <div className="main_container">
        {!isAllLoaded && <LoadingSpinner />}
        <Header />
      </div>

      <div className='main_banner'>
        <MainBanner onLoad={() => setBannerLoaded(true)} />
      </div>

      <div className='section_container'>
        <div className="section1">
          <button className='search_btn' onClick={SearchBtn}>
            <img src={searchBtn} alt="돋보기 이미지" />
            보고싶은 공연을 검색하세요
          </button>
          <div className='search_text'>
            <h4>{userName} 님께 추천드리는 오늘의 검색 키워드!</h4>
            <div className='keyword'>
              <span>{randomKeyword}</span>
            </div>
            <p>※ 추천 받은 키워드로 공연을 검색해보세요.</p>
          </div>
          <Slide onLoad={() => setSlideLoaded(true)} />
        </div>

        <div className="section2">
          <HomeButtons />
        </div>

        <Footer />
        <TabBar />
      </div>
    </>
  );
}

export default MainPage;