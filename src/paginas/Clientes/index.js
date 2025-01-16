import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import ListaClientes from "../../componentes/ListaClientes";
import React, { useEffect, useState } from 'react';
import './Clientes.css'
import ModalCadastroCliente from "../../componentes/ModalCadastroCliente";
import axios from "axios";

const Clientes = () => {

  const [clientes, setClientes] = useState([])
  const [detalhesCliente, setdetalhesCliente] = useState(false);
  const [estadoModalCadastroCliente, setEstadoModalCadastroCliente] = useState(false);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {

    const fetchClientes = async () => {
      try {
        const response = await axios.get("https://barbearia-backend-wheat.vercel.app/api/clientes", {});
        setClientes(response.data);
        setClientesFiltrados(response.data);

      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes()

  }, []);

  useEffect(() => {
    const filtrados = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setClientesFiltrados(filtrados);
  }, [termoPesquisa, clientes]);

  useEffect(() => {
    console.log(clientes)
  }, [clientes])

  return (
      <>
        <section className='clientes'>
            <Button variant="contained" color="primary" onClick={e => setEstadoModalCadastroCliente(true)}>
                Cadastrar Novo Cliente
            </Button>

            <TextField label="Pesquise o nome do cliente" variant="outlined" value={termoPesquisa} onChange={(e) => setTermoPesquisa(e.target.value)} fullWidth />

            <FormControlLabel
              control={
                <Checkbox
                  checked={detalhesCliente}
                  onChange={(event) => setdetalhesCliente(event.target.checked)}
                />
              }
              label="Mostrar detalhes do cliente"
            />

            <ListaClientes clientes={clientesFiltrados} setClientes={setClientes} detalhesCliente={detalhesCliente} />

            <ModalCadastroCliente setClientes={setClientes} open={estadoModalCadastroCliente} onClose={() => setEstadoModalCadastroCliente(false)} />
        </section>
      </>
        
  )
}

export default Clientes;