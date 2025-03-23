import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicPagination from '../film/BasicPagination';
import Footer from '../Footer/Footer';
import NewCard from '../new/NewCard';
import NewNew from '../new/NewNew';
import Shared from '../Shared';
function createSlug(name) {
  return name
    .trim() 
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-'); }

export default function New() {
  const theme = useTheme();
  const navigate = useNavigate()
  const [dataV, setDataV] = useState()
  const [dataA, setDataA] = useState()

  const fetchNewVietnam = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/new/vietnam`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataV(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchNewVietnam()
  }, [])

  const fetchNewAboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/new/aboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataA(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchNewAboard()
  }, [])
  return (
    <>
   <Box>
    <Shared></Shared>
   <Box sx= {{height: '15vh',alignContent: 'center', marginTop: '19vh',width: '100vw', backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.5), rgba(0, 0, 10, 1)), url('/new.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',}}>
      <p style={{textAlign: 'center', fontSize: '25px', color: 'white'}}><strong>TIN ĐIỆN ẢNH</strong></p>
    </Box>
   <div style={{fontSize: '25px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#a3a19d', marginBottom: '15px', marginTop: '15px'}}>{`MỚI NHẤT`}</div>
  <NewNew></NewNew>
   {dataV && <Box>
   <div style={{fontSize: '25px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#a3a19d', marginBottom: '15px', marginTop: '25px'}}>{`ĐIỆN ẢNH VIỆT NAM`}</div>
   <div style={{ width: '80%', marginLeft: '10%' }}>
  <Neww data = {dataV}></Neww>
</div>
   </Box>}

   {dataA && <Box>
   <div style={{fontSize: '25px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#a3a19d', marginBottom: '15px', marginTop: '25px'}}>{`ĐIỆN ẢNH QUỐC TẾ`}</div>
   <div style={{ width: '80%', marginLeft: '10%'}}>
  <Neww data = {dataA}></Neww>
</div>
   </Box>}
   
   <Footer/>
    </Box>
    </>
  )
}


function Neww({data}) {

  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 4;
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
    <Box sx={{width: '100%', height: 'auto', display: 'flex', gap: '3%'}}>
        {currentFilms.map(item => {
          const datee = item.new_time.substring(0, 10);
          const year = datee.substring(0, 4);
          const month = datee.substring(5, 7);
          const day = datee.substring(8, 10);
          const exactlyDate = `${day}/${month}`;
          return (
            <Box sx={{ width: '23%' , height:'auto'}}>
            <NewCard
            img={item.new_img} header= {item.new_header} footer = {item.new_footer} date = {exactlyDate} new_id = {item.new_id} username ={item.username}
            />
            </Box>
          );
        })}

</Box>
      {data && <Box sx={{width: '80vw', display: 'flex', justifyContent: 'center', marginTop: '20px'}}><BasicPagination count={totalPages} page={currentPage} changee={handlePageChange}></BasicPagination></Box>}
      
    </Box>
  );
}


