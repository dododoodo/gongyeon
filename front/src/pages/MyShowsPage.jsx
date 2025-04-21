import React, { useEffect, useState } from 'react';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import '../styles/myshows.scss';

// image import
import star from "../images/myshows_star_01.png";
import defaultImg from "../images/home_preview_01.png";
import errorImg from "../images/myshows_error_01.png";

function getImageUrl(imageObject) {
  if (!imageObject) return '';
  if (typeof imageObject === 'string') return imageObject;
  if (Array.isArray(imageObject)) {
    const first = imageObject[0];
    if (typeof first === 'string') return first;
    if (typeof first === 'object') return first.imageUrl || Object.values(first)[0] || '';
  }
  if (typeof imageObject === 'object') {
    return imageObject.imageUrl || Object.values(imageObject)[0] || '';
  }
  return '';
}

function MyShowsPage() {
  const [userName, setUserName] = useState('');
  const [likedShows, setLikedShows] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const storedUserName = localStorage.getItem('userName');
    const naverProfile = JSON.parse(localStorage.getItem('profile'));

    if (loggedInUser?.nickname) setUserName(loggedInUser.nickname);
    else if (storedUserName) setUserName(storedUserName);
    else if (naverProfile?.nickname) setUserName(naverProfile.nickname);
    else setUserName("Guest");

    const stored = JSON.parse(sessionStorage.getItem('likedShows')) || [];
    setLikedShows(stored);
  }, []);

  const handleRemove = (title) => {
    const updated = likedShows.filter((item) => item.title !== title);
    sessionStorage.setItem('likedShows', JSON.stringify(updated));
    setLikedShows(updated);
  };

  return (
    <>
      <div className='main_container'>
        <Header />
        <div className='all'>
          <div className='myshows_text'>
            <p>{userName} 님의 공연</p>
            <img src={star} alt="별 아이콘 이미지" />
          </div>
          
          <div className='myshows_container'>
            {likedShows.length === 0 ? (
              <div className="empty_message">
                <img src={errorImg} alt="에러 아이콘 이미지" />
                <p>{`나의 공연이\n 비어있습니다.`}</p>
              </div>
            ) : (
              likedShows.map((show, index) => (
                <div className="myshow_card" key={index}>
                  <div className="img_wrap">
                    <img className="show_img"
                      src={getImageUrl(show.image) || defaultImg}
                      alt={show.title}
                      onError={(e) => (e.target.src = defaultImg)}
                    />
                  </div>
                  <div className="show_info">
                    <span className="genre_tag">{show.genre}</span>
                    <p className="title">{show.title}</p>
                    <p className="audience">관람 연령: {show.audience || '정보 없음'}</p>
                    <p className='eventPeriod'>공연 시간:{show.eventPeriod}</p>
                    <p className="period">{`공연 기간:\n ${show.period || '정보 없음'}`}</p>
                    <div className="buttons">
                      <button className="reserve_btn" onClick={() => window.open(show.url, '_blank')}>
                        예매하기
                      </button>
                      <button className="remove_btn" onClick={() => handleRemove(show.title)}>
                        해제
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <TabBar />
      </div>
    </>
  );
}

export default MyShowsPage;
