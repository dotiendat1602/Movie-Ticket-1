import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Shared from '../Shared';
import FilmList from '../film/FilmList';
import Film_card from '../film/Film_card';
export default function Director() {
  const navigate = useNavigate();
  const theme = useTheme()
    const director_id = localStorage.getItem('director_id')
    const[data, setData]= useState()
    const fetchDirectorData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/director/director_id=${director_id}`, {
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
      fetchDirectorData()
    }, [])

  return (
    <Box>
      <Shared/>
      {data &&  <Box sx= {{width: '100vw', height: 'auto', minHeight: '35vh', display: 'flex', marginTop: '19vh', backgroundColor: 'black', alignItems: 'center', paddingLeft: '15vw', gap: 4, color: 'white'}}>
     
      <img src = {data.director_img} style={{ width: '150px',
      height: 'auto'}}></img>
       
       <Box sx= {{height: 'auto', minHeight: '150px', paddingTop: '0', paddingRight: '40px'}}>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <div style={{fontSize: '22px'}}>Đạo diễn:</div>
        <div style={{fontSize: '26px', color : '#ebf5eb'}}>{data.director_name}</div>
        </div>
       
        <div style={{color: '#e1e3e1', fontSize: '17px'}}>{data.director_describe}</div>
       </Box>
      </Box>}
      {data && <div style={{ marginTop: '20px', fontSize: '30px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444', marginBottom: '15px'}}>DANH SÁCH PHIM LIÊN QUAN {'>>'}</div>}
      {data && <FilmList>
        {data.film_ids.map((filmId, index) => {
           const datee = data.film_release_dates[index].substring(0, 10);
           const year = datee.substring(0, 4);
           const month = datee.substring(5, 7);
           const day = datee.substring(8, 10);
           const exactlyDate = `${day}/${month}`;
           return (
                    <Film_card key={filmId} 
                    index = {filmId}
                    image={data.film_images[index]}
                    name={data.film_names[index]}
                    date={exactlyDate}
                    rate={JSON.parse(data.film_ratings[index]).toFixed(1)} >
                      
                    </Film_card>)
                })}
      </FilmList>
      }

     

      {data && <Footer/>}

    </Box>
  )
}
