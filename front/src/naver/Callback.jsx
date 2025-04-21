import React, { useEffect } from 'react'
import axios from 'axios'

function Callback() {
    const hash = window.location.hash.replace('#','?')
    const param = new URLSearchParams(hash);
    const access_token = param.get('access_token');

    useEffect(() => {
        axios({
            method:"get",
            url: `${process.env.REACT_APP_APIURL}/naver`,
            params:{access_token}
        })
        .then(res => {
            const str = JSON.stringify(res.data.response);
            window.localStorage.setItem('profile', str);
        
            const userData = {
                nickname: res.data.response.nickname || "네이버 사용자",
                email: res.data.response.email || '-',
                phone: res.data.response.phone || '-',
                loginType: '네이버'
            };
        
            window.sessionStorage.setItem("user", JSON.stringify(userData));
            window.sessionStorage.setItem("isLoggedIn", "true");

            localStorage.setItem("loginType", "naver");
            
            window.opener.location.href = "/home";
            window.close();
        })
        .catch(error => {
            console.error("네이버 로그인 오류:", error);
        });
        
    }, []);
    

    return (
        <div>로그인 되었습니다.</div>
    )
}

export default Callback