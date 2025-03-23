import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Star from '../../../public/star.png';
import '../film/comment.css';
import FilmInfo from '../film/FilmInfo';
import Footer from '../Footer/Footer';
import Shared from '../Shared';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function createSlug(name) {

  return name
    .trim()
    .replace(/\s*:\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function FilmDetail() {
  const { film_name } = useParams();
  const [selectedArea, setSelectedArea] = useState(null);
  const [data, setData] = useState(null);
  const [dataComment, setDataComment] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [loadedCount, setLoadedCount] = useState(5);
  const theme = useTheme();
  const film_id = localStorage.getItem('film_id');
  const defaultImage = 'data:image/jpeg;base64,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';
  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmInfo/getComment/id=${film_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setDataComment(result.comment);
          console.log(result);
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id) {
      fetchData();
    }
  }, [film_id]);

  useEffect(() => {
    setListComment(dataComment.slice(0, 5));
  }, [dataComment]);

  const loadMore = () => {
    const nextCount = loadedCount + 5;
    setListComment(dataComment.slice(0, nextCount));
    setLoadedCount(nextCount);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmInfo/id=${film_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setData(result);
          } else {
            console.log(`Truy cập: ${result.message}`);
          }
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id) {
      fetchData();
    }
  }, [film_id]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmInfo/id=${film_id}/lichChieu/khuVuc_id=${selectedArea?.region_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
        } else {
          console.error('Lỗi khi truy cập:', response.statusText);
        }
      } catch (error) {
        console.error('Lỗi mạng:', error);
      }
    };

    if (film_id && selectedArea) {
      fetchCinemas();
    }
  }, [film_id, selectedArea]);

  return (
    <>
      <Shared />
      {data && (() => {
        const item = data.info.film[0];
        const exactlyDate = item.Release_date.substring(8, 10) + '/' + item.Release_date.substring(5, 7) + '/' + item.Release_date.substring(0, 4);

        return (
          <>
            <FilmInfo
                image={item.film_img}
                name={item.film_name}
                type={data.info.categorys}
                descript={item.film_describe}
                evalute={JSON.parse(data.info.evaluate[0].film_rate).toFixed(1)}
                release={exactlyDate}
                time={item.duration}
                age={item.age_limit}
                actors={data.info.actors}
                directors={data.info.directors}
                film_id = {item.film_id}
              />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '7%', paddingTop: "15px", fontSize: '16px' }}>
              <Link to={`/phim/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Thông tin</Link>
              <Link to={`/lich_chieu/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Lịch chiếu</Link>
              <Link to={`/danh_gia/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? '#c7c1c1' : '#8a8888' }}>Đánh giá</Link>
              <Link to={`/mua_ve/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Mua vé</Link>
            </div>
            <hr style={{ width: "42%", marginLeft: '29%' }} />
            <div className='cmt-container'>
              <div className='film-rate'>
                <div style={{ width: '30%' }}>
                  <p style={{ fontSize: '48px', color: '#00d97e' }}>{JSON.parse(data.info.evaluate[0].film_rate).toFixed(1)}<span style={{ fontSize: '20px', color: '#00d97e' }}>/5</span></p>
                </div>
                <hr />
                <div style={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '13px', margin: '8px', color: '#4e4e4e' }}><span style={{ fontSize: '13px', color: '#484848', fontWeight: 'bold' }}>{data.info.film[0].film_name}</span> nhận được <span style={{ fontSize: '14px', color: '#484848', fontWeight: 'bold' }}>{dataComment.numberOfComment}</span> lượt đánh giá được xác thực với số điểm trung bình {JSON.parse(data.info.evaluate[0].film_rate).toFixed(1)}/5</p>

                </div>
              </div>
              <hr className='line' />
              {listComment.map(comments => (
                <div className='list-cmt'>
                  <img src={comments.user_img || defaultImage} className='icon-rate' style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '100%' }} />
                  <div className='cmt-content'>
                    <h1>{comments.full_name}</h1>
                    <p>
                      {[...Array(comments.star)].map(() => (
                        <img src={Star} className='span-icon-rate' />
                      ))}
                    </p>
                    <h3>{comments.comments ? comments.comments : 'Đánh giá không được viết bởi người mua'}</h3>
                    <h5>{comments.date_posted.split("T")[0]}</h5>
                  </div>
                </div>
              ))}
              {loadedCount < dataComment.length && (
                <div onClick={loadMore} style={{display:'flex',justifyContent:'center',marginTop:'26px'}}>
                    <ExpandMoreIcon style={{cursor:'pointer',color:'rgb(138, 138, 138)'}}/>
                </div>
              )}
            </div>
          </>
        );
      })()}
      {dataComment && <Footer />}
    </>
  );
}
