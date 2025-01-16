import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalInfoCliente from "../componentes/ModalInfoCliente";

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ListaClientes({ clientes, setClientes, detalhesCliente }) {
  const [estadoModalInfoCliente, setEstadoModalInfoCliente] = React.useState(false);
  const [selectedCliente, setSelectedCliente] = React.useState([]);

  React.useEffect(() => {
    setClientes((prevClientes) => {
      return prevClientes.map((cliente) => {
        if (cliente.id === selectedCliente.id) {

          return { ...cliente, ...selectedCliente };
        }
        return cliente;
      });
    });
  }, [selectedCliente, setClientes]);

  return (
    <>
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Demo>
            <List>
              {clientes.map((cliente) => (
                <ListItem
                  sx={{
                    cursor: 'pointer', 
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                   }}
                  key={cliente.id}
                  // secondaryAction={
                  //   <IconButton edge="end" aria-label="delete">
                  //     <DeleteIcon />
                  //   </IconButton>
                  // }
                  onClick={() => {
                    setEstadoModalInfoCliente(true); 
                    setSelectedCliente(cliente);
                  }}
                  
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={cliente.nome}
                    secondary={detalhesCliente ? 
                      `CPF: ${cliente.cpf} | Celular: ${cliente.celular}`
                    : null
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>

    <ModalInfoCliente open={estadoModalInfoCliente} cliente={selectedCliente} setCliente={setSelectedCliente} onClose={() => setEstadoModalInfoCliente(false)} />
  </>
  );
}
