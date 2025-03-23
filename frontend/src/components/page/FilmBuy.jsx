import { useTheme } from "@emotion/react";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmDetailTime from "../film/FilmDetailTime";
import FilmInfo from '../film/FilmInfo';
import Footer from '../Footer/Footer';
import Shared from '../Shared';

function createSlug(name) {
  return name
    .trim()
    .replace(/\s*:\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function FilmDetail() {
  const [film__region, setFilm__region] = useState(null);
  const [dayStates, setDayStates] = useState(null);
  const { film_name } = useParams();
  const [selectedArea, setSelectedArea] = useState(null);
  const [data, setData] = useState(null);
  const film_id = localStorage.getItem('film_id');
  const theme = useTheme();
  const navigate = useNavigate()

  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea); 
  };
  const handleDayClick = (key) => {
    setDayStates(key === dayStates ? null : key);
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
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/film/filmInfo/id=${film_id}/lichChieu/khuVuc_id=${selectedArea?.region_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setFilm__region(result);
        } else {
          console.error("Lỗi khi truy cập:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi mạng:", error);
      }
    };

    if (film_id && selectedArea) {
      fetchCinemas();
    }
  }, [film_id, selectedArea]);
  const handleNavigate = (showtime_id) => {
    localStorage.setItem('showtime_id', showtime_id);
    navigate(`/dat_ve/${film_name}`);
  };

  return (
    <>
    <Shared></Shared>
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
              <Link to={`/danh_gia/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Đánh giá</Link>
              <Link to={`/mua_ve/${encodeURIComponent(createSlug(data.info.film[0].film_name))}`} style={{ textDecoration: 'none', cursor: 'pointer', color: theme.palette.mode === 'dark' ? '#c7c1c1' : '#8a8888' }}>Mua vé</Link>
            </div>
            <hr style={{ width: "42%", marginLeft: '29%' }} />
          </>
        );
      })()}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography>Chọn tỉnh / thành phố</Typography>
        <FilmDetailTime onAreaChange={handleAreaChange} />
      </Box>
      <Box
        sx={{
          width: "100vw",
          marginTop: "15px",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
          {film__region &&
            Object.keys(film__region).map((Time, key) => {
              const lastSpaceIndex = Time.lastIndexOf(" ");
              const datePart = Time.substring(lastSpaceIndex + 1);
              const formattedDate = datePart.substring(0, 5).replace("-", "/");
              const day = key === dayStates;
              if (day) {
                console.log(film__region[Time]);
              }
              return (
                <>
                  {Time.substring(0, 2) === "Mo" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px'  }}>Thứ hai</p>
                    </Box>
                  )}
                  {Time.substring(0, 2) === "Tu" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px'  }}>Thứ ba</p>
                    </Box>
                  )}
                  {Time.substring(0, 2) === "We" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px'  }}>Thứ tư</p>
                    </Box>
                  )}
                  {Time.substring(0, 2) === "Th" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px'  }}>Thứ năm</p>
                    </Box>
                  )}
                  {Time.substring(0, 2) === "Fr" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px'  }}>Thứ sáu</p>
                    </Box>
                  )}
                  {Time.substring(0, 2) === "Sa" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px'  }}>Thứ bảy</p>
                    </Box>
                  )}
                  {Time.substring(0, 2) === "Su" && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "80px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor: (theme) =>
                          day
                            ? theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db"
                            : theme.palette.mode === "dark"
                            ? "#4aacf7"
                            : "#e8eced",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "#0184FA"
                              : "#d5d7db",
                        },
                      }}
                      onClick={() => handleDayClick(key)}
                    >
                      <p style={{ margin: "8px 0" }}>{formattedDate}</p>
                      <p style={{ margin: "0", fontSize: '14px' }}>Chủ nhật</p>
                    </Box>
                  )}
                </>
              );
            })}
        </Box>
        <Box sx={{ marginTop: "20px", width: "100vw", display: 'flex', justifyContent: 'center' }}>
        {film__region && Object.keys(film__region).map((Time, key) => {
          const day = key === dayStates;
          return (
            day && (
              <Box key={key} sx={{ marginBottom: "10px" , width: '700px'}}>
                  {isEmptyObject(film__region[Time]) && <Box sx={{width: '700px', marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
              
              <div>Tạm thời chưa có thông tin về lịch chiếu</div>
              </Box>}
                {Object.keys(film__region[Time]).map((theater) => (
                  <Box key={theater} sx={{ marginBottom: "5px" }}>
                    <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "#86888a", backgroundColor: theme.palette.mode === "dark" ? "#4aacf7" : "#E8ECED", height: '50px', display: 'flex', gap: 1, alignItems: 'center', paddingLeft: '5px', width: '700px', borderRadius: '5px'}}>
                    {theater === 'Beta Cinemas' && (
            <img src="/beta.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'CGV Cinemas' && (
            <img src="/cgv.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Lotte Cinemas' && (
            <img src="/lotte.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Cinestar' && (
            <img src="/cinestar.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Mega GS Cinemas' && (
            <img src="/mega.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Dcine' && (
            <img src="/dcine.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Starlight' && (
            <img src="/starlight.jpeg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Rio Cinemas' && (
            <img src="/riocinema.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Touch Cinema' && (
            <img src="/touch.jpeg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {theater === 'Cinemax' && (
            <img src="/beta.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
            {theater === 'Đống Đa Cinema' && (
            <img src="/dongda.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
                      {theater}</Box>
                    {Object.keys(film__region[Time][theater]).map((cinema) => (
                      <Box key={cinema} sx={{marginTop :'15px', paddingLeft: '5px', fontSize: '18px'}}>
                        {cinema}
                        {film__region[Time][theater][cinema] && (
                          <Box key={film__region[Time][theater][cinema].address} sx={{fontSize: '13px', color:theme.palette.mode === "dark" ? "white" : "#86888a"}}>
                            {film__region[Time][theater][cinema].address}
                            <Box sx={{color: theme.palette.mode === "dark" ? "white" : "black"}}>Khung giờ:</Box>
                            <Box sx={{display: 'flex', justifyContent: 'start', flexWrap: 'wrap', gap: 1, marginTop :'10px'}}>
                            {film__region[Time][theater][cinema].show_time &&
                              Object.values(film__region[Time][theater][cinema].show_time).map(
                                (showTime, index) => (
                                  <Button onClick = {() => handleNavigate(showTime.showtime_id)} key={index} sx={{border: `1.4px solid ${theme.palette.mode === "dark" ? "white" : "#86888a"}`, width: '50px', height: '35px', borderRadius: '4px', justifyContent: 'center', display: 'flex', alignItems:'center', marginBottom: '7px', cursor: 'pointer'}}>{`${showTime.show_time.substring(0,5)}`}</Button>
                                )
                              )}
                              </Box>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            )
          );
          
          
          
          
        })}
      </Box>
      </Box>
      {data && <Footer/>}
    </>
  );
}
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}