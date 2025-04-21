import React, { useState, useEffect } from 'react';

import starIcon from '../images/myshows_star_03.png';
import filledStar from '../images/myshows_star_04.png';

function StarRating({ showTitle }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("rating_shows");
    if (stored && showTitle) {
      const parsed = JSON.parse(stored);
      for (let score in parsed) {
        if (parsed[score].includes(showTitle)) {
          setRating(Number(score));
          break;
        }
      }
    }
  }, [showTitle]);

  const handleClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);

    if (!showTitle) return;

    // 공연을 점수별로 세션에 저장
    const stored = sessionStorage.getItem("rating_shows");
    let ratings = stored ? JSON.parse(stored) : { "1": [], "2": [], "3": [], "4": [], "5": [] };

    // 먼저 다른 점수에 이미 존재하는 공연 제거
    for (let score in ratings) {
      ratings[score] = ratings[score].filter(title => title !== showTitle);
    }

    // 새 점수에 추가
    if (!ratings[newRating]) ratings[newRating] = [];
    ratings[newRating].push(showTitle);

    sessionStorage.setItem("rating_shows", JSON.stringify(ratings));
  };

  return (
    <div className="star_rating">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < rating ? filledStar : starIcon}
          onClick={() => handleClick(index)}
          className='rating_btn'
        />
      ))}
    </div>
  );
}

export default StarRating;
