import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import DOMPurify from "dompurify";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Shared from '../Shared';
function createSlug(name) {
  return name
    .trim() 
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-'); }
export default function NewDetail() {
  const navigate = useNavigate()
  const theme = useTheme();
  const new_id =localStorage.getItem('new_id')
  const [dataDetail, setDataDetail] = useState();
  const [dataRelate, setDataRelate] = useState();
  const fetchNewDetail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/new/new_id=${new_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataDetail(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchNewDetail() 
  }, [])

  const fetchNewRelate = async (film_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/new/film_id=${film_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDataRelate(result);
        console.log(result);
      } else {
        console.error('Lỗi khi truy cập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  
  useEffect(() => {
    if (dataDetail && dataDetail.length > 0 && dataDetail[0].film_id) {
      fetchNewRelate(dataDetail[0].film_id);
    }
  }, [dataDetail]);
  const ClickNew = (new_id, new_header) => {
    localStorage.setItem('new_id', new_id)
    navigate(`/tin_tuc/${encodeURIComponent(createSlug(new_header))}`)
    window.location.reload()
  }
  return (
    <Box>
      <Shared/>
      <Box sx= {{display: 'flex', width: '80%', marginLeft: '8%', gap: '4%', marginTop: '19vh',}}>
          {dataDetail && <Box sx= {{width: '57%', minWidth: '730px', position: 'relative', backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#383836', borderRadius: '10px', padding: '20px 15px'}}>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataDetail[0].new_content) }} /> 
            <div style={{ textAlign: 'end' }}>
  Viết bởi: <span style={{ color: '#009688', fontSize: '18px' }}>{dataDetail[0].username}</span>
</div>
            <div style={{textAlign: 'end'}}>{`( ${formatDate(dataDetail[0].new_time)} )`}</div>
            </Box>}

          <Box sx={{width: '40%', height: 'auto', borderRadius: '10px', overflow: 'hidden'}}>
           {dataRelate && dataRelate.length <= 1 && <p style={{fontSize: '17px', textAlign: 'center'}}>Chưa có bài viết liên quan nào !</p>}
           {dataRelate && dataRelate.length > 1 && <div style={{width: '100%', height: '35px', background: theme.palette.mode === 'light' ? '#cfcfcf' : '#404040', textAlign: 'center' , alignContent: 'center'}}>Bài viết liên quan</div>}
           {dataRelate && (
  <Box>
    {dataRelate.map((item, index) => {
       const datee = item.new_time.substring(0, 10);
       const month = datee.substring(5, 7);
       const day = datee.substring(8, 10);
       const exactlyDate = `${day}/${month}`;
      return (
        item.new_id !== dataDetail[0].new_id && (
          <Box key={index} sx={{ display: 'flex', padding: '10px 5px', gap: '7px', alignItems: 'center', borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#cfcfcf' : '#404040'}`, borderRight: `1px solid ${theme.palette.mode === 'light' ? '#cfcfcf' : '#404040'}`, borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#cfcfcf' : '#404040'}`, cursor: 'pointer', position: 'relative'}} onClick = {() => ClickNew(item.new_id, item.new_header)}>
            <img src={item.new_img} alt="related item" style={{width: '60%', height:'auto', maxHeight: '105px', maxWidth: '200px', objectFit: 'cover'}} />
            <div style={{height: '105px'}}>
              <div style={{overflow: 'hidden',display: '-webkit-box',WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, whiteSpace: 'normal'}}>{item.new_header}</div>
              <div style={{textAlign: 'end', fontSize: '15px', position: 'absolute', right: '15px', bottom: '15px'}}>{exactlyDate}</div>
              <div style={{ fontSize: '15px', position: 'absolute', bottom: '15px', color: '#ef4444'}}>{item.username}</div>
            </div>
          </Box>
        )
      );
    })}
  </Box>
)}

          </Box>
      </Box>
     {dataDetail && dataRelate &&  <Footer/>}
    </Box>
  )
}
function formatDate(dateString) {
  const datee = dateString.substring(0, 10); 
  const year = datee.substring(0, 4);      
  const month = datee.substring(5, 7);     
  const day = datee.substring(8, 10);       
  const exactlyDate = `${day}/${month}`;    
  return exactlyDate;                       
}