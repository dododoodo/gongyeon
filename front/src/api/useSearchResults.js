import { useState, useEffect } from 'react';

function useSearchResults(keyword) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!keyword) {
      setData([]);
      setHasSearched(false);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setHasSearched(true);
      try {
        const response = await fetch('/data.json'); 
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        
        const items = data?.response?.body?.items?.item || [];

        // 검색어로 필터링
        const filteredItems = items.filter(item =>
          item.TITLE?.toLowerCase().includes(keyword.toLowerCase())
        );

        // 필요한 데이터만 추출
        const processedItems = filteredItems.map(item => ({
          title: item.TITLE || '제목 없음',
          image: item.IMAGE_OBJECT || null,
          genre: item.GENRE || '장르 없음',
          audience: item.AUDIENCE || '연령 정보 없음',
          period: item.PERIOD || '기간 정보 없음',
          eventPeriod: item.EVENT_PERIOD || '정보 없음',
          charge: item.CHARGE || '요금 정보 없음', 
          description: item.DESCRIPTION || '설명 없음',
          url: item.URL || '', 
        }));

        setData(processedItems);
      } catch (error) {
        console.error('검색 결과를 가져오는 중 오류 발생:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return { data, loading, hasSearched };
}

export default useSearchResults;
