import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Grid, Switch } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalCadastroEmpresa = ({ open, onClose, setEmpresas }) => {
    const [loading, setLoading] = useState(false); 

    const [formNovaEmpresa, setFormNovaEmpresa] = useState({
        nomeEmpresa: '',
        nomeUsuario: '',
        emailUsuario: '',
        senhaUsuario: '',
    });

    const atualizaDadosNovaEmpresa = (e) => {
        setFormNovaEmpresa({
            ...formNovaEmpresa,
            [e.target.name]: e.target.value,
        });
    };

    const salvarNovaEmpresa = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/empresas/store`, formNovaEmpresa);
            console.log('Empresa salva com sucesso:', response.data);

            Swal.fire({
                title: 'Successo',
                text: 'Empresa cadastrada com sucesso!',
                icon: 'success',
                timer: 2000, // Fecha após 2 segundos (2000 ms)
                timerProgressBar: true, // Exibe uma barra de progresso enquanto o timer está ativo
                showConfirmButton: false, // Remove o botão de confirmação
            });

            setEmpresas(prevEmpresas => [...prevEmpresas, response.data]);

        } catch (error) {
            console.error('Erro ao salvar Empresa:', error);
        } finally {
            setLoading(false);
        }

        onClose();
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom sx={{marginBottom: '10px'}}>
                    Nova Empresa
                </Typography>

                <form onSubmit={salvarNovaEmpresa}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome da Empresa"
                                name="nomeEmpresa"
                                fullWidth
                                value={formNovaEmpresa.nomeEmpresa}
                                onChange={atualizaDadosNovaEmpresa}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Nome do Usuario"
                                name="nomeUsuario"
                                fullWidth
                                value={formNovaEmpresa.nomeUsuario}
                                onChange={atualizaDadosNovaEmpresa}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Senha"
                                name="senhaUsuario"
                                type="password"
                                fullWidth
                                value={formNovaEmpresa.senhaUsuario}
                                onChange={atualizaDadosNovaEmpresa}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email do Usuario"
                                name="emailUsuario"
                                type="email"
                                fullWidth
                                value={formNovaEmpresa.emailUsuario}
                                onChange={atualizaDadosNovaEmpresa}
                                required
                            />
                        </Grid>
                        
                    </Grid>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Salvar Empresa
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalCadastroEmpresa;
