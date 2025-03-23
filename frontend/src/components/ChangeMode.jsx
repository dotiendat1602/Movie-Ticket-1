import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useColorScheme } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
export default function ChangeMode() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select_mode_label">Mode</InputLabel>
      <Select
        labelId="select_mode_label"
        id="select"
        value={mode}
        label="Mode"
        onChange={handleChange}
        style={{ display: "flex", gap: 1, alignItems: "center" , height: '40px'}}
      >
        <MenuItem value="light">
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <WbSunnyIcon />
            Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          {" "}
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <DarkModeIcon />
            Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          {" "}
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <SettingsSystemDaydreamIcon />
            System
          </div>{" "}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
