import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ModalLogin = ({open, onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const realizarLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://barbearia-backend-wheat.vercel.app/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      console.log('Login realizado com sucesso');
      onClose();
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={realizarLogin}>
            <div>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="dense"
              />
            </div>
            <div>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="dense"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={realizarLogin} type="submit" color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalLogin;
