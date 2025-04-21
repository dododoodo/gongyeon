import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/onboarding.scss";

// image import
import prevBtn from "../../images/public_prev_01.png";

function TermsPage() {
  const navigate = useNavigate();
  const [checkItems, setCheckItems] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);

  const data = [
    {
      id: 0,
      title: "만 14세 이상",
      contents: "만 14세 미만은 공연본당 서비스를 이용할 수 없습니다.",
      required: true,
    },
    {
      id: 1,
      title: "서비스 이용약관 동의",
      contents: "서비스 이용 약관 내용...",
      required: true,
    },
    {
      id: 2,
      title: "개인정보 처리방침 동의",
      contents: "개인정보 처리방침 내용...",
      required: true,
    },
    { id: 3, title: "이벤트, 혜택 소식 이메일로 수신하기", required: false },
  ];

  // 체크박스 개별 선택
  const selectChecked = (checked, id) => {
    if (checked) setCheckItems([...checkItems, id]);
    else setCheckItems(checkItems.filter((el) => el !== id));
  };

  // 체크박스 전체 선택
  const allChecked = (checked) => {
    if (checked) setCheckItems(data.map((el) => el.id));
    else setCheckItems([]);
  };

  // 펼치기/접기 기능
  const toggleContent = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 이전 버튼
  const prev = () => {
    navigate("/onboarding");
  };

  // 다음 버튼 클릭 시
  const next = (e) => {
    e.preventDefault();
    const requiredIds = data
      .filter((item) => item.required)
      .map((item) => item.id);
    const allChecked = requiredIds.every((id) => checkItems.includes(id));

    if (allChecked) {
      localStorage.setItem("termsAgreed", JSON.stringify(checkItems));
      navigate("/signup");
    } else {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 2000);
    }
  };

  return (
    <div className="total_container">
      {/* 헤더 */}
      <header>
        <button onClick={prev}>
          <img src={prevBtn} alt="이전 버튼" />
        </button>
        <span>약관동의</span>
      </header>

      {/* 약관 동의 목록 */}
      <div className="term_container">
        <div className="term_top">
          <label>
            <input
              type="checkbox"
              name="all-checked"
              onChange={(e) => allChecked(e.target.checked)}
              checked={checkItems.length === data.length}
            />
            전체 동의
          </label>
          <p>
            <span className="required">*</span> 표시는 필수 동의 항목입니다.
          </p>
        </div>

        <form className="term_bottom">
          {data.map((item) => (
            <div key={item.id}>
              <label>
                <input
                  type="checkbox"
                  name="select-checked"
                  onChange={(e) => selectChecked(e.target.checked, item.id)}
                  checked={checkItems.includes(item.id)}
                />
                {item.title}{" "}
                {/* data에서 id=3인 항목은 * 제외 */}
                {item.required && item.id !== 3 && (<span className="required">*</span>)}
              </label>
              
            {/* data에서 id=3인 항목은 자세히보기 제외 */}
              {item.id !== 3 && (
                <a href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleContent(item.id);
                  }}
                >
                  {openItems[item.id] ? "닫기" : "자세히 보기"}
                </a>
              )}
              {openItems[item.id] && <p>{item.contents}</p>}
            </div>
          ))}

          {/* 다음 버튼 */}
          <button type="submit" onClick={next}>
            다음
          </button>
        </form>
        <AnimatePresence>
            {errorMessage && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="required">*</span> 모든 필수 약관에 동의해야 합니다.
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}

export default TermsPage;