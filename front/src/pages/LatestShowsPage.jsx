import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import ShowCard from '../components/ShowCard';
import { publicData } from '../api/api';
import '../styles/myshows.scss';

// image import
import prevBtn from "../images/public_prev_01.png";

function LatestShowsPage() {
    const navigate = useNavigate();
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const fetchShowData = async () => {
            const res = await publicData({ numOfRows: 100 });
            const items = res.response.body.items.item;

            const processed = (Array.isArray(items) ? items : [items]).map(item => ({
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
            setShowData(processed);
        };

        fetchShowData();
    }, []);

    const prev = () => {
        navigate('/home');
    };

    return (
        <>
            <div className='main_container'>
            <Header />
            </div>

            <div>
                <div className="selected_genre">
                    <img src={prevBtn} onClick={prev} alt="이전버튼 아이콘 이미지" />
                    <p>최신 공연</p>
                </div>

                <div className='category_results_grid'>
                    {showData.map((item, index) => (
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
                    ))}
                </div>

                <TabBar />
            </div>
        </>
    );
}

export default LatestShowsPage;