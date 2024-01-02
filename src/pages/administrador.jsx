import React, { useState, useEffect } from "react";
import axios from 'axios';

const Administrador = () => {

  const [user, setUser] = useState([])
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users');
        setUser(response.data)
      } catch (e) {
        console.error(e);
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

    } catch (e) {

    }
  }
  return (
    <>
      <div>
      </div>
    </>
  )
}

export default Administrador;