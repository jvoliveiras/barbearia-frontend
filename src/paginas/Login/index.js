import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../componentes/AuthContext';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { validateToken } = useContext(AuthContext);

    const realizarLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                email,
                password,
            });

            localStorage.setItem('access_token', response.data.token);

            await validateToken();
            navigate('/clientes');

        } catch (error) {
            console.error('Erro ao fazer login', error);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh', // Ocupa a altura inteira da tela
                display: 'flex', // Centraliza o conteúdo
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.main', // Cor de fundo da tela
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 400, // Limita a largura do formulário
                    backgroundColor: '#ffffff', // Fundo branco do formulário
                    borderRadius: 2, // Borda arredondada
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Sombra suave
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{ color: 'primary.main' }}>
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
        </Box>
    );
}

export default Login;
