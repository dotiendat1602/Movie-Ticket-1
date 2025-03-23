import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Shared from '../Shared';
import BasicPagination from '../film/BasicPagination';
import FilmList from '../film/FilmList';
import Film_card from '../film/Film_card';
export default function Category() {
  const theme = useTheme()
  const category_id =localStorage.getItem('category_id')
  const[data, setData]= useState()
  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/category_id=${category_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchCategoryData()
  }, [])
  let type ='';
  if(category_id === '1') {
    type = 'Kinh Dị'
  }
  if(category_id === '2') {
    type = 'Hài kịch'
  }
  if(category_id === '3') {
    type = 'Hành động'
  }
  if(category_id === '4') {
    type = 'Tội phạm'
  }
  if(category_id === '5') {
    type = 'Phiêu lưu'
  }
  if(category_id === '6') {
    type = 'Hành động'
  }
  if(category_id === '7') {
    type = 'Gia đình'
  }
  if(category_id === '8') {
    type = 'Khoa học viễn tưởng'
  }
  if(category_id === '9') {
    type = 'Bí ẩn'
  }
  if(category_id === '10') {
    type = 'Giả tưởng'
  }
  if(category_id === '11') {
    type = 'Lãng mạn'
  }
  if(category_id === '12') {
    type = 'Drama'
  }
  if(category_id === '13') {
    type = 'Giật gân'
  }
  if(category_id === '14') {
    type = 'Âm nhạc'
  }
  if(category_id === '15') {
    type = 'Tiểu sử'
  }
  if(category_id === '16') {
    type = 'Lịch sử'
  }
  if(category_id === '17') {
    type = 'Chiến tranh'
  }

  return (
   <Box>
    <Shared/>
    {data && <div style={{ marginTop: '19vh', fontSize: '30px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444', marginBottom: '15px'}}>{`DANH SÁCH PHIM: ${type.toUpperCase()} >>`}</div>}
     {data && <Ticket__film data={data}></Ticket__film>}
   {data && <Footer/>}
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
    <Box>

{data && <FilmList>
        {currentFilms.map((film, index) => {
           const datee = film.Release_date.substring(0, 10);
           const year = datee.substring(0, 4);
           const month = datee.substring(5, 7);
           const day = datee.substring(8, 10);
           const exactlyDate = `${day}/${month}`;
           return (
                    <Film_card key={film.film_id} 
                    index = {film.film_id}
                    image={film.film_img}
                    name={film.film_name}
                    date={exactlyDate}
                    rate={JSON.parse(film.film_rate).toFixed(1)} >
                      
                    </Film_card>)
                })}
      </FilmList>}

      {data && <Box sx={{width: '100vw', display: 'flex', justifyContent: 'center'}}><BasicPagination count={totalPages} page={currentPage} changee={handlePageChange}></BasicPagination></Box>}
      
    </Box>
  );
}
