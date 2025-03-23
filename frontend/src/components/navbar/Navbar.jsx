import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Navbar = () => {
    return (
        <Box sx={{width : '100vw', height: '40px', display: 'flex', marginTop: '3vh', justifyContent: 'center', gap:8}}>
            <Link href="/auth" underline="none">Trang chủ</Link>
            <Link href="/lich_chieu" underline="none">Lịch chiếu</Link>
            <Link href="/mua_ve" underline="none">Mua vé</Link>
            <Link href="/phim" underline="none">Phim</Link>
            <Link href="/rap" underline="none">Rạp</Link>
            <Link href="/tin_tuc" underline="none">Tin tức</Link>
        </Box>
    );
};

export default Navbar;