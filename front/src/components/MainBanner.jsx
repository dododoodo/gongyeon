import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../images/home_banner_01.png';

const checkImageValid = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

function MainBanner({ onLoad }) {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState(""); // 배경 이미지
  const [title, setTitle] = useState(""); // 제목
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userName, setUserName] = useState(''); // 사용자 이름
  const [selectedShow, setSelectedShow] = useState(null); // 선택된 공연 정보

  // 유저 이름 설정
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const storedUserName = localStorage.getItem('userName');
    const naverProfile = JSON.parse(localStorage.getItem('profile'));

    if (loggedInUser?.nickname) setUserName(loggedInUser.nickname);
    else if (storedUserName) setUserName(storedUserName);
    else if (naverProfile?.nickname) setUserName(naverProfile.nickname);
    else setUserName("Guest");
  }, []);

  // 배경 이미지 설정
  useEffect(() => {
    const randomImage = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        const data = await response.json();

        let items = data?.response?.body?.items?.item || [];
        if (!Array.isArray(items)) items = Object.values(items);

        const validItems = items
          .filter(item => item.IMAGE_OBJECT && item.IMAGE_OBJECT !== "")
          .sort(() => 0.5 - Math.random());

        for (const item of validItems) {
          let imageUrl = item.IMAGE_OBJECT;
          if (typeof imageUrl === "object") {
            imageUrl = imageUrl.imageUrl || Object.values(imageUrl)[0];
          }

          const isValid = await checkImageValid(imageUrl);
          if (isValid) {
            const img = new Image();
            img.onload = () => {
              setBackgroundImage(imageUrl);
              setTitle(item.TITLE);
              setSelectedShow(item);
              setImageLoaded(true);
              onLoad?.();
            };
            img.src = imageUrl;
            return;
          }
        }
      } catch (error) {
        console.error('이미지 가져오기 오류:', error);
      }
    };

    randomImage();
  }, [onLoad]);

  const moreBtn = () => {
    if (selectedShow) {
      sessionStorage.setItem("selectedShow", JSON.stringify(selectedShow));
    }
    navigate('/contents');
  };

  return (
    <>
      <button className="more_btn" onClick={moreBtn}>
        상세보기 <img src={arrow} alt="화살표 아이콘 이미지" />
      </button>

      <p className="banner_text">
        {`반가워요 ${userName} 님!\n오늘은 ‘${title}’\n공연은 어떠세요?`}
      </p>

      {imageLoaded && (
        <div
          className="main_banner_img"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: 'transparent',
          }}
        />
      )}

      {!imageLoaded && (
        <div
          className="main_banner_img"
          style={{
            backgroundColor: '#000',
            height: '250px',
            width: '100%',
          }}
        />
      )}

      <div className="box1"></div>
    </>
  );
}

export default MainBanner;
