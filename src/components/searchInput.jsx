import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Llamar a la función de búsqueda del padre
  };

  return (
    <TextField
      label="Buscar"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchComponent;
