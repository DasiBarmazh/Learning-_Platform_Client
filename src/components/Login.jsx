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
import { loginUser } from '../Redux/Thunk';
const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector(state => state.users);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});
    if (!validate()) return;

    try {
      const result = await dispatch(loginUser({ Name: name, Phone: phone })).unwrap();
      console.log('login result:', result);
      setMessageType('success');
      setMessage('התחברת בהצלחה!');
      setName('');
      setPhone('');
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        navigate('/Categories'); // נווט לעמוד הבית או עמוד אחר
      }
    } catch (err) {
      setMessageType('error');
      setMessage(err || 'שגיאת התחברות');
    }
  };
console.log('Redux currentUser:', currentUser);
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
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            label="שם"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
            dir="rtl"
          />
          <TextField
            label="מספר טלפון"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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