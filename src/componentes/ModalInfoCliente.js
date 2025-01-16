import axios from 'axios';
import React, { useState } from 'react';
import { Divider, Modal, TextField, Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';

const ModalInfoCliente = ({ open, onClose, cliente, setCliente}) => {

    const msg = "Carimbado com sucesso!"
 
    const [loading, setLoading] = useState(false);
    const [msgSucesso, setMsgSucesso] = useState(false);

    const carimbarCartao = async (e, cartao_id) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/api/cartoes/carimbar`, { id: cartao_id });
            console.log('Cartao carimbado com sucesso:', response.data);

            const { cartao, newCartao, totalCortes, ultimoCorte } = response.data;

            setCliente(prevCliente => {
                const updatedCartoes = prevCliente.cartoes.map(c => {
                    if (c.id === cartao.id) {
                        return { ...c, ...cartao,  };
                    }
                    return c;
                });
    
                if (newCartao) {
                    updatedCartoes.push(newCartao);
                }
    
                return { ...prevCliente, cartoes: updatedCartoes, totalCortes: totalCortes, ultimoCorte: ultimoCorte };
            });

            setMsgSucesso(true);
            setTimeout(() => setMsgSucesso(false), 3000);

        } catch (error) {
            console.error('Erro ao carimbar cartao:', error);
        } finally {
            setLoading(false);
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Grid item xs={12}>
                    <TextField
                        label="Nome"
                        fullWidth
                        value={cliente.nome}
                        disabled
                    />
                </Grid>

                {cliente.cartoes && cliente.cartoes.map((c) => {
                    if (c.finalizado == 0) {
                        return (
                            <React.Fragment key={c.id}>
                                <Card
                                    sx={{
                                    mt: 2,
                                    borderRadius: '12px',
                                    backgroundColor: 'background.default',
                                    border: '2px solid #003366',
                                    }}
                                >
                                    <CardContent>
                                    <Typography variant="h6" color="primary" align="center" sx={{ mb: 2 }}>
                                        Cartão Fidelidade
                                    </Typography>
                                    <Grid container spacing={2} justifyContent="center">
                                        {Array.from({ length: 10 }).map((_, index) => (
                                        <Grid item xs={2.4} key={index}>
                                            <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                border: '2px solid #003366',
                                                backgroundColor: c.qtd_carimbos > index ? 'primary.main' : 'background.default',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            >
                                            {c.qtd_carimbos > index ? (
                                                <Typography
                                                variant="body2"
                                                sx={{ color: 'background.default', fontWeight: 'bold' }}
                                                >
                                                {index + 1}
                                                </Typography>
                                            ) : null}
                                            </Box>
                                        </Grid>
                                        ))}
                                    </Grid>
                                    </CardContent>
                                </Card>
                                <Grid container spacing={2} sx={{ mt: 0.2 }} justifyContent="center">
                                    <Grid item>
                                        {msgSucesso ? (
                                            <Typography variant="body2" color="success.main" align="center">
                                                {msg}
                                            </Typography>
                                        ) :
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={(e) => carimbarCartao(e, c.id)}
                                        >
                                            {c.qtd_carimbos < 10 ? 'Carimbar Cartão' : 'Finalizar Cartão'}
                                        </Button>}
                                    </Grid>
                                </Grid>

                                <Divider sx={{ borderColor: '#003366', marginY: 2 }} />

                                <Typography variant="body2" color="success.main" align="left">
                                    Total de Cortes: {cliente.totalCortes}
                                </Typography>

                                <Typography variant="body2" color="success.main" align="left">
                                    Último Corte: {cliente.ultimoCorte}
                                </Typography>

                            </React.Fragment>
                        );
                    } return null;
                })}
                

            </Box>
        </Modal>
    );
};

export default ModalInfoCliente;
