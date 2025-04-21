import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/onboarding.scss";

// image import
import prevBtn from "../images/public_prev_01.png";
import starIcon from '../images/search_star_01.png';
import filledStar from '../images/myshows_star_01.png';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function loginSubmit(e) {
    e.preventDefault();
  
    if (!email && !password) {
      setErrorMessage("정보를 입력하지 않았습니다.");
      setTimeout(() => setErrorMessage(false), 2000);
      return;
    }
  
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }
  
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = savedUsers.find(
      (user) => user.email === email && user.password === password
    );
  
    if (foundUser) {
      const userName = foundUser.nickname || foundUser.name || "사용자";
  
      localStorage.setItem("userName", userName);
      sessionStorage.setItem("user", JSON.stringify({ nickname: userName }));
      sessionStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      localStorage.setItem("loginType", "local"); 
  
      navigate("/home");
    } else {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      setTimeout(() => setErrorMessage(""), 2000);
    }
  }
  
  

  function prev() {
    navigate("/onboarding");
  }

  return (
    <div className="total_container">
      <header>
        <button onClick={prev}>
          <img src={prevBtn} alt="이전 버튼" />
        </button>
        <span>로그인</span>
      </header>

      <div className="login_container">
        <form onSubmit={loginSubmit}>
          <p>
            이메일<span className="required">*</span>
          </p>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>
            비밀번호<span className="required">*</span>
          </p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
              아이디 또는 비밀번호가 일치하지 않습니다.
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
