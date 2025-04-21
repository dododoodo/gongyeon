import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/contents.scss';
import Header from '../components/Header'
import TabBar from '../components/TabBar'
import LikedBtn from '../components/LikedBtn';
import StarRating from '../components/StarRating';

import defaultImg from '../images/home_preview_01.png'
import Footer from '../components/Footer';

function ContentsPage() {
  const location = useLocation();
  const [userName, setUserName] = useState("Guest"); // 유저이름
  const [comment, setComment] = useState(""); // 한줄평
  const [comments, setComments] = useState([]);
  
  const [backgroundImage, setBackgroundImage] = useState(""); 
  const [selectedShow, setSelectedShow] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // 유저 이름
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const storedUserName = localStorage.getItem('userName');
    const naverProfile = JSON.parse(localStorage.getItem('profile'));
  
    if (loggedInUser?.nickname) setUserName(loggedInUser.nickname);
    else if (storedUserName) setUserName(storedUserName);
    else if (naverProfile?.nickname) setUserName(naverProfile.nickname);
    else setUserName("Guest");
  }, []);

  
  

  useEffect(() => {
    const showFromState = location.state?.show;
  
    if (showFromState) {
      setSelectedShow(showFromState);
      const img = showFromState.IMAGE_OBJECT || showFromState.image || "";
      setBackgroundImage(img);
      sessionStorage.setItem("selectedShow", JSON.stringify(showFromState));
    } else {
      const stored = sessionStorage.getItem("selectedShow");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedShow(parsed);
        const img = parsed.IMAGE_OBJECT || parsed.image || "";
        setBackgroundImage(img);
      }
    }
  }, [location.state]);

  // HTML 주석 제거
  const removeHTMLComments = (text) => {
    if (!text) return '';
    return text
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<o:p>|<\/o:p>/gi, ' ') 
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  const toggleDescription = () => {
    setIsExpanded(prev => !prev);
  };

  // 기존 한줄평 가져오기
  useEffect(() => {
    if (selectedShow?.TITLE) {
      const saved = sessionStorage.getItem(`comments-${selectedShow.TITLE}`);
      if (saved) {
        setComments(JSON.parse(saved));
      }
    }
  }, [selectedShow?.TITLE]);

  // 한줄평 등록
  const handleRegisterComment = () => {
    if (!comment.trim()) return;
    if (comment.length > 20) return alert("20자 이하로 작성해주세요.");
  
    const newComment = { user: userName, text: comment };
    const updated = [newComment, ...comments];
  
    setComments(updated);
    sessionStorage.setItem(`comments-${selectedShow.TITLE}`, JSON.stringify(updated));
    setComment('');
  };

  const handleDeleteComment = (index) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
    sessionStorage.setItem(`comments-${selectedShow.TITLE}`,JSON.stringify(updated));
  };
  
  
  

  return (
    <>
      <div className='main_container'>
        <Header />
      </div>

      <div className="main_banner_img" style={{ backgroundImage: `url(${backgroundImage})`, }}>
        <div className='box2'/>
      </div>

      <div className="all2">
        <div className="contents_container">
          <div className="left">
            <div className="title_box">
              <div className="genre">
                <p>{selectedShow?.GENRE}</p>
                {selectedShow && (
                  <LikedBtn
                    title={selectedShow.TITLE}
                    genre={selectedShow.GENRE}
                    image={selectedShow.IMAGE_OBJECT}
                    audience={selectedShow.AUDIENCE}
                    period={selectedShow.PERIOD}
                    url={selectedShow.URL}
                  />
                )}
              </div>
              <p className='title'>{selectedShow?.TITLE}</p>
            </div>
            <div className='information'>
              <p className='subtitle'>기간</p>
              <div className="text">{selectedShow?.PERIOD}</div>
              <p className='subtitle'>입장연령</p>
              <div className="text">{selectedShow?.AUDIENCE}</div>
              <p className='subtitle'>가격</p>
              <div className="text">{selectedShow?.CHARGE}</div>
            </div>
          </div>
          <div className="right">
            <figure>
              <img
                src={backgroundImage}
                alt="공연 이미지"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImg;
                }}
              />
            </figure>
            <button onClick={() => {
              if (selectedShow?.URL) {
                window.open(selectedShow.URL, '_blank');
              }
            }}>
              예매하러 가기
            </button>
          </div>
        </div>
        
        <div className='star_score_container'>
          <p>이 공연의 스타점수를 매겨주세요!</p>
          <StarRating showTitle={selectedShow?.TITLE} />
        </div>

        {selectedShow?.DESCRIPTION && (
          <div className="description">
            <p className='subtitle'>소개</p>
            <div className="text">
              <p style={{WebkitLineClamp: isExpanded ? 'unset' : 5}}>
                {removeHTMLComments(selectedShow.DESCRIPTION)}
              </p>
              <button onClick={toggleDescription} className="more_button">
                {isExpanded ? '접기' : '더보기'}
              </button>
            </div>
          </div>
        )}

        <div className="user_comment_container">
          <div className='comment_title'>
            <p>관객들의 공연 한줄평</p>
          </div>

          <div className="comment_box">
            <p>{userName} 님의 한줄평 작성</p>
            <div className="comment_input">
              <input type="text" placeholder="공연에 대한 한줄평을 남겨보세요. (30자 이내)"
                value={comment} maxLength={30} onChange={(e) => setComment(e.target.value)} />
            </div>
          </div>

          <input className="comment_btn" type="button" value="등록" onClick={handleRegisterComment}/>

          <div className="comment_list">
            {comments.map((c, i) => (
              <div key={i} className="comment_item">
                <p>{c.user}</p><span>{c.text}</span>
                {c.user === userName && (
                  <button onClick={() => handleDeleteComment(i)}>삭제</button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
      <TabBar />
    </>
  );
}

export default ContentsPage;
