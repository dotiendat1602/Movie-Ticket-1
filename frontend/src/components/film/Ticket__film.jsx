import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from 'react';
import BasicPagination from './BasicPagination';
import Film_card from './Film_card';
import FilmList from './FilmList';
import { Skeleton } from "@mui/material";

export default function Ticket__film({ onLoadComplete }) {

  const theme = useTheme();
  const [data, setData] = useState([[]]);
  const [showing, setShowing] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 14;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/film/filmShowing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(responseData => {
      setData(responseData); 
      onLoadComplete(responseData);
      setLoading(false)
    })
    .catch(error => console.error('Error:', error));
  }, [onLoadComplete]);

  const showingClick = () => {
    setShowing(true);
    setCurrentPage(1);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const unShowingClick = () => {
    setShowing(false);
    setCurrentPage(1);
  };

  const currentData = showing
    ? data[0].filter(item => item.film_type === 1)
    : data[0].filter(item => item.film_type === 2);

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = currentData.slice(indexOfFirstFilm, indexOfLastFilm);

  const totalPages = Math.max(Math.ceil(currentData.length / filmsPerPage), 1);

  return (
    <Box sx={{width: '100vw', marginTop: '19vh'}}>
      <Box sx={{display: 'flex' , alignItems: 'center', textAlign:'center', justifyContent: 'center', gap: '15px'}}>
        <div style={{ fontSize: '20px', cursor: 'pointer', color: showing ? '#babfc2' : undefined }} onClick={showingClick}>Đang chiếu</div>
        <div style={{ fontSize: '50px'}}>|</div>
        <div style={{ fontSize: '20px', cursor: 'pointer', color: !showing ? '#babfc2' : undefined }} onClick={unShowingClick}>Sắp chiếu</div>
      </Box>

      {data &&
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
      </FilmList>}
      {loading && (
  <Box sx= {{display: 'flex', width: '80%', flexWrap: 'wrap', gap: '10px', marginLeft: '10%',}}>
    {Array.from({ length: 14 }, (_, index) => (
      <Box key={index}>
      <Skeleton
        variant="rectangular"
        width={150}
        height={260}
        style={{ marginBottom: '10px',  borderRadius: '10px' }}
      />
      <Skeleton
      variant="rectangular"
      width={150}
      height={30}
      style={{ marginBottom: '10px',  borderRadius: '10px' }}
    />
    </Box>

    ))}
  </Box>
)}

      {!loading && <Box sx={{width: '100vw', display: 'flex', justifyContent: 'center'}}><BasicPagination count={totalPages} page={currentPage} changee={handlePageChange}></BasicPagination></Box>}
      
    </Box>
  );
}

  {/* {!showing && data[0].map((item, index) => {
    const datee = item.Release_date.substring(0, 10);
    const year = datee.substring(0, 4);
    const month = datee.substring(5, 7);
    const day = datee.substring(8, 10);
    const exactlyDate = `${day}/${month}`;
    return item.film_type === 2 && (
      <Film_card 
      key={item.film_id}  
      index={item.film_id}  
        image={item.film_img}
        name={item.film_name}
        date={exactlyDate}
      />
    );
  })} */}