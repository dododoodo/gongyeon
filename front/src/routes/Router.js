import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import OnboardingPage from "../pages/OnboardingPage";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import MyShowsPage from "../pages/MyShowsPage";
import MyPage from "../pages/MyPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/join/SignUpPage";
import TermsPage from "../pages/join/TermsPage";
import Redirect from '../kakao/Redirect';
import Callback from '../naver/Callback';
import SuccessPage from "../pages/join/SuccessPage";
import ContentsPage from "../pages/ContentsPage";
import CategoryPage from "../pages/CategoryPage";
import LatestShowsPage from "../pages/LatestShowsPage";

function AppRouter() {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = () => sessionStorage.getItem('user');

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/onboarding');
        }
    }, [navigate, location.pathname]);

    return (
        <div className="App">
            <main>
                <Routes>
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path='/kakao/redirect' element={ <Redirect/> }/>
                    <Route path='/naver/callback' element={ <Callback/> }/>
                    <Route path="/contents" element={<ContentsPage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/latest" element={<LatestShowsPage />} />

                    <Route path="/home" element={isLoggedIn() ? <MainPage /> : <Navigate to="/onboarding" />} />
                    <Route path="/search" element={isLoggedIn() ? <SearchPage /> : <Navigate to="/onboarding" />} />
                    <Route path="/myshows" element={isLoggedIn() ? <MyShowsPage /> : <Navigate to="/onboarding" />} />
                    <Route path="/mypage" element={isLoggedIn() ? <MyPage /> : <Navigate to="/onboarding" />} />
                </Routes>
            </main>
        </div>
    );
}

export default AppRouter;
