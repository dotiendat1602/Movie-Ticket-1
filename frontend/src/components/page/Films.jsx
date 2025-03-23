import React, { useState, useEffect } from 'react'
import Shared from "../Shared";
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import { useTheme } from "@emotion/react";
import FilmList from '../film/FilmList';
import Film_card from '../film/Film_card';
import BasicPagination from '../film/BasicPagination';
import { Skeleton } from '@mui/material';

export default function Films() {
  const theme = useTheme()
    const [formData, setFormData] = useState({
        filmType: '',
        country: '',
        categoryId: '',
      });
      const [dataa, setDataa] = useState(null)
      const handleSubmit = () => {fetch(`${import.meta.env.VITE_API_URL}/api/film/phim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => setDataa(data))
        .catch(error => console.error('Error:', error));
    }
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };
          useEffect(() => {
            handleSubmit();
        }, []);
          useEffect(() => {
            if (formData.filmType || formData.country || formData.categoryId) {
              handleSubmit();
            }
          }, [formData]);
  return (
   <Box>
    <Shared/>
    <Box sx={{marginTop: '20vh', display: 'flex', justifyContent: 'center'}}>
    <select onChange={handleChange} className="filmType" value={formData.filmType} name="filmType" style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option selected hidden>Trạng thái</option>
          <option value="0">Ngừng chiếu</option>
          <option value="1">Đang chiếu</option>
          <option value="2">Sắp chiếu</option>
          <option value="4">Tất cả</option>
          </select>
     <select onChange={handleChange} className="categoryId"  name="categoryId" value={formData.categoryId} style={{ marginLeft: '10vw',outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option value="" selected hidden> Thể loại</option>
          <option value="1">Kinh Dị</option>
          <option value="3">Hành Động</option>
          <option value="4">Tội Phạm</option>
          <option value="5">Phiêu Lưu</option>
          <option value="6">Hoạt Hình</option>
          <option value="7">Gia Đình</option>
          <option value="8">Khoa Học Viễn Tưởng</option>
          <option value="9">Bí Ẩn</option>
          <option value="10">Giả Tưởng</option>
          <option value="11">Lãng Mạn</option>
          <option value="12">Drama</option>
          <option value="13">Giật Gân</option>
          <option value="14">Âm Nhạc</option>
          <option value="15">Tiểu Sử</option>
          <option value="16">Lịch Sử</option>
          <option value="2">Hài kịch</option>
          <option value="17">Chiến Tranh</option>
          <option value="18">Tất cả</option>
    </select>
    <select onChange={handleChange} className="country" value={formData.country} name="country" style={{ marginLeft: '10vw', outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option value="" selected hidden>Quốc gia</option>
          <option value="1">Việt Nam</option>
          <option value="0">Quốc gia khác</option>
          <option value="2">Tất cả</option>
          </select>
    
    </Box>
<div style={{ marginTop: '20px', fontSize: '30px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444'}}>DANH SÁCH PHIM {'>>'}</div>
    {dataa && <Ticket__film data = {dataa}></Ticket__film>}
    {!dataa && (
  <Box sx= {{display: 'flex', width: '80%', flexWrap: 'wrap', gap: '10px', marginLeft: '10%',marginTop: '10px'}}>
    {Array.from({ length: 14 }, (_, index) => (
      <Box>
      <Skeleton
        key={index}
        variant="rectangular"
        width={150}
        height={260}
        style={{ marginBottom: '10px',  borderRadius: '10px' }}
      />
      <Skeleton
      key={index}
      variant="rectangular"
      width={150}
      height={30}
      style={{ marginBottom: '10px',  borderRadius: '10px' }}
    />
    </Box>

    ))}
  </Box>
)}
    {dataa && <Footer/>}
   </Box>
  )
}

function Ticket__film({data}) {

  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 14;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const currentData = data

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = currentData.slice(indexOfFirstFilm, indexOfLastFilm);

  const totalPages = Math.max(Math.ceil(currentData.length / filmsPerPage), 1);

  return (
    <Box sx={{width: '100vw', marginTop: '2vh'}}>

      <FilmList>
        {currentFilms.map(item => {
          const datee = item.Release_date.substring(0, 10);
          const year = datee.substring(0, 4);
          const month = datee.substring(5, 7);
          const day = datee.substring(8, 10);
          const exactlyDate = `${day}/${month}`;
          return (
            <Film_card
              key={item.film_id}  
              index={item.film_id}  
              image={item.film_img}
              name={item.film_name}
              date={exactlyDate}
              rate={JSON.parse(item.film_rate).toFixed(1)} 
            />
          );
        })}
      </FilmList>


      {data && <Box sx={{width: '100vw', display: 'flex', justifyContent: 'center'}}><BasicPagination count={totalPages} page={currentPage} changee={handlePageChange}></BasicPagination></Box>}
      
    </Box>
  );
}
