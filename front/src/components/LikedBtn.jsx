import React, { useEffect, useState } from 'react';
import starIcon from '../images/search_star_01.png';
import filledStar from '../images/myshows_star_01.png';

function LikedBtn({ title, genre, image, audience, period, url, charge }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem('likedShows')) || [];
        const isLiked = stored.some((item) => item.title === title);
        setLiked(isLiked);
    }, [title]);

    const toggleLike = (e) => {
        e.stopPropagation();
        const stored = JSON.parse(sessionStorage.getItem('likedShows')) || [];

        if (liked) {
        const updated = stored.filter((item) => item.title !== title);
        sessionStorage.setItem('likedShows', JSON.stringify(updated));
        setLiked(false);
        } else {
        const newItem = { title, genre, image, audience, period, url, charge };
        sessionStorage.setItem('likedShows', JSON.stringify([...stored, newItem]));
        setLiked(true);
        }
    };

    return (
        <button className="like_btn" onClick={toggleLike}>
        <img src={liked ? filledStar : starIcon} alt="찜 버튼 아이콘 이미지" />
        </button>
    );
}

export default LikedBtn;
