import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmDetailTime from '../film/FilmDetailTime';
import Footer from '../Footer/Footer';
import Shared from '../Shared';
function createSlug(name) {
  return name
    .trim() // Xóa khoảng trắng ở đầu và cuối
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}

export default function Cinema() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedArea, setSelectedArea] = useState(null);
  const handleAreaChange = (newArea) => {
    setSelectedArea(newArea);
  };
  const [data, setData]= useState(null)
  const cinemaClick = (cinema_id, cinema_name, cinema_namee, cinema_address, cluster_name) => {
    navigate(`/rap/${cinema_name}`, { state: { cinema_id , cinema_namee, cinema_address, cluster_name} })
    // localStorage.setItem('cinema_id', cinema_id)
    // localStorage.setItem('cinema_name', cinema_namee)
    // localStorage.setItem('cinema_address', cinema_address)
    // localStorage.setItem('cluster_name', cluster_name)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rap/region_id=${selectedArea?.region_id}`, {
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
    if (selectedArea) {
      fetchData();
    }
  }, [selectedArea]);
 
  return (
    <>
    <Shared></Shared>
    <Box sx={{marginTop: '19vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2}}>
    <Typography>Chọn tỉnh thành</Typography>
    <FilmDetailTime onAreaChange={handleAreaChange}></FilmDetailTime>
    </Box>
    <Box sx ={{display: 'flex', justifyContent: 'center'}}>
    {data && <Box sx= {{ border:`2px solid ${theme.palette.mode === 'dark' ? '#cccac4' : '#b5b5b3'}`, width: '50vw', paddingTop: '0', borderRadius: '5px', marginTop: '20px'}}>
  {data && (
    <Box>
      {data.map((item, key) => (
       
        <Box onClick={() => cinemaClick(item.cinema_id, encodeURIComponent(createSlug(item.cinema_name)), item.cinema_name, item.address, item.cluster_name)} key = {item.cinema_id} sx={{display: 'flex', justifyContent: 'start',gap: '16px', alignItems: 'center', borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#cccac4' : '#b5b5b3'}`, width: '49.8vw', marginLeft:'0.05vw', height: '60px', cursor: 'pointer', '&:hover': {backgroundColor: theme.palette.mode === 'dark' ? '#636360' : '#dbdbd7'}}}>
          {item.cluster_name === 'Beta Cinemas' && (
            <img src="/beta.jpg" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'CGV Cinemas' && (
            <img src="/cgv.jpg" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Lotte Cinemas' && (
            <img src="/lotte.png" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Cinestar' && (
            <img src="/cinestar.png" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Mega GS Cinemas' && (
            <img src="/mega.png" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Dcine' && (
            <img src="/dcine.png" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Starlight' && (
            <img src="/starlight.jpeg" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Rio Cinemas' && (
            <img src="/riocinema.png" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Touch Cinema' && (
            <img src="/touch.jpeg" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          {item.cluster_name === 'Cinemax' && (
            <img src="/beta.jpg" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
            {item.cluster_name === 'Đống Đa Cinema' && (
            <img src="/dongda.png" style={{width: '30px', height: '30px', borderRadius: '100%', objectFit: 'cover', marginLeft :'10px'}}></img>
          )}
          <div>
            <div style={{fontSize: '18px', fontWeight: '800'}}>{item.cinema_name}</div>
            <div style={{fontSize: '13px', color: theme.palette.mode=== 'dark' ? '#cacccf': '#98999c'}}>{item.address}</div>
          </div>
        </Box>
      ))}
    </Box>
  )}
</Box>}
</Box>

    
    <Footer/>
    </>
  )
}
