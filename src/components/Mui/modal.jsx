import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
  overflow: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SimpleModal({ nameButton, text, optional, styled, className, styleText }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction="row" spacing={2} className={className}>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          {nameButton}
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styled ? styled : style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={styleText}>
            {text}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {optional}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}