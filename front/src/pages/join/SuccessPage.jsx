import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// image import
import success from "../../images/public_success_01.png";

function SuccessPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("회원");

  useEffect(() => {
    const userData = window.sessionStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setNickname(user.nickname || "회원");
    }
  }, []);

  const next = () => {
    navigate("/home");
  };

  return (
    <div className="total_container">
      {/* 헤더 */}
      <header>
        <span>회원가입</span>
      </header>

      <div className="success_text">
        <figure><img src={success} alt="축하 이미지" /></figure>
        <h3>{`${nickname} 님!\n회원가입을 축하합니다.`}</h3>
        <p>{`이제 공연본당에서 원하는 공연을\n자유롭게 찾아보세요.`}</p>
      </div>

      {/* 다음 버튼 */}
      <button className='nextBtn' onClick={next}>
        다음
      </button>
    </div>
  );
}

export default SuccessPage;
