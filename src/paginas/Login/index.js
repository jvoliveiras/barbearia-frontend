import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logado, setLogado] = useState(false);
    const navigate = useNavigate();

    console.log(process.env.REACT_APP_API_URL)
  
    const realizarLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password,
        });
  
        localStorage.setItem('access_token', response.data.token);
        setLogado(true)

        setTimeout(()=> {
          navigate('/clientes')
        }, 1000)
        
      } catch (error) {
        console.error('Erro ao fazer login', error);
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={realizarLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
