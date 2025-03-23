import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Shared from "../Shared";
import FilmInfo from "../film/FilmInfo";
import { useNavigate } from "react-router-dom";

function createSlug(name) {
  return name
    .trim()
    .replace(/\s*:\s*/g, "-") // Thay thế dấu ":" và các khoảng trắng trước và sau nó bằng dấu gạch ngang
    .replace(/\s+/g, "-") // Thay thế tất cả khoảng trắng còn lại bằng dấu gạch ngang
    .replace(/-+/g, "-"); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}

export default function FilmDetail() {
  const navigate = useNavigate()
  const location = useLocation();
  const { film_name } = useParams();
  const decodedFilmName = decodeURIComponent(film_name);

  const [data, setData] = useState(null);
  const film_id = localStorage.getItem('film_id')
  const theme = useTheme();
  const [dataRelate, setDataRelate] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmInfo/id=${film_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log(result);
            setData(result);
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

    if (film_id) {
      fetchData();
    }
  }, [film_id]);

  const fetchNewRelate = async (film_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/new/film_id=${film_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataRelate(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    if (film_id) {
      fetchNewRelate(film_id);
    }
  }, [film_id]);
  const ClickNew = (new_id, new_header) => {
    localStorage.setItem('new_id', new_id)
    navigate(`/tin_tuc/${encodeURIComponent(createSlug(new_header))}`)
    window.location.reload()
  }
  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
    }}>
      <Shared />
      {data &&
        (() => {
          const item = data.info.film[0];
          const datee = item.Release_date.substring(0, 10);
          const year = datee.substring(0, 4);
          const month = datee.substring(5, 7);
          const day = datee.substring(8, 10);
          const exactlyDate = `${day}/${month}/${year}`;

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "7%",
                  paddingTop: "15px",
                  fontSize: "16px",
                }}
              >
                <Link
                  to={`/phim/${encodeURIComponent(
                    createSlug(data.info.film[0].film_name)
                  )}`}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color:
                      theme.palette.mode === "dark" ? "#c7c1c1" : "#8a8888",
                  }}
                >
                  Thông tin
                </Link>
                <Link
                  to={`/lich_chieu/${encodeURIComponent(
                    createSlug(data.info.film[0].film_name)
                  )}`}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  Lịch chiếu
                </Link>
                <Link
                  to={`/danh_gia/${encodeURIComponent(
                    createSlug(data.info.film[0].film_name)
                  )}`}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  Đánh giá
                </Link>
                <Link
                  to={`/mua_ve/${encodeURIComponent(
                    createSlug(data.info.film[0].film_name)
                  )}`}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  Mua vé
                </Link>
              </div>
              <hr style={{ width: "42%", marginLeft: "29%" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100vw",
                  marginTop: "20px",
                }}
              >
                {" "}
                {data.info.film[0].film_trailer && <iframe
                  src={convertYouTubeLinkToEmbed(
                    data.info.film[0].film_trailer
                  )}
                  width="60%"
                  height="600px"
                  frameborder="0"
                  allowfullscreen
                ></iframe>}
                {!data.info.film[0].film_trailer && <img style={{width: '700px', height: '500px'}} src="/trailerr.webp"></img>}


              </div>
            </>
          );
        })()}
        {dataRelate && dataRelate.length > 0 && <div style={{fontSize: '25px', fontWeight: '700', fontFamily: 'Montserrat', marginLeft: '20%', marginTop: '30px'}}>BÀI VIẾT LIÊN QUAN</div>}
        { dataRelate && dataRelate.length > 0 && dataRelate.map((item, index) => {
       const datee = item.new_time.substring(0, 10);
       const month = datee.substring(5, 7);
       const day = datee.substring(8, 10);
       const exactlyDate = `${day}/${month}`;
      return (
        <Box>
          <Box key={index} sx={{ display: 'flex', padding: '10px 5px', gap: '7px', alignItems: 'center', border: `1px solid ${theme.palette.mode === 'light' ? '#cfcfcf' : '#404040'}`, borderRadius: '15px', cursor: 'pointer', position: 'relative', width: '60%', marginLeft: '20%', marginTop: '20px'}} onClick = {() => ClickNew(item.new_id, item.new_header)}>
            <img src={item.new_img} alt="related item" style={{width: '60%', height:'auto', maxHeight: '105px', maxWidth: '200px', objectFit: 'cover'}} />
            <div style={{height: '105px'}}>
              <div style={{overflow: 'hidden',display: '-webkit-box',WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal'}}>{item.new_header}</div>
              <div style={{overflow: 'hidden',display: '-webkit-box',WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal', fontSize: '13px', color: '#8a8584'}}>{item.new_footer}</div>
              <div style={{textAlign: 'end', fontSize: '15px', position: 'absolute', right: '15px', bottom: '15px'}}>{exactlyDate}</div>
              <div style={{ fontSize: '15px', position: 'absolute', bottom: '15px', color: '#ef4444'}}>{item.username}</div>
            </div>
          </Box>
          </Box>
        
      );
    })}
    {dataRelate && dataRelate.length == 0 && <div style={{fontSize: '25px', fontWeight: '600', fontFamily: 'Montserrat', textAlign: 'center', marginTop: '40px'}}>CHƯA CÓ BÀI VIẾT NÀO LIÊN QUAN</div>}
     {data && <Footer/>}
    </Box>
  );
}
function convertYouTubeLinkToEmbed(link) {
  if (link.includes("youtu.be")) {
    const videoId = link.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (link.includes("youtube.com/watch?v=")) {
    const videoId = link.split("v=")[1].split("&")[0]; // Tách VIDEO_ID và bỏ các tham số khác nếu có
    const startTime = link.includes("t=")
      ? link.split("t=")[1].replace("s", "")
      : 0; // Lấy thời gian bắt đầu nếu có
    return `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
  }
  return link;
}
