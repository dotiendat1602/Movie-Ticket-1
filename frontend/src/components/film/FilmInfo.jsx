import React, { useState , useEffect} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography, keyframes  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import Trailer from './Trailer';
import Evaluate from './Evaluate';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
function createSlug(name) {
  
  return name
    .trim()
    .replace(/\s*:\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function FilmInfo(props) {
  const navigate = useNavigate()
  const [isClickTrailer, setIsClickTrailer] = useState(false)
  const trailerClick = () => {
           setIsClickTrailer(!isClickTrailer)
           window.scrollTo({
            top: 0, 
            behavior: 'smooth', 
          });
  }
  const [isClickEvaluate, setIsClickEvaluate] = useState(false)
  const EvaluateClick = () => {
           setIsClickEvaluate(!isClickEvaluate)
  }
  const [message ,setMessage] = useState(null)
  
  if(isClickTrailer){ document.body.style.overflow = 'hidden';}
  else {document.body.style.overflow = 'auto'}
   
  const [liked, setLiked] = useState(null)
  const filmBuy = (film_name) =>{
    navigate(`/mua_ve/${film_name}`)
    window.location.reload()
  }
  const likeCheckFetch = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/like/likeCheck/film_id=${props.film_id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
       
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
        setLiked(data.liked)

    } catch (error) {
      console.error('Error fetching likeCheck:', error);
    }
  };
  useEffect(() => {
    likeCheckFetch();
  }, []);

  const unLike = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/like/unlike/film_id=${props.film_id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
        setLiked(data.liked)

    } catch (error) {
      console.error('Error fetching likeCheck:', error);
    }
  };

  const Like = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/like/film_id=${props.film_id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.message === 'Người dùng chưa đăng nhập' || data.message === 'Người dùng hết phiên đăng nhập'){
        setMessage('Vui lòng đăng nhập để thao tác')
      }
        setLiked(data.liked)

    } catch (error) {
      console.error('Error fetching likeCheck:', error);
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // 2 giây

      return () => clearTimeout(timer);
    }
  }, [message]);
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
const ClickActor = (actor_id) => {
  localStorage.setItem('actor_id', actor_id)
}
const ClickDirector = (director_id) => {
  localStorage.setItem('director_id', director_id)
}
const ClickType =(category_id) => {
  localStorage.setItem('category_id', category_id)
}
  return (
    <>
     {message && <Alert variant='filled' severity="error" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0', animation: `${flyDown} 0.5s ease-out`}}>
            {message}
          </Alert>} 
    <Box sx={{width: '100vw', minHeight: '35vh', backgroundColor: 'black', marginTop: '20vh', display: 'flex', alignItems: 'center', gap: 2.5, color: 'white', justifyContent:'center', paddingTop: '10px', paddingBottom: '10px'}}>
     <img src= {props.image} style={{width: 'auto', height: '30vh', objectFit: 'cover'}}></img>
     <div style={{alignItems: 'start', width: '45vw', textWrap: 'wrap'}}>
     <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold'}}>{props.name}</Typography>
     <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Thể loại:</Typography>
      {props.type.map((typee, index) => {
  return (
    <span key={typee.category_id}>
      <Link onClick={ () => ClickType(typee.category_id)} to={`/the_loai/${encodeURIComponent(createSlug(typee.category_name))}`} style={{ color: '#53dce0', textDecoration: 'none' }}>
        {typee.category_name}
      </Link>
      {index < props.type.length - 1 && <span>, </span>}
    </span>
  );
})}
     </div>
    
     <div style={{display: 'flex', justifyContent: 'start', gap: '10px', width: '45vh', marginTop: '10px'}}>
     {!liked && <button onClick = {Like} style={{width:'120px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4, fontSize: '14px'}}>
        <FavoriteIcon/>
        Thích
        </button>} 
      {liked && <button onClick={unLike} style={{width:'120px', height:'30px', backgroundColor: 'white', color: '#EF4444', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4, fontSize: '14px'}}>
        <FavoriteIcon style={{color: '#EF4444'}}/>
        Thích
        </button>}
      <button style={{width:'120px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4, fontSize: '14px'}} onClick={EvaluateClick}>Đánh giá</button>
      <button style={{width:'120px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4, fontSize: '14px'}} onClick={trailerClick}>Trailer</button>
      <button style={{width:'120px', height:'30px', backgroundColor: 'white', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems:'center', gap: 1.4, fontSize: '14px'}} onClick={() => filmBuy(props.name)}>Mua vé</button>
     </div>
     <Typography style={{ marginTop: '7px', fontSize: '14px'}} >{props.descript}</Typography>
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '7px'}}>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Đánh giá</Typography>
      <StarIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{`${props.evalute}/5`}</div>
      </Box>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Khởi chiếu</Typography>
      <NewReleasesIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{props.release}</div>
      </Box>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Thời lượng</Typography>
      <AccessTimeIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{`${props.time} phút`}</div>
      </Box>
      <Box>
      <div style={{display: 'flex', justifyContent:'start', gap: '5px', alignItems:'center'}}>
      <Typography>Độ tuổi giới hạn</Typography>
      <SupervisedUserCircleIcon/>
     </div>
     <div style={{textAlign: 'center'}}>{props.age}</div>
      </Box>
     </div>
     
     </div>
     <div style= {{width:'20vw', marginLeft: '20px'}}>
      <div>Diễn viên</div>
      {props.actors.map((actor, index) => {
  return (
    <span key={actor.actor_id}>
      <Link onClick={() => ClickActor(actor.actor_id)} to={`/dien_vien/${encodeURIComponent(createSlug(actor.actor_name))}`} style={{ color: '#53dce0', textDecoration: 'none' }}>
        {actor.actor_name}
      </Link>
      {index < props.actors.length - 1 && <span>, </span>}
    </span>
  );
})}
      <div>Đạo diễn</div>
      {props.directors.map((director, index) => {
  return (
    <span key={director.director_id}>
      <Link onClick={() => ClickDirector(director.director_id)} to={`/dao_dien/${encodeURIComponent(createSlug(director.director_name))}`} style={{ color: '#53dce0', textDecoration: 'none' }}>
        {director.director_name}
      </Link>
    </span>
  );
})}
     </div>
     {isClickTrailer && <>
      <Box
    sx={{
      position: "absolute",
      zIndex: "10",
      width:'100vw',
      height: '200vh',
      backgroundColor: 'rgba(76, 79, 77, 0.5)',
    }}
    autoComplete="off"
    onClick = {trailerClick}
  ></Box>
     <Trailer/>
     </>}

     {isClickEvaluate && <>
      <Box
    sx={{
      position: "absolute",
      zIndex: "10",
      width:'100vw',
      height: '200vh',
      backgroundColor: 'rgba(76, 79, 77, 0.5)'
    }}
    autoComplete="off"
    onClick = {EvaluateClick}
  ></Box>
     <Evaluate film_name={props.name} img={props.image} />
     </>}

    </Box>
    </>
  )
}
