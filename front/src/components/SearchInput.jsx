import React from 'react'
// image import
import searchInput from "../images/search_input_01.png";


function SearchInput({ value, onChange }) {
    return (
      <div className="search_input">
        <input
          type="text"
          placeholder="보고싶은 공연을 검색하세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <figure>
          <img src={searchInput} alt="돋보기 아이콘 이미지" />
        </figure>
      </div>
    );
  }
  
export default SearchInput