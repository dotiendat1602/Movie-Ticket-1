import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
const SubmitButton = styled.input`
  width: 85%;
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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    user__name: '',
    gmail: '',
    phone__number: '',
    birthday: '',
    sex: '',
    password: '',
    rePassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
const [okMessage, setOkMessage]= useState('')
  // Hàm cập nhật dữ liệu trong form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Hàm xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Thông tin form:', formData)
    
    if (formData.password !== formData.rePassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Xử lý thành công
        const data = await response.json();

        // Kiểm tra success
        if (data.success) {
          console.log('Đăng ký thành công:', data.message);
          setOkMessage(`Đăng ký thành công: ${data.message}`)
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          const error__alert =`Đăng ký thất bại:, ${data.message}`;
          console.log(error__alert);
          setErrorMessage(`Đăng ký thất bại: ${data.message}`)
          // <Alert severity="error" style={{top:'0', left: '0', zIndex: '20', width:'25vh', height:'30px'}}>{error__alert}</Alert>
        }
      } else {
        setErrorMessage(`Đăng ký thất bại: ${response.statusText}`)
        console.error('Lỗi khi đăng ký:', response.statusText);
      }
    } catch (error) {
      setErrorMessage(`Lỗi mạng: ${error}`)
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
      }, 2000); // 2 giây

      return () => clearTimeout(timerr);
    }
  }, [okMessage]);



    return (
        <div>
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
         paddingTop:'10px'
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
        <label className="name__label" style={{color:'#000'}}>Họ và tên</label>
        <input className="name"  name="name" type="text" onChange={handleChange} required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'0px', marginBottom: '10px'}}></input>
         {/* <br/> */}
         <label className="user__name" name="user__name" onChange={handleChange} style={{color:'#000'}}>Tên đăng nhập</label>
        <br/>
        <input className="user__name"  name="user__name" onChange={handleChange} type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'0px', marginBottom: '10px'}}></input>
         <br/>
         <label className="gmail__label" style={{color:'#000'}}>E-mail</label>
        <br/>
        <input className="gmail"  name="gmail" onChange={handleChange} type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'00px', marginBottom: '10px'}}></input>
         <br/>
         <label className="phone__label" style={{color:'#000'}}>Số điện thoại</label>
        <br/>
        
        <input className="phone__number" onChange={handleChange}  name="phone__number" type="text" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'0px', marginBottom: '10px'}}></input>
         <br/>
         <label className="birthday__label" style={{color:'#000'}}>Ngày sinh</label>
        <br/>
        <input className="birthday" onChange={handleChange}  name="birthday" type="date" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'0px', marginBottom: '10px'}}></input>
         <br/>
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
  <label style={{ color: 'black', margin: 0 }}>Giới tính:</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <label style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '4px' , margin: '0'}}>
      <input className='sex' onChange={handleChange} type="radio" name="sex" value="male" />
      Nam
    </label>
    <label style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '4px',  margin: '0' }}>
      <input className='sex' onChange={handleChange} type="radio" name="sex" value="female" />
      Nữ
    </label>
  </div>
</div>
<br></br>
         <label className="password__label" style={{color:'#000'}}>Mật khẩu</label>
         <br/>
         <input className="Password" onChange={handleChange}  name="password" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'0px', marginBottom: '10px'}}></input>
         <br/>
         <label className="password__label" style={{color:'#000'}}>Xác nhận mật khẩu</label>
         <br/>
         <input className="rePassword" onChange={handleChange} name="rePassword" type="password" required style={{outline:'none', borderRadius: '5px', border:'1px solid #b8b2b2', height:'35px', width:'85%', fontSize:'17px', paddingLeft:'5px', marginTop:'0px'}}></input>
         <SubmitButton type="submit" value="Đăng ký" />
      </form>
      
    </Box>
        </div>
    );
};

export default Signup;