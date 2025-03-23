import { useTheme } from '@emotion/react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Shared from '../Shared'

export default function CinemaTime() {
  const location = useLocation();

  const navigate = useNavigate()
  const clickShowtime = (filmName, showtime_id) =>{
    localStorage.setItem('showtime_id', showtime_id)
    navigate(`/dat_ve/${filmName}`);
  }
  const theme = useTheme();
  const cinema_id = location.state?.cinema_id;
  const cluster_name= location.state?.cluster_name;
  const cinema_address = location.state?.cinema_address;
  const cinema_name = location.state?.cinema_namee;
  const [data, setData] = useState(null)
  const [dayStates, setDayStates] = useState(null);
  const handleDayClick = (key) => {
    setDayStates(key === dayStates ? null : key);
  };
  const ClickFilmCard = (film_name, film_id) =>{
    localStorage.setItem('film_id', film_id)
    navigate(`/phim/${film_name}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rap/cinema_id=${cinema_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
            console.log(result);
            setData(result);
  
        } else {
          console.error("Lỗi khi truy cập:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi mạng:", error);
      }
    };
    if(cinema_id){
      fetchData()
    }
  }, [cinema_id]);
 
  return (
    <>
    <Shared/>
    <Box sx={{ marginLeft: '10vw', width : '80vw', height: 'auto', minHeight: '20vh', backgroundColor: 'none', marginTop: '19vh', display: 'flex', justifyContent: 'center', gap :2, border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`, borderRadius: '5px', padding: '15px'}}>
          {cluster_name === 'Beta Cinemas' && (
            <img src="/beta.jpg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'CGV Cinemas' && (
            <img src="/cgv.jpg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Lotte Cinemas' && (
            <img src="/lotte.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Cinestar' && (
            <img src="/cinestar.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Mega GS Cinemas' && (
            <img src="/mega.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Dcine' && (
            <img src="/dcine.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Starlight' && (
            <img src="/starlight.jpeg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Rio Cinemas' && (
            <img src="/riocinema.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Touch Cinema' && (
            <img src="/touch.jpeg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          {cluster_name === 'Cinemax' && (
            <img src="/beta.jpg" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
            {cluster_name === 'Đống Đa Cinema' && (
            <img src="/dongda.png" style={{width: '60px', height: '60px', borderRadius: '100%', objectFit: 'cover',border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`}}></img>
          )}
          <Box>
            <div style={{fontSize: '25px', fontWeight: '800'}}>{cinema_name}</div>
            <p style={{ color: theme.palette.mode === 'dark' ? '#bec1c4' : '#7d7e80' }}>{cinema_address}</p>
            <div style={{display: 'flex', marginTop: '-12px', gap: '30px'}}>   
            
            <a target="_blank" href={`https://www.google.com/maps/search/${createSlug(encodeURIComponent(cinema_name))}`}>Bản đồ</a>
            <p>{cluster_name}</p></div>
            <p  style={{fontSize: '14px'}}>{`Xem Lịch chiếu và Mua vé tại ${cinema_name} - rạp ${cluster_name} toàn quốc dễ dàng - nhanh chóng tại NHTT. Rạp ${cinema_name} được xây dựng với tiêu chuẩn rạp Hollywood, chuẩn âm thanh Dolby 7.1, màn hình lớn, sắc nét. ${cinema_name} là rạp chiếu phim thuộc hệ thống ${cluster_name} - 1 chuỗi rạp chiếu phim thuộc sở hữu nội địa. Dù là rạp nội địa nhưng ${cinema_name} cam kết dịch vụ chuyên nghiệp - trải nghiệm điện ảnh quốc tế và giá vé hạt dẻ.`}</p>
          </Box>
    </Box>
    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center' , marginTop: '20px'}}>
          {data &&
            Object.keys(data).map((Time, key) => {
              const lastSpaceIndex = Time.lastIndexOf(" ");
              const datePart = Time.substring(lastSpaceIndex + 1);
              const formattedDate = datePart.substring(0, 5).replace("-", "/");
              const day = key === dayStates;
              if (day) {
                console.log(data[Time]);
              }
              return (
                <>
                  {Time.substring(0, 6) === "Thứ Ha" && (
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
                  {Time.substring(0, 6) === "Thứ Ba" && (
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
                  {Time.substring(0, 6) === "Thứ Tư" && (
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
                  {Time.substring(0, 6) === "Thứ Nă" && (
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
                  {Time.substring(0, 6) === "Thứ Sá" && (
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
                  {Time.substring(0, 6) === "Thứ Bả" && (
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
                  {Time.substring(0, 6) === "Chủ Nh" && (
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
        {data && Object.keys(data).map((Time, key) => {
          const day = key === dayStates;
          return (<>
            {day && typeof data[Time] === 'object' && (
              <Box key={key} sx={{ marginBottom: "10px" , width: '600px'}}>
                 
                    {Object.values(data[Time]).map((film, index) => (
                                <Box key={index} sx={{  minHeight: '200px', display: 'flex', gap: 2, width: '600px', borderRadius: '5px' , border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`, paddingLeft: '20px', paddingTop: '20px', marginTop: '15px'}}>
                                    <img onClick={() => ClickFilmCard(encodeURIComponent(createSlugg(film.film_name)), film.film_id)} src={film.film_img} style={{width: '100px', height: '160px', objectFit: 'cover',cursor: 'pointer'}}></img>
                                    <Box>
                                    <p onClick={() => ClickFilmCard(encodeURIComponent(createSlugg(film.film_name)), film.film_id)} style={{fontSize: '20px', cursor: 'pointer'}}><strong>{film.film_name}</strong></p>
                                    <div style={{display: 'flex', gap: '20px', marginTop: '-10px', marginBottom: '17px', fontSize: '14px'}}>
                                      <div>{`Thời lượng: ${film.duration} phút`}</div>
                                      <div>{`T${film.age_limit}`}</div>
                                    </div>
                                    <Box sx={{display: 'flex' ,flexWrap: 'wrap' , gap: '15px'}}>
                                    {Array.isArray(film.showtimes) && film.showtimes.map((showTime, key) => (
                                       <Button style={{border: '1px solid #009688', borderRadius: '3px'}} onClick={() => clickShowtime(film.film_name, showTime.showtime_id)} key={key}>{showTime.show_time.substring(0,5)}</Button>
        ))}</Box>
                                    </Box>
                                </Box>
                            ))}
              </Box>
            )}
            {day && typeof data[Time] !== 'object' && <Box sx={{width: '600px', marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
              
              <div>Tạm thời chưa có thông tin về lịch chiếu</div>
              </Box>}
            </>);
        })}
      </Box>


    <Footer/>
    </>
  )
}
function createSlug(name) {
  return name
    .trim() // Xóa khoảng trắng ở đầu và cuối
    .replace(/\s+/g, '+') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '+'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}

function createSlugg(name) {
  return name
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}
