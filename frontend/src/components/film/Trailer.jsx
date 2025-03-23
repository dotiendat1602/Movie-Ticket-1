
import { Box, keyframes } from "@mui/material";
import React, { useEffect, useState } from 'react';

export default function Trailer() {
    const flyDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
    const [data, setData] = useState(null);
    const film_id = localStorage.getItem('film_id');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/filmInfo/id=${film_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              console.log(result)
              setData(result);
            } else {
              console.log(`Truy cập: ${result.message}`);
            }
          } else {
            console.error('Lỗi khi truy cập:', response.statusText);
          }
        } catch (error) {
          console.error('Lỗi mạng:', error);
        }
      };
  
      if (film_id) {
        fetchData();
      }
    }, [film_id]);




  return (
    <Box sx={{top: 'calc((100vh - 600px)/2)', left: '200', position: 'absolute', zIndex: '20',  animation: `${flyDown} 0.3s ease-out`,transition: 'linear'}}>
    {data && (
        <iframe
          src={convertYouTubeLinkToEmbed(data.info.film[0].film_trailer)}
          width="1000px"
          height="600px"
          allowFullScreen
        ></iframe>
      )}
      </Box>

    
  
  )
}
function convertYouTubeLinkToEmbed(link) {
  
  if (link.includes('youtu.be')) {
      const videoId = link.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
  } 
  
  
  else if (link.includes('youtube.com/watch?v=')) {
      const videoId = link.split('v=')[1].split('&')[0]; // Tách VIDEO_ID và bỏ các tham số khác nếu có
      const startTime = link.includes('t=') ? link.split('t=')[1].replace('s', '') : 0; // Lấy thời gian bắt đầu nếu có
      return `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
  }
  return link;
}