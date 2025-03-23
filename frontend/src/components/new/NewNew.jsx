import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function createSlug(name) {
    return name
      .trim() 
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-'); }
  
export default function NewNew() {
    const theme = useTheme();
    const navigate = useNavigate()
    const [data, setData] = useState()
    const fetchNewData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/new`, {
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
        fetchNewData()
      }, [])
      const ClickNew = (new_id, new_header) => {
        localStorage.setItem('new_id', new_id)
        navigate(`/tin_tuc/${encodeURIComponent(createSlug(new_header))}`)
      }
  return (
    <>
    {data && <Box sx={{display: 'flex', width: '80%', marginLeft: '10%', height: 'auto', gap: '3.5%', marginTop: '20px'}}>
   <div style={{width: '60%', position: 'relative', zIndex: '1', cursor: 'pointer'}} onClick={() => ClickNew(data[data.length -1].new_id, data[data.length -1].new_header)}>
    <img src= {data[data.length -1].new_img} style={{width: '100%', height: 'auto', maxHeight: '45vh', objectFit: 'cover'}}></img>
    <div style={{width: '100%',backgroundColor: '#EF4444',position: 'absolute', fontSize: '23px', zIndex: '3', paddingLeft: '2%',whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '800', color: 'white', textDecoration: 'underline', marginTop: '0'}}>{data[data.length -1].new_header}</div>
    </div>
    <div style={{width: '45%', height: 'auto', minHeight: '60vh', paddingY: '10px', borderRadius: '7px', overflow: 'hidden', border: `1.2px solid ${theme.palette.mode === 'dark' ? '#b0b5b1' : '#888a89'}`}}>
    {data.slice(-6, -1).map((item, index) => {
        const datee = item.new_time.substring(0, 10);
        const year = datee.substring(0, 4);
        const month = datee.substring(5, 7);
        const day = datee.substring(8, 10);
        const exactlyDate = `${day}/${month}`;
       return ( <Box
        onClick={() => ClickNew(item.new_id, item.new_header)}
        key={index}
        sx={{
          width: '100%',
          height: '20%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '2%',
          gap: '2%',
          cursor: 'pointer',
          paddingY: '12px',
          position: 'relative',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#505251' : '#cdd1cf',
          },
          borderBottom: `1.2px solid ${theme.palette.mode === 'dark' ? '#b0b5b1' : '#888a89'}`
        }}
         
      
      >
            <img src ={item.new_img} style={{width: '30%', height: '90%', objectFit: 'cover'}}></img>
            <div style={{height: '90%', width: '65%'}}>
              <div style ={{ overflow: 'hidden',display: '-webkit-box',WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal',}}>{item.new_header}</div>
              <div style={{textAlign: 'end', position: 'absolute', bottom: '10px', right: '20px'}}>{exactlyDate}</div>
              <div style={{position: 'absolute', bottom: '10px', fontSize: '15px', color: '#ef4444'}}>{item.username}</div>
            </div>
        </Box>)
    })}
    </div>

   </Box>}
   </>)
}
