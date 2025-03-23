import { useTheme } from "@emotion/react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import ChangeMode from "../ChangeMode";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import AccountHeader from "../Account/AccountHeader";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function createSlug(name) {
  
  return name
    .trim()
    .replace(/\s*:\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const Header = ({ onLoginClick, onSignupClick, onProfileClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = (e) => {
    setSearchQuery(e.target.value); 
  };
  const handleSubmit = (e) => {
    localStorage.setItem('searchQuery', searchQuery);
    navigate(`/tim_kiem/${encodeURIComponent(createSlug(searchQuery))}`)
    window.location.reload()
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMyAccount = () => {
    navigate(`/account/${encodeURIComponent(createSlug(userInfor.full_name))}`)
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
    onProfileClick();
  };
  const ClickNew = () => {
    navigate('/tin_tuc/viet_bai')
    window.location.reload()
  }
  const theme = useTheme();
  const [login, setLogin] = useState('');
  const [userInfor, setUserInfor] = useState([]);
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({jwt : jwt})
    })
      .then(response => response.json())
      .then(responseData => {
        if(responseData.success){
          setLogin(true)
          setUserInfor(responseData.userInfo[0])
        }
        else{
          setLogin(false)
        }
        console.log(responseData)
        
      })
      .catch(error => console.error('Error:', error));
  }, []);
    const black ='/black.gif'
    const white ='/white.gif'

  return (
    <div
      style={{
        height: "70px",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-around',
        paddingRight: '20px'
      }}
    >
      <Box
        sx={{
          marginLeft: "5px",
          width: "60%",
          display: "flex",
          alignItems: "center",
          gap: 0.6,
        }}
      >
        {theme.palette.mode === "dark" && <img src={white} style={{marginTop: '-15px',width: '50px', height: 'auto', objectFit: 'cover'}}></img>}
        {theme.palette.mode === "light" && <img src={black} style={{marginTop: '-15px', width: '50px', height: 'auto', objectFit: 'cover'}}></img>}
        <Typography
          variant="span"
          style={{ marginTop: "4px", fontSize: "20px" }}
        >
          NHTT Movie Tickets
        </Typography>
      </Box>
      <Box sx={{ alignItems: "center" , marginLeft: '-5%'}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <form onSubmit={handleSubmit}>
        <TextField
  id="outlined-search"
  label="Search..."
  type="search"
  onChange={handleChange}
  InputLabelProps={{
    style: {
      fontFamily: "Arial",
      fontSize: "14px",
      textAlign: "center",
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon sx={{ cursor: "pointer" }} onClick={handleSubmit} />
      </InputAdornment>
    ),
    sx: {
      height: "35px",
    },
  }}
  sx={{
    width: "230px",
    "& .MuiOutlinedInput-root": {
      height: "35px",
    },
    "& .MuiInputBase-input": {
      padding: "0 10px", 
    },
    "& .MuiInputLabel-root": {
      top: "-8px",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(13px, -4px) scale(0.75)", 
    },
  }}
/>

</form>

{!login && <AccountHeader signup={onSignupClick} login={onLoginClick}/>}

          {login && (
            <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{textTransform: 'none', height: '41px',display:'flex', alignItems: 'center', justifyContent:'center', gap :'5px', width:'auto',color: theme.palette.mode === "light" ? "black" : "white", fontSize: '20px', whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis'}}
            >
              <img style={{width: '40px', height: '40px', borderRadius:'100%', border: '1px solid #9ea4ad'}} src= {userInfor.user_img || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EADUQAAICAQIDBAgFBAMAAAAAAAABAgMEBREhMUEGUVJhEiIyQnGB0eETFCORoXKxwfAzU4L/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALMACqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALjy4h8OfAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8uvcZSbaSTbfLYtuh6JDGjHIyoqV/SL5Q+4EVp3Z7IylGzIf4Fb6P2n8uhP4uhYGPx/BVkvFPiSRkiNUMeqC2jVWvhFCWPVJbSqhJecUbQBF5Wg4OQn+l+HLxVvYgNR7P5WInOn9etcfV4SS+HX5FzMNAea/yC165ocb4yyMNKNyW8oL3/uVX/X5FVgAAAAAAAAAAAAAAAAAAADMYucowjzk9v3AsHZfTlbZ+dtW8YPatPrLvLTtx3NOFjxxcWqmC2UIpG8iAAAAAAAAMFT7Uacqbll1R2hN7TS6PvLacuoY0cvEupkvajw+PQDz4GWtns+aMFUAAAAAAAAAAAAAAAAO3Rq1bqmNFrh+JucRIaA0tXx9+9r+AL2uQC5AiAAAAAAAAAAA8+1WCr1PKglsla9vnxOU7tcalq+W14/7JI4SqAAAAAAAAAAAAAAAAG7CuePl1Wr3Jp/I0jzA9Ki1KKkuTW6MkP2bzVlYCrk27adoy3fNdH/vcTBEAAAAAAAAD5nJQjKcntGK3bPohu02b+WwnVF7Tu9X5dQKllWu/JtufOybl+7NQBVAAAAAAAAAAAAAAAAAAB1adm2YGVG6viuU4+JdxesTJqyqY3UyTg0ednZpupX6dd6VTbrb9at8pfRkRfwR+nari5ySrn6NnWuXMkAAMbmQABHajq+Lgwe81OzpXF8fsB05uVVh0yuvltFfy+4ouo5lmdlSvt4b8Ix8K7j61HUL8+307n6q9mC5ROQqgAAAAAAAAAAAAAAAAAAAAAAAMp7Pdbprk0d+LrWfjL0Y3enFe7YvSI8AT0O1OUl6+PS35NoS7U5TXq49MfNtsgQBIZOs5+Smp3uMX7ta2ODfv5mAAAAAAAAAAAAAAAAAAAAAAAAZ2Puii2+1V01ynN9IoDX12Hx4LzLBg9mbJpTzLVBeCD3f7k3i6Tg4vGqiLl4pcWBS6cPJv/4Me2fnGPA7a9A1Kxb/AIEYf1zX+C67ACox7M5r9qdEf/Tf+DL7MZf/AHUfNv6FtAFNn2d1CPsqmf8ATP7HHfpmdQt7cW1LvS9L+xfglsB5u1s0nz7jD4HoWRh42UtsimE/NriQ2Z2YqknLEtdb8MuKAqwOrN0/JwWlfW1F8prjF/M5tntuBgAAAAAAAAAAAAAHU+6q522Rrri5Tk9kl1LZo2hV4m12SlZf0T5Q+4EXpnZ63JSsy96qnxUfef0LRjYtOLUq6K1CK7uvxNq22MgAAAAAUAAAAABsABiUIzi4yimnzT6lf1Ts7CalbgepJ862+D+HcWEbBHnNtVlNkq7YOE480z4L3qemUahVtatpr2bFzX1Kbn4V2De6r4teGXSSA5gAAAAAAAD6rhO2yNdcXKcnskj5+JbezulflavzF8f1rFwXhX1A6NF0mGn1elYlK+S9aXd5IlAgAAAUAAAAAAAAAAAAAAAAObPwqs7HlVcufKXWL70dICPPs7Dtwb3TauXKXSS7znL1q+nx1DGcFtG2PsSfR/Qo9kJVWShOLjKLaafQD5AAAA2Y9M8i+FVS9ecvRQEt2b0781kPJtX6VT2SfvS+xbkacLGhiY0Ka16sVtv3+ZvAAAKAAAAAAAAAAAAAAAAAAAAABW+1GnbpZtUeu1vw7yyHxdVC6uVdi3jJbNBHnPPj3g35uPLEy7ceXOD5967zQB//2Q=='}></img>
              <div style={{width: 'auto', maxWidth: '150px',whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{userInfor.full_name}</div>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseProfile}>Hồ sơ</MenuItem>
              <MenuItem onClick={handleClickMyAccount}>Tài khoản</MenuItem>
              <MenuItem onClick={ClickNew}>Tạo bài viết</MenuItem>
              <MenuItem><AlertDialog></AlertDialog></MenuItem>
              
            </Menu>
          </div>
          )}
<ChangeMode />
        </Box>
      </Box>
    </div>
  );
};

export default Header;

function AlertDialog({click}) {
  const navigate =useNavigate()
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosee = () => {
    setOpen(false);
    click();
  };
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/welcome')
  }
  return (
    <React.Fragment>
      <Box variant="outlined" onClick={handleClickOpen}>
        Đăng xuất
      </Box>
      <Dialog
        open={open}
        onClose={handleClosee}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có chắc chắn muốn đăng xuất !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Hãy xác nhận
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>CÓ</Button>
          <Button onClick={handleClosee} autoFocus>
            KHÔNG
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}