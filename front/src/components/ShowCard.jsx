import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// image import
import defaultImg from '../images/home_preview_01.png';
import LikedBtn from './LikedBtn';

function getImageUrl(imageObject) {
    if (!imageObject) return '';
    // 문자열일때
    if (typeof imageObject === 'string') {
      return imageObject;
    }
    // 배열일때
    if (Array.isArray(imageObject)) {
      const first = imageObject[0];
      if (typeof first === 'string') return first;
      if (typeof first === 'object') return first.imageUrl || Object.values(first)[0] || '';
    }
    // 객체일때
    if (typeof imageObject === 'object') {
      return imageObject.imageUrl || Object.values(imageObject)[0] || '';
    }
    return '';
  }
  

function ShowCard({ title, genre, image, audience, period, url, charge, description }) {
  const navigate = useNavigate();
  const imgSrc = getImageUrl(image) || defaultImg;

  
  const showBtn = (show) => {
    const selectedShow = {
      TITLE: show.TITLE,
      GENRE: show.GENRE,
      PERIOD: show.PERIOD,
      AUDIENCE: show.AUDIENCE,
      CHARGE: show.CHARGE,
      DESCRIPTION: show.DESCRIPTION,
      IMAGE_OBJECT: show.IMAGE_OBJECT,
      URL: show.URL,
    };

    sessionStorage.setItem("selectedShow", JSON.stringify(selectedShow));
    navigate('/contents');
  };

  return (
    <div className="search_card" onClick={() =>
      showBtn({
        TITLE: title,
        GENRE: genre,
        PERIOD: period,
        AUDIENCE: audience,
        CHARGE: charge,
        DESCRIPTION: description,
        IMAGE_OBJECT: image,
        URL: url,
      })
    }>
      <div className="img_wrap">
        <img
          className="show_img"
          src={imgSrc}
          alt={title}
          onError={(e) => (e.target.src = defaultImg)}
        />
      </div>

      <div className="show_info">
        <span className="genre_tag">{genre}</span>
        <div className="show_title_like">
          <p className="title">{title}</p>
          <LikedBtn 
            title={title}
            genre={genre}
            image={image}
            audience={audience}
            period={period}
            url={url} />
        </div>
      </div>
    </div>
  );
  
}

export default ShowCard;
