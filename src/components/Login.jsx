import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/userThunks';
import { clearError } from '../Redux/userSlice';
import { useEffect } from 'react';


const Login = () => {
   useEffect(() => {
      console.clear();
    }, [dispatch]);
  const [fields, setFields] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [showRegister, setShowRegister] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.users);

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = 'יש להזין שם';
    if (!fields.phone.trim()) errs.phone = 'יש להזין מספר טלפון';
    else if (!/^05\d{8}$/.test(fields.phone)) errs.phone = 'מספר טלפון לא תקין (פורמט: 05XXXXXXXX)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e =>
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setErrors({});
    setShowRegister(false);
    if (!validate()) return;

    try {
      const result = await dispatch(
        loginUser({ Name: fields.name, Phone: fields.phone })
      ).unwrap();
      setMessageType('success');
      setMessage('התחברת בהצלחה!');
      setFields({ name: '', phone: '' });
      if (result?.token) {
        localStorage.setItem('token', result.token);
        navigate('/Categories');
      }
    } catch (err) {
      setMessageType('error');
      if (err === 'Invalid credentials.') {
        setMessage('המשתמש לא קיים במערכת.');
        setShowRegister(true);
      } else {
        setMessage(err || 'שגיאת התחברות');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'blue.50',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <Paper elevation={3} sx={{
        p: 4,
        borderRadius: 4,
        width: '100%',
        maxWidth: 400,
        maxHeight: '95vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 1,
        borderColor: 'grey.200'
      }}>
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5" color="primary" fontWeight={700} mb={2} align="center">
          התחברות למערכת
        </Typography>
        {message && (
          <Alert severity={messageType} sx={{ width: '100%', mb: 2 }}>
            {message}
            {showRegister && (
              <Button
                color="secondary"
                variant="outlined"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => {
                  dispatch(clearError());
                  navigate('/register');
                }}
              >
                להרשמה לחץ כאן
              </Button>
            )}
          </Alert>
        )}
        {error && !showRegister && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            label="שם"
            name="name"
            fullWidth
            margin="normal"
            value={fields.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            dir="rtl"
          />
          <TextField
            label="מספר טלפון"
            name="phone"
            fullWidth
            margin="normal"
            value={fields.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            required
            dir="rtl"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2, fontWeight: 'bold' }}
            disabled={loading}
          >
            {loading ? 'מתחבר...' : 'התחבר'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;