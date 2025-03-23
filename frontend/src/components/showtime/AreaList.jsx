import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AreaList() {
  const navigate = useNavigate()
  const [areas, setAreas] = useState(null);
  const [areaClick, setAreaClick] = useState(1);
  const [cinemas, setCinemas] = useState(null);
  const theme = useTheme();
  const [cinemaID, setCinemaID] = useState(null);
  const [data, setData] = useState(null)
  const [dayStates, setDayStates] = useState(null);
  const handleDayClick = (key) => {
    setDayStates(key === dayStates ? null : key);
  };
  const clickShowtime = (filmName, showtime_id) =>{
    localStorage.setItem('showtime_id', showtime_id)
    navigate(`/dat_ve/${filmName}`);
  }
  const ClickFilmCard = (film_name, film_id) =>{
    localStorage.setItem('film_id', film_id)
    navigate(`/phim/${film_name}`)
  }
  const fetchData = async () => { 
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lichChieu/khuVuc`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result) {
          console.log(result);
          setAreas(result);
        } else {
          console.log(`Truy cập: ${result.message}`);
        }
      } else {
        console.error("Lỗi khi truy cập:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };
  const fetchCinema = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lichChieu/khuVuc/khuVuc_id=${areaClick}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result) {
          console.log(result);
          setCinemas(result);
        } else {
          console.log(`Truy cập: ${result.message}`);
        }
      } else {
        console.error("Lỗi khi truy cập:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCinema();
  }, [areaClick]);

  const AreaClick = (id) => {
    if (areas) {
      setAreaClick(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rap/cinema_id=${cinemaID}`, {
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
    if(cinemaID){
      fetchData()
    }
  }, [cinemaID]);
  const ClickCinema = (id) => {
    setCinemaID(id)
    console.log(cinemaID)
  }
  return (
    <Box
      sx={{ display: "flex", gap: '30px', justifyContent: "center", alignItems: "start" }}
    >
      <Box >
        {areas && <div
          style={{
            color: "white",
            width: "300px",
            height: "30px",
            backgroundColor: "#2096F3",
            border: `1px solid ${
              theme.palette.mode === "dark" ? "#c7c4c3" : "#c7c4c3"
            }`,
            cursor: "pointer",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            fontSize: "18px",
            borderRadius: "5px 5px 0 0",
          }}
        >
          Khu vực
        </div>}
        {areas &&
          areas.map((area, key) => {
            return (
              <Box
                key={area.region_id}
                sx={{
                  width: "300px",
                  height: "30px",
                  paddingRight: "10px",
                  display: "flex",
                  backgroundColor:
                    area.region_id === areaClick
                      ? theme.palette.mode === "dark"
                        ? "#14b5f5"
                        : "#e9eef0"
                      : "transparent",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "#c7c4c3" : "#c7c4c3"
                  }`,
                  cursor: "pointer",
                  paddingLeft: "10px",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#14b5f5" : "#e9eef0",
                  },
                }}
                onClick={() => AreaClick(area.region_id)}
              >
                {area.region_name}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22px",
                    fontSize: "12px",
                    height: "22px",
                    borderRadius: "100%",
                    backgroundColor: "#42bdff",
                    color: "white",
                  }}
                >
                  {area["count(*)"]}
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box>
      { cinemas && (
    Object.keys(cinemas).map((cinemaKey, key) => {
      return (
        <>
        <Box key={cinemaKey} sx={{
          width: '300px',
          height: '35px',
          paddingRight: '10px',
          display: 'flex',
          justifyContent: 'start',
          gap: '10px',
          alignItems: 'center',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#c7c4c3' : '#c7c4c3'}`,
          paddingLeft: '10px',
          backgroundColor:
          theme.palette.mode === "dark" ? "#2096F3" : "#EDF2F9",

        }}>
          {cinemaKey === 'Beta Cinemas' && (
            <img src="/beta.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'CGV Cinemas' && (
            <img src="/cgv.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Lotte Cinemas' && (
            <img src="/lotte.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Cinestar' && (
            <img src="/cinestar.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Mega GS Cinemas' && (
            <img src="/mega.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Dcine' && (
            <img src="/dcine.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Starlight' && (
            <img src="/starlight.jpeg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Rio Cinemas' && (
            <img src="/riocinema.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Touch Cinema' && (
            <img src="/touch.jpeg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey === 'Cinemax' && (
            <img src="/beta.jpg" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
            {cinemaKey === 'Đống Đa Cinema' && (
            <img src="/dongda.png" style={{width: '25px', height: '25px', borderRadius: '100%', objectFit: 'cover'}}></img>
          )}
          {cinemaKey}</Box>

          {cinemas[cinemaKey].map((cineItem, key) => (
            <Box key ={cineItem.cinema_id} sx={{ width: '300px',
            height: '30px',
            paddingRight: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `1px solid ${theme.palette.mode === 'dark' ? '#c7c4c3' : '#c7c4c3'}`,
            cursor: 'pointer',
            paddingLeft: '10px',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#14b5f5' : '#e9eef0',
            }}} onClick = {() => ClickCinema(cineItem.cinema_id)}>
              {cineItem.cinema_name ? cineItem.cinema_name : cineItem} 
            </Box>
          ))}
      </>
      )
    })
)}
      </Box>
      {data && <Box>
        <Box sx={{ width: "600px", display: 'flex', justifyContent: 'center'}}>
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
        <Box sx={{ marginTop: "20px", width: "600px", display: 'flex', justifyContent: 'center' }}>
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
                                    <Box sx={{display: 'flex' ,flexWrap: 'wrap' , gap: '15px', width: '100%'}}>
                                    {Array.isArray(film.showtimes) && film.showtimes.map((showTime, key) => (
                                       <Button style={{border: '1px solid #009688', borderRadius: '3px'}} onClick={() => clickShowtime(film.film_name, showTime.showtime_id)} key={key}>{showTime.show_time.substring(0,5)}</Button>
        ))}
        </Box>
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
        
        
        
        </Box>}
    </Box>
  );
}
function createSlugg(name) {
  return name
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}
