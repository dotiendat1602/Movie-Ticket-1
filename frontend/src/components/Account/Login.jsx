import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
const SubmitButton = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-radius: 7px;
  outline: none;
  border: none;
  background-color: #12263F;
  color: white;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: black;
  }
`;

const Login = ({onSetAccClick, onSetForgotPassword}) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const [okMessage, setOkMessage]= useState('')
  const [formData, setFormData] = useState({
    user__name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
     e.preventDefault();
 

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOkMessage(`Đăng nhập thành công: ${data.message}`);
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user_id', data.user_id)
          if(data.message == 'user'){setTimeout(() => {
            window.location.reload();
          }, 1500);}
          else{
            setTimeout(() => {
              window.location.href = "/admin";
              location.window.reload();
            }, 1500);
          }
          
        } else {
          const error__alert =`Đăng nhập thất bại: ${data.message}`;
          console.log(error__alert);
          setErrorMessage(`Đăng nhập thất bại: ${data.message}`)
        }
      } else {
        // Xử lý lỗi
        console.error('Lỗi khi đăng nhập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000); // 2 giây

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  useEffect(() => {
    if (okMessage) {
      const timerr = setTimeout(() => {
        setOkMessage('');
      }, 2000); 

      return () => clearTimeout(timerr);
    }
  }, [okMessage]);

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: "10",
        top: "0",
        left: "0",
        width: "25vw",
        height: "100vh",
        backgroundColor: "#fff",
        transition: 'linear',
        paddingLeft:'25px',
        paddingTop:'30px'
      }}
      autoComplete="off"
    >
       {errorMessage && (
          <Alert variant='filled' severity="error" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0'}}>
            {errorMessage}
          </Alert>
        )}

      {okMessage && (
          <Alert variant='filled' severity="success" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0'}}>
            {okMessage}
          </Alert>
        )}
      <form onSubmit={handleSubmit}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '85%', paddingLeft: '0' }}>
    <label className="user__name__label" style={{ color: '#000' }}>Tài khoản</label>
    <input
      onChange={handleChange}
      className="user__name"
      name="user__name"
      type="text"
      required
      style={{
        outline: 'none',
        borderRadius: '5px',
        border: '1px solid #b8b2b2',
        height: '35px',
        width: '100%',
        fontSize: '17px',
        paddingLeft: '5px',
        marginTop: '10px'
      }}
    />
    <br/>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <label className="password__label" style={{ color: '#000' }}>Mật khẩu</label>
      <div onClick={onSetForgotPassword} style={{ fontSize: '13px', color: 'grey', cursor: 'pointer', fontWeight: '500' }}>Quên mật khẩu?</div>
    </div>
    
    <input
      onChange={handleChange}
      className="password"
      name="password"
      type="password"
      required
      style={{
        outline: 'none',
        borderRadius: '5px',
        border: '1px solid #b8b2b2',
        height: '35px',
        width: '100%',
        fontSize: '17px',
        paddingLeft: '5px',
        marginTop: '10px'
      }}
    />
    
    <SubmitButton type="submit" value="Đăng nhập" />
  </div>
</form>
      <div style={{display: 'flex', fontSize:'13px', marginTop: '10px'}}>
        <p style={{color:'grey', marginLeft:'16%'}}>Chưa có tài khoản?</p>
        <p style={{color:'#207ee3', cursor:'pointer', marginLeft:'3px' }} onClick={onSetAccClick} >Đăng kí ngay!</p>
      </div>
    </Box>
  );
};

export default Login;
