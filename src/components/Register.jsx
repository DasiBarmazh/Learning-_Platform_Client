import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar, Alert, CircularProgress } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/userThunks';
import { clearRegisterSuccess } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../Redux/userSlice';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registerSuccess } = useSelector(state => state.users);

  const [fields, setFields] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
useEffect(() => {
  console.clear();
  dispatch(clearError());
}, [dispatch]);
  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        dispatch(clearRegisterSuccess());
        navigate('/categories');
      }, 1500);
    }
  }, [registerSuccess, dispatch, navigate]);

  useEffect(() => {
    if (error) console.error('Register error:', error);
  }, [error]);

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = 'יש להזין שם';
    if (!fields.phone.trim()) errs.phone = 'יש להזין מספר טלפון';
    else if (!/^05\d{8}$/.test(fields.phone)) errs.phone = 'מספר טלפון לא תקין (פורמט: 05XXXXXXXX)';
    setErrors(errs);
    if (Object.keys(errs).length) console.error('Validation errors:', errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) dispatch(registerUser(fields));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 350, maxWidth: 400 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}><PersonAddIcon /></Avatar>
          <Typography variant="h5" fontWeight="bold" color="primary">רישום משתמש חדש</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="שם מלא"
            name="name"
            value={fields.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
            disabled={loading}
          />
          <TextField
            label="מספר טלפון"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
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
        {Object.values(errors).map((msg, idx) => (
          <Alert key={idx} severity="error" sx={{ mt: 1, fontSize: 14 }}>{msg}</Alert>
        ))}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {registerSuccess && <Alert severity="success" sx={{ mt: 2 }}>נרשמת בהצלחה! מעביר לעמוד התחומים...</Alert>}
        {loading && <CircularProgress sx={{ mt: 2 }} />}
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