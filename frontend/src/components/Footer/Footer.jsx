import React from 'react'
import { useTheme } from '@emotion/react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import './footer.css'
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
export default function Footer() {
    const theme = useTheme();
  return (
    <Box sx={{width: '100vw', height: '400px', backgroundColor: '#3586FF', marginTop: '200px', position:'relative', zIndex: '4'}}>
      <div className='waves'>
        <div className='wave wave1'></div>
        <div className='wave wave2'></div>
        <div className='wave wave3'></div>
        <div className='wave wave4'></div>
      </div>
      
      <div style={{display: 'flex', marginTop:'40px', position: 'absolute', color: 'white',  justifyContent: 'space-around', width:'100%'}}>
        <div  style={{display: 'flex', alignItems: 'center', gap: '10px', width: '300px', height: '60px'}}>
        <img src='/white.gif' style={{marginTop: '-15px',width: '50px', height: 'auto', objectFit: 'cover'}}></img>
      <div style={{fontSize: '22px', marginTop: '4px'}}><strong>NHTT Movie Tickets</strong></div>
        </div>
        <div style={{width: '480px', marginTop: '15px'}}>
          <div style={{fontSize: '20px'}}><strong>Công ty TNHH NHTT</strong></div>
          <div>Số đăng ký kinh doanh : 0123456789</div>
          <div>Địa chỉ: 33 Nguyễn Trung Trực, P.5, Q. Bình Thạnh, Tp. Hồ Chí Minh</div>
        </div>
       <div style={{ alignItems: 'start', width: '300px'}}>
        <p style={{fontSize: '20px'}}><strong>Đối tác</strong></p>
        <div style={{display: 'flex', flexWrap: 'wrap', width: '300px', gap: '8px', marginTop: '-5px'}}>
        <img src="/beta.jpg" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/cgv.jpg" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/cinemax.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/cinestar.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/dcine.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/dongda.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/lotte.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/mega.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/riocinema.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/starlight.jpeg" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/touch.jpeg" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/payoo.jpg" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        <img src="/momo.png" style={{width: '35px', height: '35px', borderRadius: '100%', objectFit: 'cover'}}></img>
        </div>
       </div>
      </div>

      <div style={{display: 'flex', position: 'absolute', marginTop: '200px', justifyContent: 'space-around', width: '100vw'}}>
      <div style={{ width: '300px',  marginLeft: '-30px'}}>
      <video autoPlay muted loop playsInline style={{ width: '300px', height: 'auto', borderRadius: '50%' }}>
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
      <div style={{color: 'white', width: '470px', marginLeft: '20px'}}>
            <div style={{fontSize: '20px'}}><strong>Khám phá</strong></div>
            <Link href="/auth" underline="none" sx={{color: 'white'}}>Trang chủ</Link>
            <br></br>
            <Link href="/lich_chieu" underline="none" sx={{color: 'white'}}>Lịch chiếu</Link>
            <br></br>
            <Link href="#" underline="none" sx={{color: 'white'}}>Mua vé</Link>
            <br></br>
            <Link href="#" underline="none" sx={{color: 'white'}}>Phim</Link>
            <br></br>
            <Link href="/rap" underline="none" sx={{color: 'white'}}>Rạp</Link>
            <br></br>
            <Link href="#" underline="none" sx={{color: 'white'}}>Tin tức</Link>
      </div>
      <div style={{width: '300px', color: 'white'}}>
          <div style={{fontSize: '20px', marginBottom:'15px'}}><strong>Liên hệ</strong></div>

          <div style={{display: 'flex', gap: '8px'}}>
            <Link style={{color: 'white', cursor: 'pointer'}} href='https://x.com/Reuters'><TwitterIcon></TwitterIcon></Link>
            <Link style={{color: 'white', cursor: 'pointer'}} href='https://www.facebook.com/profile.php?id=100032541549443&locale=vi_VN'><FacebookIcon></FacebookIcon></Link>
            <Link style={{color: 'white', cursor: 'pointer'}} href='https://www.instagram.com/stories/highlights/18060386815694422/'><InstagramIcon></InstagramIcon></Link>
            <Link style={{color: 'white', cursor: 'pointer'}} href='https://www.tiktok.com/@fptsoftwareacademy'><img src='/tiktok.png' style={{width: '23px', objectFit: 'cover', marginTop: '1px'}}></img></Link>
            </div> 
          <div style={{display: 'flex' , gap: '10px', marginTop: '4px'}}>
            <PhoneIcon></PhoneIcon>
            <div>0364501244</div>
          </div>
          <div style={{display: 'flex', gap: '10px', marginTop: '8px'}}>
            <EmailIcon></EmailIcon>
            <div>22026534@vnu.edu.vn</div>
          </div>
        </div>
      </div>
      </Box>
  )
}
