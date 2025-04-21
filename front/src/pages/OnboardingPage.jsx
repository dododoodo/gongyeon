import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.scss';
import NaverLogin from 'react-naver-login';


// img import
import logo1 from '../images/public_logo_01.png'; // 로고 1

function OnboardingPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // ***Kakao Login
    const client_id = "f26d70de4f91fb13430539fe82bcebfc";
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT;
    const response_type = "code";
    const url = `https://kauth.kakao.com/oauth/authorize`;
    
    // ***Naver Login
    const clientId = 'afiT5svJR3GguTViJBwY';
    const callbackUrl = `${window.location.origin}/naver/callback`;

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/home');
        } else {
            setLoading(false);
        }
    }, [navigate]);

    if (loading) {
        return <div className="loading">로딩 중...</div>;
    }

    function login() {
        navigate('/login');
    }

    function signUp() {
        navigate('/terms');
    }

    function kLogin() {
        window.location.href = `${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
    }

    return (
        <div className="onboarding">
            <div className='box1'></div>
            <div className='onboarding_logo'>
                <p>예술의전당 공연을 한번에!</p>
                <figure><img src={logo1} alt='공연본당 로고 이미지-1'/></figure>
            </div>

            <div className='login_buttons'>
                <button onClick={login}>로그인</button>
                <button onClick={kLogin}>카카오톡 간편로그인</button>
                <NaverLogin
                    clientId={clientId}
                    callbackUrl={callbackUrl}
                    render={(props) => 
                        <button className='naver_login' onClick={props.onClick}>
                            네이버 간편로그인
                        </button>
                    }
                    onSuccess={(naverUser) => {
                        const profile = naverUser.response;
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('loggedInUser', JSON.stringify(profile));
                        localStorage.setItem('userName', profile.name || profile.nickname || '사용자');
                    }}
                    onFailure={(result) => console.error(result)}
                />
                <button onClick={signUp}>회원가입</button>
            </div>
        </div>
    );
}

export default OnboardingPage;
