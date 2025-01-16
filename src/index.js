import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import './index.css';
import theme from './componentes/ConfigMaster/Theme';
import { ThemeProvider } from '@mui/material/styles';
import axios from './componentes/axiosConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <AppRoutes />
  </ThemeProvider>
);