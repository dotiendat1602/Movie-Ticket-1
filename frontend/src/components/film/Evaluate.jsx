import React from 'react';
import { useState, useEffect } from 'react';
import './evaluate.css'
import Alert from '@mui/material/Alert';

const Evaluate = (props) => {
    const [dataRate, setDataRate] = useState({
        film_id: localStorage.getItem('film_id'),
        comments: '',
        star: '',
        jwt: localStorage.getItem('jwt')
    });
    const [message, setMessage] = useState(null);
    const [ErorrMessage, setErorrMessage] = useState(null);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);


    const handleClick = (star) => {
        setSelectedStars(star);
        setDataRate((data) => ({
            ...data,
            star: star
        }));
    };

    const CommentChange = (e) => {
        setDataRate((data) => ({
            ...data,
            comments: e.target.value
        }));
    };

    const handleMouseEnter = (star) => {
        setHoveredStars(star);
    };

    const handleMouseLeave = () => {
        setHoveredStars(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((!dataRate.comments.trim() && !dataRate.star)|| (dataRate.comments.trim() && !dataRate.star)) {
            setErorrMessage('Đánh giá không hợp lệ: Vui lòng thêm sao hoặc bình luận!');
            setMessage(null);
        } else if((dataRate.star && !dataRate.comments.trim()) || (dataRate.star && dataRate.comments.trim())) {
            e.preventDefault();
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmInfo/postComment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(dataRate)
                });
                
                if (response.ok) {
                  const data = await response.json();
                  if (data.success) {
                    setMessage('Đánh giá thành công');
                    setErorrMessage(null); 
                    setTimeout(() => window.location.reload(), 1500);
                  } else {
                    setErorrMessage(data.message);
                    setMessage(null);
                  }
                } else {
                  console.error('Lỗi:', response.statusText);
                }
              } catch (error) {
                console.error('Lỗi mạng:', error);
              }
        }
    }

    return (
        <>
            {message && (
                <Alert variant='filled' severity="success" style={{ transition: '-moz-initial', width: '100%', position: 'absolute', zIndex: '20', top: '0', left: '0' }}>
                    {message}
                </Alert>
            )}

            {ErorrMessage && (
                <Alert variant='filled' severity="error" style={{ transition: '-moz-initial', width: '100%', position: 'absolute', zIndex: '20', top: '0', left: '0' }}>
                    {ErorrMessage}
                </Alert>
            )}

            <div className='evaluate_container'>
                <div className='evaluate-content-header'>
                    <p>Đánh giá sản phẩm : {props.film_name}</p>
                </div>
                <div className='evaluate-content-main'>
                    <img src={props.img} alt='Poster Film' />
                    <div className='evaluate-content-sibar'>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hoveredStars || selectedStars) ? 'hovered' : ''}`}
                                    onMouseEnter={() => handleMouseEnter(star)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(star)}
                                >

                                </span>
                            ))}
                        </div>
                        <textarea placeholder="Nhập đánh giá của bạn...(phần này có thể bỏ trống)" name='comments' onChange={CommentChange} />
                        <button className='evaluate-btn' onClick={handleSubmit}>Đăng</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Evaluate;