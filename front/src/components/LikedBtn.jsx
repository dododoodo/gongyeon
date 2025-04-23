import React, { useEffect, useState } from 'react'

// image import
import starIcon from '../images/search_star_01.png';
import filledStar from '../images/myshows_star_01.png';

function LikedBtn({ title, genre, image, audience, period, url }) {
    const [liked, setLiked] = useState(false);

    // 세션스토리지에 별 클릭한 공연정보 저장
    useEffect(() => {
        // 별 클릭한 상태를 세션 likedShows에 저장
        const stored = JSON.parse(sessionStorage.getItem('likedShows')) || [];
        const isLiked = stored.some((item) => item.title === title);
        setLiked(isLiked);
    }, [title]);

    // 별 버튼 토글
    const toggleLike = (e) => {
        e.stopPropagation(); // 상위 요소 클릭 막기
        const stored = JSON.parse(sessionStorage.getItem('likedShows')) || [];

        // 이미 나의 공연에 담은 경우 (별을 누른 경우)에 클릭하면
        if (liked) {
            // 별을 해제 -> 나의 공연에서 삭제
            const updated = stored.filter((item) => item.title !== title);
            sessionStorage.setItem('likedShows', JSON.stringify(updated));
            setLiked(false);
        } else {
        // 별이 안 눌러져 있는 경우
        const newItem = { title, genre, image, audience, period, url, };
        sessionStorage.setItem('likedShows', JSON.stringify([...stored, newItem]));
        setLiked(true);
        }
    };


    return (
        <>
            <button className="like_btn" onClick={toggleLike}>
                <img src={liked ? filledStar : starIcon} alt="찜 버튼 아이콘 이미지"/>
            </button>
        </>
    )
}

export default LikedBtn