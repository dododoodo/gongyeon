import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ShowCard from '../components/ShowCard';

import '../styles/components.scss';

function SearchResults({ keyword }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data.json');
        const result = await response.json();
        const items = result?.response?.body?.items?.item || [];

        // 검색어로 필터링
        const filteredData = items.filter((item) =>
          item.TITLE.toLowerCase().includes(keyword.toLowerCase())
        );

        setData(filteredData);
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [keyword]);

  if (!keyword) return <p className="search_message">검색어를 입력해주세요.</p>;

  if (loading) {
    return (
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
    );
  }

  if (!loading && data.length === 0) {
    return <p className="not_message">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="search_results_grid">
      {data.map((item, index) => (
        <ShowCard
          key={item.id || index}
          title={item.TITLE}
          genre={item.GENRE}
          image={item.IMAGE_OBJECT || '기본이미지.png'}
          audience={item.AUDIENCE}
          period={item.PERIOD}
          eventPeriod={item.EVENT_PERIOD}
          charge={item.CHARGE}
          description={item.DESCRIPTION}
          url={item.URL}
        />
      ))}
    </div>
  );
}

export default SearchResults;
