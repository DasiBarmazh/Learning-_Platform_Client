import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar, Alert, CircularProgress } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/userThunks';
import { clearRegisterSuccess } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registerSuccess } = useSelector(state => state.users);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        dispatch(clearRegisterSuccess());
        navigate('/login');
      }, 1500);
    }
  }, [registerSuccess, dispatch, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'יש להזין שם';
    if (!phone.trim()) {
      newErrors.phone = 'יש להזין מספר טלפון';
    } else if (!/^05\d{8}$/.test(phone)) {
      newErrors.phone = 'מספר טלפון לא תקין (פורמט: 05XXXXXXXX)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(registerUser({ name, phone }));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 350, maxWidth: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="primary">רישום משתמש חדש</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם מלא"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
            disabled={loading}
          />
          <TextField
            label="מספר טלפון"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: 'bold' }}
            disabled={loading}
          >
            הרשמה
          </Button>
        </form>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {registerSuccess && <Alert severity="success" sx={{ mt: 2 }}>נרשמת בהצלחה! מעביר לעמוד התחברות...</Alert>}
        <Button
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/login')}
        >
          כבר רשום? התחבר
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;