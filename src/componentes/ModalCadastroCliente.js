import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Grid, Switch } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalCadastroCliente = ({ open, onClose, setClientes }) => {
    const [loading, setLoading] = useState(false); 

    const [formNovoCli, setFormNovoCli] = useState({
        nome: '',
        cpf: '',
        celular: '',
        ativo: true,
    });

    const atualizaDadosNovoCli = (e) => {
        setFormNovoCli({
            ...formNovoCli,
            [e.target.name]: e.target.value,
        });
    };

    const mudaEstadoAtivo = (e) => {
        setFormNovoCli({
            ...formNovoCli,
            ativo: e.target.checked,
        });
    };

    const salvarNovoCliente = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/clientes/store`, formNovoCli);
            console.log('Cliente salvo com sucesso:', response.data);

            Swal.fire({
                title: 'Successo',
                text: 'Cliente cadastrado com sucesso!',
                icon: 'success',
                timer: 2000, // Fecha após 2 segundos (2000 ms)
                timerProgressBar: true, // Exibe uma barra de progresso enquanto o timer está ativo
                showConfirmButton: false, // Remove o botão de confirmação
            });

            setClientes(prevClientes => [...prevClientes, response.data]);

        } catch (error) {
            console.error('Erro ao salvar Cliente:', error);
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
                    Novo Cliente
                </Typography>

                <form onSubmit={salvarNovoCliente}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                name="nome"
                                fullWidth
                                value={formNovoCli.nome}
                                onChange={atualizaDadosNovoCli}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="CPF"
                                name="cpf"
                                fullWidth
                                value={formNovoCli.cpf}
                                onChange={atualizaDadosNovoCli}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Celular"
                                name="celular"
                                type="number"
                                fullWidth
                                value={formNovoCli.celular}
                                onChange={atualizaDadosNovoCli}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Ativo</Typography>
                            <Switch
                                name="ativo"
                                checked={formNovoCli.ativo}
                                onChange={mudaEstadoAtivo}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Salvar Cliente
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalCadastroCliente;
