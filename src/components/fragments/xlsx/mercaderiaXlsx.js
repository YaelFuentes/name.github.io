import React, { useState, useEffect } from 'react';
import readXlsxFile from 'read-excel-file'
import axios from 'axios'
import SimpleModal from '@/components/Mui/modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@/components/Mui/Button';
import SearchComponent from '@/components/searchInput';

const MercaderiaXls = () => {
  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState(products);

  useEffect(() => {
    setFilteredProduct(products);
  }, [products]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const rows = await readXlsxFile(file, { sheet: 1 });
      const filteredRows = rows.reduce((acc, row, index) => {
        if (index >= 8) {
          acc.push(row);
        }
        return acc;
      }, []);
      const dataRows = filteredRows.filter(row => {
        const category = row[0];
        return category !== "Metálicos" && category !== "Herraduras" && category !== "PA Aves" && category !== "Termos y Herramientas" && category !== null;
      });
      setProducts(dataRows)
    } catch (error) {
      console.error('Error al leer el archivo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/products/products`, products)
      console.log(response.data)
    } catch (e) {
      console.error('Error al cargar los productos: ', e)
    }
  }

  const handleSearch = (searchTerm) => {
    const searchTermsArray = searchTerm.toLowerCase().split(' ');
    if (searchTermsArray.length === 0) {
      setFilteredProduct(products);
      return;
    }
    const filtered = products.filter((item) =>
      searchTermsArray.every(term =>
        Object.values(item).some((value) =>
          value !== null && value.toString().toLowerCase().includes(term)
        )
      )
    );
    setFilteredProduct(filtered);
  };
  const style = {
    overflow: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <SimpleModal
        nameButton={"Cargar Productos"}
        text={'Carga de productos por excel .xlsx o .xls'}
        styled={style}
        optional={
          <>
            <div>
              <div>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
              </div>
              <div>
                {products.length === 0 ? <></> : <SearchComponent onSearch={handleSearch} />}
              </div>
              {products.length === 0 ? <></> : <Button name={'Cargar'} onClick={handleSubmit} />}
              {products.length > 0 && (
                <TableContainer component={Paper}>
                  <Table aria-label="productos table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Categoría</TableCell>
                        <TableCell>Proveedor</TableCell>
                        <TableCell>Articulo</TableCell>
                        <TableCell>Precio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProduct.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row[0]}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row[1]}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row[3]}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            $ {row[5].toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </>
        }
      />
    </div>
  );
};

export default MercaderiaXls;
