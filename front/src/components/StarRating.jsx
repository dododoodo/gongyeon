import React, { useState, useEffect } from 'react';

import starIcon from '../images/myshows_star_03.png';
import filledStar from '../images/myshows_star_04.png';

function StarRating({ showTitle }) {
  const [rating, setRating] = useState(0);

  // 초기 스타점수 불러오기
  useEffect(() => {
    const stored = sessionStorage.getItem("rating_shows");
    if (stored && showTitle) {
      // 문자열->객체로 변환
      const parsed = JSON.parse(stored);
      // 점수 한개씩 꺼내서 확인하기
      for (let score in parsed) {
        // 점수 목록에 지금 보는 공연 타이틀이 있으면
        if (parsed[score].includes(showTitle)) {
          // 그 점수를 숫자로 바꿔서 rating에 저장시킨다
          setRating(Number(score));
          break;
        }
      }
    }
  }, [showTitle]);

  const handleClick = (index) => {
    // ☆ 인덱스와 점수(1~5) 동일하게 맞추기
    const newRating = index + 1;
    setRating(newRating);

    if (!showTitle) return;

    // 기존 스타점수 데이터를 가져옴 or 점수 배열 생성
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
