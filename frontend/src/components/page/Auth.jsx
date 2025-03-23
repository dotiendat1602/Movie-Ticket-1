import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Shared from "../Shared";
import Ticket__film from "../film/Ticket__film";
import Footer from "../Footer/Footer";
import NewNew from "../new/NewNew";
import { useTheme } from "@mui/material";


export default function Auth() {
  const theme = useTheme()
  const [isTicketLoaded, setIsTicketLoaded] = useState(false);
  const handleTicketLoad = () => {
    setIsTicketLoaded(true);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Shared />
      <Ticket__film onLoadComplete={handleTicketLoad} />
      <div style={{fontSize: '25px', marginLeft: '10%', fontFamily: 'Montserrat', fontWeight: '600', color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#a3a19d', marginBottom: '15px', marginTop: '15px'}}>{`TIN TỨC MỚI NHẤT`}</div>
      <NewNew></NewNew>
      {isTicketLoaded && <Footer />}
    </Box>
  );
}

