import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import SearchInput from '../components/SearchInput';
import { publicData } from '../api/api';
import ShowCard from '../components/ShowCard';
import '../styles/myshows.scss';
import { motion } from 'framer-motion';

// image import
import prevBtn from "../images/public_prev_01.png";
import errorImg from "../images/myshows_error_01.png";

function CategoryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedGenre = state?.selectedGenre || '';
  const [query, setQuery] = useState('');
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const genreMap = {
    '클래식': 'Classic Music',
    '성악': 'Vocal Music',
    '실내악': 'Chamber Music',
    '독주': 'Recital',
    '뮤지컬': 'Musical',
    '오페라': 'Opera',
    '콘서트': 'Concert',
    '무용': 'Dance',
    '교향곡': 'Symphony',
  };

  useEffect(() => {
    const fetchGenreData = async () => {
      setLoading(true);
      try {
        const res = await publicData({ numOfRows: 100 });
        const items = res.response.body.items.item;

        const filtered = (Array.isArray(items) ? items : [items]).filter(item => 
          item.GENRE && item.GENRE.includes(selectedGenre)
        );

        const processed = filtered.map(item => ({
          title: item.TITLE || '제목 없음',
          image: item.IMAGE_OBJECT || null,
          genre: item.GENRE || '장르 없음',
          audience: item.AUDIENCE || '정보 없음',
          period: item.PERIOD || '정보 없음',
          eventPeriod: item.EVENT_PERIOD || '정보 없음',
          charge: item.CHARGE || '정보 없음',
          description: item.DESCRIPTION || '정보 없음',
          url: item.URL || '',
        }));
        

        setGenreData(processed);
      } catch (error) {
        console.error("공연 데이터 로딩 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
  }, [selectedGenre]);

  const filteredData = genreData.filter(show =>
    show.title.toLowerCase().includes(query.toLowerCase())
  );

  const prev = () => {
    navigate("/search");
  };

  return (
    <div className='main_container'>
      <Header />
      <SearchInput value={query} onChange={setQuery} />

      <div className="selected_genre">
        <img src={prevBtn} onClick={prev} alt="이전버튼 아이콘 이미지" />
        <p>{selectedGenre} - {genreMap[selectedGenre]}</p>
      </div>

      {loading ? (
        <div className="loading_wrapper">
          <div className="dot_bounce_wrapper">
            <motion.span
              className="dot"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >.</motion.span>
            <motion.span
              className="dot"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            >.</motion.span>
            <motion.span
              className="dot"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            >.</motion.span>
          </div>
          <p className="search_message">공연을 찾고 있어요</p>
        </div>
      ) : (
        <div className='category_results_grid'>
          {filteredData.length === 0 ? (
            <div className='category_results_box'>
              <img src={errorImg} alt="에러 아이콘 이미지" />
              <p className='no_text'>현재 진행중인 <br /> ' {selectedGenre} ' 공연은 없습니다.</p>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <ShowCard
                key={index}
                title={item.title}
                genre={item.genre}
                image={item.image}
                audience={item.audience}
                period={item.period}
                charge={item.charge}
                description={item.description}
                url={item.url}
              />
            ))
          )}
        </div>
      )}

      <TabBar />
    </div>
  );
}

export default CategoryPage;
