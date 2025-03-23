import React from 'react';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from "@emotion/react";
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './FilmCard.css'

function createSlug(name) {
  return name
    .trim() 
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-'); }

export default function Film_card(props) {
  const name = createSlug(props.name);
  const theme = useTheme();
  const [index, setIndex] = useState(props.index);
  const navigate = useNavigate(); 

  const handleNavigate = (film_name, film_id) => {
    localStorage.setItem('film_id', film_id)
  navigate(`/phim/${film_name}`);
  };

  return (
    <div 
      onClick={ () => handleNavigate( encodeURIComponent(createSlug(props.name)), props.index)} 
      style={{ 
        textDecoration: 'none', 
        width: '150px', 
        height: '300px', 
        paddingLeft: '4px', 
        marginTop: '8px', 
        cursor: 'pointer', 
        color: theme.palette.mode === "light" ? "black" : "white" 
      }}
    >
      <div style={{position: 'relative', cursor: 'pointer', overflow: 'hidden', height: 'auto', width: '150px', zIndex:'2', alignItems: 'center', display: 'flex', justifyContent:'center'}} className='filmImagediv'>
      <img 
        style={{ borderRadius: '4px', width: '150px', height: 'auto', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
        src={props.image} 
        alt={props.name} 
        className='filmImage'
      />
       <PlayCircleIcon className='icon' style={{position: 'absolute', zIndex: '3', color: '#EF4444', fontSize: '55px',transition: 'opacity 0.3s ease'}}/>
      </div>
      
      <Typography style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '800' }}>
        {props.name}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: theme.palette.mode === "light" ? "#807d77" : "white", fontSize: '13px' }}>
          {props.date}
        </Typography>
        <div style={{display:'flex'}}>
          <span style={{color: theme.palette.mode === "light" ? "#807d77" : "white", fontSize: '13px'}}>{props.rate}</span>
          <StarIcon style={{ color: theme.palette.mode === "light" ? "#f6d805" : "white" , marginTop:'-1px',height:'18px',width:'18px',marginRight:'-6px'}} />
        </div>
      </div>
    </div>
  );
}
