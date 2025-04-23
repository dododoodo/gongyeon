import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/components.scss';

function Redirect() {
    const navigate = useNavigate();
    const search = window.location.search;
    const param = new URLSearchParams(search);
    const code = param.get("code");
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!code) return;

        // 카카오 로그인 후, 받은 데이터로 세션에 정보 저장
        axios.get(`${process.env.REACT_APP_APIURL}/kakao`, { params: { code } })
        .then((res) => {
            console.log("카카오 로그인 응답 데이터:", res.data);
            const { access_token, properties, kakao_account } = res.data;

            const userData = {
                nickname: properties?.nickname || kakao_account?.profile?.nickname,
                email: kakao_account?.email || '-',  // 이메일 저장
                phone: kakao_account?.phone_number || '-',  // 전화번호 저장
                loginType: '카카오'
            };

            window.sessionStorage.setItem("access", access_token);
            window.sessionStorage.setItem("user", JSON.stringify(userData));
            window.sessionStorage.setItem("isLoggedIn", "true");

            localStorage.setItem("loginType", "kakao");

            setUser(userData);
            navigate("/home");
        })
        .catch(error => {
            console.error("카카오 로그인 오류:", error);
        });

    }, [code, navigate]);
    


    return <div className="kakaoLogin">{user ? user.nickname : "로그인을 진행하고 있습니다."}</div>;
}

export default Redirect;
