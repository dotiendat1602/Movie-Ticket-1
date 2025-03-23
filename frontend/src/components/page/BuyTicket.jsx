import { useTheme } from '@emotion/react'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Shared from '../Shared'
import BasicPagination from '../film/BasicPagination'
import FilmList from '../film/FilmList'
import Film_card from '../film/Film_card'
import AreaList from '../showtime/AreaList'

export default function BuyTicket() {
    const [data, setData] = useState(null)
  
    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmShowing`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData)
            setData(responseData[0]); 
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchData(); 
    }, []);
    const theme = useTheme()
  return (
    <Box>
   <Shared></Shared>
  <div style={{ marginTop: '19vh', fontSize: '25px', textAlign: 'center', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444', marginBottom: '15px'}}>{`MUA VÉ THEO PHIM`}</div>
  {data && <Ticket__film data = {data}></Ticket__film>}
  <div style={{ marginTop: '5vh', fontSize: '25px', textAlign: 'center', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444', marginBottom: '15px'}}>{`MUA VÉ THEO RẠP`}</div>
  <AreaList></AreaList>
  {data && <Footer></Footer>}
    </Box>
  )
}
function Ticket__film({data}) {
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 14;
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = data.slice(indexOfFirstFilm, indexOfLastFilm);
  
    const totalPages = Math.max(Math.ceil(data.length / filmsPerPage), 1);
  
    return (
      <Box sx={{width: '100vw', marginTop: '1vh'}}>
  
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
