import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export default function ChatBotToggle({ toggleChat }) {
  return (
    <>
      <CssBaseline />
      <Box
        onClick={toggleChat}
        sx={{
          width: '50px',
          height: '50px',
          cursor: 'pointer',
        }}
      >
        <img
          src='/1646842.png'
          alt='Chat Toggle'
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Box>
    </>
  );
}