import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMui({ label, name, value, onChange, options }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options ? options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )) 
          : 
          <MenuItem>
            BasicOption
          </MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
}