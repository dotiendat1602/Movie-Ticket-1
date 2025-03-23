import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function BasicPagination(props) {
    return (
        <Stack spacing={2}>    
          <Pagination count={props.count} onChange={props.changee} color="primary" />
        </Stack>
      );
}
