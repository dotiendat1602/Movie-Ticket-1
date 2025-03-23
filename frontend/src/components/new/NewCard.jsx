import { Box } from '@mui/material'
import React from 'react'
import {useTheme} from '@mui/material'
import { useNavigate } from 'react-router-dom';
function createSlug(name) {
    return name
      .trim() 
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-'); }
  
export default function NewCard(props) {
    const navigate = useNavigate()
    const theme = useTheme()
    const ClickNew = (new_id, new_header) => {
        localStorage.setItem('new_id', new_id)
        navigate(`/tin_tuc/${encodeURIComponent(createSlug(new_header))}`)
      }
  return (
    <Box sx= {{width: '100%', height: '250px', cursor: 'pointer', position: 'relative'}} onClick={() => ClickNew(props.new_id, props.header)}>
        <img src ={props.img} style={{width: '100%', height: '150px', objectFit: 'cover'}}></img>
        <div style={{fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.header}</div>
        <div style= {{ fontSize: '13px', color: theme.palette.mode === 'dark' ? '#cdd1cf' : '#7e8280', lineHeight: '1.5',
    maxHeight: '3em', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical', 
    WebkitLineClamp: 2,}}>{props.footer}</div>
        <div style={{textAlign: 'end',  fontSize: '15px', position: 'absolute', bottom: '0px', right: '15px', color: theme.palette.mode === 'dark' ? '#cdd1cf' : '#7e8280'}}>{props.date}</div>
        <div style={{textAlign: 'end',  fontSize: '15px', position: 'absolute', bottom: '0px', color: theme.palette.mode === 'dark' ? '#ef4444' : '#ef4444'}}>{props.username}</div>
    </Box>
  )
}
