import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';

export default function FilmDetailTime({ onAreaChange }) { 
  const [areas, setAreas] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lichChieu/khuVuc`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result) {
          setAreas(result);
        } else {
          console.log(`Truy cập: ${result.message}`);
        }
      } else {
        console.error("Lỗi khi truy cập:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedArea(selected); 
    onAreaChange(selected); 
  };

  return (
    <>
      {areas && (
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small-label">Tỉnh/Thành phố</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedArea || ''} 
            label="Tỉnh/Thành phố"
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 220, 
                  overflowY: 'auto',
                },
              },
            }}
          >
            {areas.map((area) => (
              <MenuItem key={area.region_id} value={area}>
                {area.region_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
