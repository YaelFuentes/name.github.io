import * as React from 'react';
import Stack from '@mui/material/Stack';
import ButtonBasic from '@mui/material/Button';

export default function Button({ name, onClick, className, colorbg }) {
  return (
    <Stack spacing={2} direction="row">
      <ButtonBasic variant="contained" color={colorbg} onClick={onClick} className={className}>{name}</ButtonBasic>
    </Stack>
  );
}