import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/mypage.scss';

// image
import starIcon from '../images/myshows_star_03.png';
import filledStar from '../images/myshows_star_04.png';

function MyPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loginType, setLoginType] = useState('');
  const [accordionState, setAccordionState] = useState(null);
  const [ratedShows, setRatedShows] = useState({});

  useEffect(() => {
    const loginTypeStorage = localStorage.getItem("loginType");
    const kakaoUser = JSON.parse(sessionStorage.getItem("user"));
    const naverProfile = JSON.parse(localStorage.getItem("profile"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (loginTypeStorage === 'kakao' && kakaoUser?.nickname) {
      setUserName(kakaoUser.nickname);
      setEmail('-');
      setPhone('-');
      setLoginType('카카오 로그인');
    } else if (loginTypeStorage === 'naver' && naverProfile?.nickname) {
      setUserName(naverProfile.nickname);
      setEmail(naverProfile.email || '-');
      setPhone(naverProfile.mobile || '-');
      setLoginType('네이버 로그인');
    } else if (loginTypeStorage === 'local' && currentUser?.nickname) {
      setUserName(currentUser.nickname);
      setEmail(currentUser.email || '-');
      setPhone(currentUser.phone || '-');
      setLoginType('자체 로그인');
    } else {
      setUserName("Guest");
      setEmail("-");
      setPhone("-");
      setLoginType('');
    }
  
    const ratingData = JSON.parse(sessionStorage.getItem("rating_shows")) || {};
    setRatedShows(ratingData);
  }, []);
  
  

  const toggleAccordion = (star) => {
    setAccordionState(prev => (prev === star ? null : star));
  };

  const logout = async () => {
    const access_token = window.sessionStorage.getItem("access");
    if (access_token) {
      try {
        await axios.post(`${process.env.REACT_APP_APIURL}/kakao/logout`, { access_token });
      } catch (error) {
        console.error("카카오 로그아웃 오류:", error);
      }
    }
    sessionStorage.clear();
    localStorage.removeItem('profile');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginType');
    navigate('/onboarding');
  };
  

  const renderStars = (starCount) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<img key={i} src={filledStar} alt="Filled Star" className="star" />);
      } else {
        stars.push(<img key={i} src={starIcon} alt="Empty Star" className="star" />);
      }
    }
    return stars;
  };

  return (
    <div className='main_container'>
      <Header />
      <div className='mypage_title'>
        <p>{`${userName} 님 반갑습니다!\n오늘도 좋은 공연되세요`}<span>{`:)`}</span></p>
      </div>

      <div className='user_information'>
        <span>내 정보</span>
        <div className="line"/>
        <div className="information">
          <div className="left">
            <p>닉네임</p>
            <p>이메일</p>
            <p>전화번호</p>
            <p>로그인 유형</p>
          </div>
          <div className="right">
            <p>{userName}</p>
            <p>{email || '-'}</p>
            <p>{phone || '-'}</p>
            <p>{loginType || '-'}</p> {/* 로그인 유형 표시 */}
          </div>
        </div>
      </div>

      <div className='user_information'>
        <span>공연에 남긴 스타점수</span>
        <div className="line"/>
        <div className="star_ratings">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="accordion">
              <div className="accordion_header" onClick={() => toggleAccordion(star)}>
                <div>{renderStars(star)}</div>
              </div>
              {accordionState === star && (
                <div className="accordion_content">
                  {ratedShows[star] && ratedShows[star].length > 0 ? (
                    <p>▶ {ratedShows[star].join(', ')}</p>
                  ) : (
                    <p>해당 스타점수를 남긴 공연이 없습니다.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={logout} className='logout_btn'>로그아웃</button>
      <TabBar />
    </div>
  );
}

export default MyPage;
