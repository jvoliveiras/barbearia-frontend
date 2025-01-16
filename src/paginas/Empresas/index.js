import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import ListaEmpresas from "../../componentes/ListaEmpresas";
import React, { useEffect, useState } from 'react';
import './Empresas.css'
import ModalCadastroEmpresa from "../../componentes/ModalCadastroEmpresa";
import axios from "axios";

const Empresas = () => {

  const [empresas, setEmpresas] = useState([])
  const [detalhesEmpresa, setdetalhesEmpresa] = useState(false);
  const [estadoModalCadastroEmpresa, setEstadoModalCadastroEmpresa] = useState(false);
  const [empresasFiltrados, setEmpresasFiltrados] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {

    const fetchEmpresas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/empresas", {});
        setEmpresas(response.data);
        setEmpresasFiltrados(response.data);

      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    fetchEmpresas()

  }, []);

  useEffect(() => {
    const filtrados = empresas.filter((empresa) =>
      empresa.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setEmpresasFiltrados(filtrados);
  }, [termoPesquisa, empresas]);

  useEffect(() => {
    console.log(empresas)
  }, [empresas])

  return (
      <>
        <section className='empresas'>
            <Button variant="contained" color="primary" onClick={e => setEstadoModalCadastroEmpresa(true)}>
                Cadastrar Nova Empresa
            </Button>

            <TextField label="Pesquise o nome da empresa" variant="outlined" value={termoPesquisa} onChange={(e) => setTermoPesquisa(e.target.value)} fullWidth />

            <ListaEmpresas empresas={empresasFiltrados} setEmpresas={setEmpresas} detalhesEmpresa={detalhesEmpresa} />

            <ModalCadastroEmpresa setEmpresas={setEmpresas} open={estadoModalCadastroEmpresa} onClose={() => setEstadoModalCadastroEmpresa(false)} />
        </section>
      </>
        
  )
}

export default Empresas;