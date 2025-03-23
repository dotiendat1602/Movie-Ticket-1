import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function AccountHeader({login, signup}) {
    const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   
  return (
    <div>
      <Tooltip
      title="Tài khoản"
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "15px", 
            // backgroundColor: "#f0f0f0", 
            // color: "#000",
            transform: "translateY(-19px)"
          },
        },
      }}
    >
  <IconButton style={{width: '50px', height: '50px'}} onClick={handleClick}>
  <AccountCircleIcon
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{fontSize: '40px'}}
      >
      </AccountCircleIcon>
  </IconButton>
</Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {login();  handleClose()}}>Đăng nhập</MenuItem>
        <MenuItem onClick={() => {signup();  handleClose()}}>Đăng ký</MenuItem>
      </Menu>
    </div>
  );
}