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
    // currentUser를 로컬에서 꺼내서
    const handleStorageChange = () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      // currentUser에 nickname이 있으면 setUserName으로 저장
      if (currentUser?.nickname) {
        setUserName(currentUser.nickname);
      }
    };
    // 로컬의 변경 감지
    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  

  // 배경 이미지 설정
  useEffect(() => { 
    const randomImage = async () => {
      // 공연 데이터 불러오기
      const response = await fetch('/data.json');
      const data = await response.json();

      // 데이터에서 아이템 추출
      let items = data?.response?.body?.items?.item || [];
      if (!Array.isArray(items)) items = Object.values(items);

      // 20개의 정보만 사용
      items = items.slice(0, 20);

      const validItems = items
        .filter(item => item.IMAGE_OBJECT && item.IMAGE_OBJECT !== "")
        .sort(() => 0.5 - Math.random());

      for (const item of validItems) {
        let imageUrl = item.IMAGE_OBJECT;
        // 객체 형태이면 변경
        if (typeof imageUrl === "object") {
          imageUrl = imageUrl.imageUrl || Object.values(imageUrl)[0];
        }

        const isValid = await checkImageValid(imageUrl);
        if (isValid) {
          // 유효한 이미지는 배경으로 설정
          const img = new Image();
          img.onload = () => {
            setBackgroundImage(imageUrl);
            setTitle(item.TITLE);
            setSelectedShow(item); // 선택한 공연 정보 저장
            setImageLoaded(true);
            onLoad?.();
          };
          img.src = imageUrl;
          return;
        }
      }
    };
    randomImage();
    // onLoad가 바뀌면 다시 실행
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
        <div className="main_banner_img"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: 'transparent'}}
          />
      )}

      <div className="box1"></div>
    </>
  );
}

export default MainBanner;
