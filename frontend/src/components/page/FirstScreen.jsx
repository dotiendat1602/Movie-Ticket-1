import React from 'react';
import { Box } from '@mui/material';
import Text from '../Text';
import Textt from '../Textt';
import '../welcome.css';
import { useNavigate } from 'react-router-dom';
export default function FirstScreen() {
  const navigate = useNavigate()
  const click = () => {
    navigate('/auth')
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        padding: '0'
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '-18vh',
          left: '0',
          width: '100vw',
          height: '136vh',
          objectFit: 'cover',
          zIndex: -2, 
        }}
      >
        <source src="/first.mp4" type="video/mp4" />
    
      </video>

    
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `linear-gradient(-90deg, #011621 45%, transparent 100%, transparent 60%, #011621 100%)`,
          zIndex: -1, 
        }}
      />

    <Box sx={{position: 'absolute', left: '55vw', width: '45vw'}}>
        <Box sx ={{ height: '35px'}}><Text fullText ="Chào mừng bạn đến với NHTT Movie Ticket!"></Text></Box>
         <Box sx ={{ height: '35px'}}><Textt fullText ="Dễ dàng đặt vé – Thỏa sức xem phim!"></Textt></Box>
         <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px'}}><div className='button' onClick={click}>Khám phá</div></Box>
    </Box>
    </Box>
  );
}

