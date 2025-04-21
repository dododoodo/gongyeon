import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/onboarding.scss";
import { motion, AnimatePresence } from "framer-motion";

// image import
import prevBtn from "../../images/public_prev_01.png";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // 유효성 검사 정규식
  const EMAIL_REGEX = /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const PASSWORD_REGEX = /^[A-Za-z0-9]{4,}$/;
  const PHONE_REGEX = /^[0-9]+$/;

  // 조건에 따른 에러 문구 표시
  function signUpSubmit(e) {
    e.preventDefault();

    if (!nickname && !email && !password && !phone) {
        setErrorMessage("정보를 입력하지 않았습니다.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!nickname) {
        setErrorMessage("닉네임을 입력해주세요.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!email) {
        setErrorMessage("이메일을 입력해주세요.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!EMAIL_REGEX.test(email)) {
        setErrorMessage("이메일 형식이 올바르지 않습니다.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!password) {
        setErrorMessage("비밀번호를 입력해주세요.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!PASSWORD_REGEX.test(password)) {
        setErrorMessage("비밀번호는 4자 이상, 영문 또는 숫자로 입력해주세요.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!phone) {
        setErrorMessage("전화번호를 입력해주세요.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    if (!PHONE_REGEX.test(phone)) {
        setErrorMessage("전화번호는 숫자만 입력할 수 있습니다.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }
    
    if (phone.length < 6) {
        setErrorMessage("전화번호는 최소 6자 이상 입력해야 합니다.");
        setTimeout(() => setErrorMessage(false), 2000);
        return;
    }

    // 저장된 유저 정보 가져오기
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const termsAgreed = JSON.parse(localStorage.getItem("termsAgreed")) || [];

    const newUser = {
        email,
        password,
        nickname,
        phone,
        termsAgreed,
    };

    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    navigate("/success");
}

  // 이전 버튼
  function prev() {
    navigate("/terms");
  }
  return (
    <div className="total_container">
      {/* 헤더 */}
      <header>
        <button onClick={prev}>
          <img src={prevBtn} alt="이전 버튼" />
        </button>
        <span>회원가입</span>
      </header>

      <form onSubmit={signUpSubmit}>
        <p>닉네임<span className="required">*</span></p>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <p>이메일<span className="required">*</span></p>
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>비밀번호<span className="required">*</span></p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>전화번호<span className="required">*</span></p>
        <input
          type="tel"
          placeholder="전화번호를 입력해주세요."
          value={phone}
          onChange={(e) => {
            if (PHONE_REGEX.test(e.target.value) || e.target.value === "")
              setPhone(e.target.value);
          }}
        />

        {/* 에러 메시지 */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;
