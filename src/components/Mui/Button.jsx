import * as React from 'react';
import Stack from '@mui/material/Stack';
import ButtonBasic from '@mui/material/Button';

export default function Button({ name, onClick, className }) {
  return (
    <Stack spacing={2} direction="row">
      <ButtonBasic variant="contained" onClick={onClick} className={className}>{name}</ButtonBasic>
    </Stack>
  );
}