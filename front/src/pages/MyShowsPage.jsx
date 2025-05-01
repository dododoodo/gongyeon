import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import '../styles/myshows.scss';

// image import
import star from "../images/myshows_star_01.png";
import defaultImg from "../images/home_preview_01.png";
import errorImg from "../images/myshows_error_01.png";

// 이미지 URL 꺼내기
function getImageUrl(imageObject) {
  return typeof imageObject === 'string' ? imageObject : '';
}

function MyShowsPage() {
  const [userName, setUserName] = useState('');
  const [likedShows, setLikedShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser?.nickname) {
      setUserName(currentUser.nickname);
    }
    const stored = JSON.parse(sessionStorage.getItem('likedShows')) || [];
    setLikedShows(stored);
  }, []);
  

  const handleRemove = (title) => {
    // likedShows에 타이틀이 포함되어 있으면 삭제
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
                      onClick={() => navigate('/contents', { state: show })}
                    />
                  </div>
                  <div className="show_info">
                    <span className="genre_tag">{show.genre}</span>
                    <p className="title">{show.title}</p>
                    <p className="audience">관람 연령: {show.audience}</p>
                    <p className="period">{`공연 기간:\n ${show.period}`}</p>
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
