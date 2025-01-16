import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
// import ModalInfoEmpresa from "./ModalInfoEmpresa";

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ListaEmpresas({ empresas, setEmpresas }) {
  // const [estadoModalInfoEmpresa, setEstadoModalInfoEmpresa] = React.useState(false);
  // const [selectedEmpresa, setSelectedEmpresa] = React.useState([]);

  // React.useEffect(() => {
  //   setEmpresas((prevEmpresas) => {
  //     return prevEmpresas.map((empresa) => {
  //       if (empresa.id === selectedEmpresa.id) {

  //         return { ...empresa, ...selectedEmpresa };
  //       }
  //       return empresa;
  //     });
  //   });
  // }, [selectedEmpresa, setEmpresas]);

  return (
    <>
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Demo>
            <List>
              {empresas.map((empresa) => (
                <ListItem
                  sx={{
                    cursor: 'pointer', 
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                   }}
                  key={empresa.id}
                  // secondaryAction={
                  //   <IconButton edge="end" aria-label="delete">
                  //     <DeleteIcon />
                  //   </IconButton>
                  // }
                  onClick={() => {
                    // setEstadoModalInfoEmpresa(true); 
                    // setSelectedEmpresa(empresa);
                  }}
                  
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={empresa.nome}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>

    {/* <ModalInfoEmpresa open={estadoModalInfoEmpresa} empresa={selectedEmpresa} setEmpresa={setSelectedEmpresa} onClose={() => setEstadoModalInfoEmpresa(false)} /> */}
  </>
  );
}
