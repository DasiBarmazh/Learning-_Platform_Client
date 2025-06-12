import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: 'primary.main', boxShadow: 3 }}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 2, fontSize: 32, color: '#fff' }} />
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}>
            AI Learning Platform
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 'bold', mx: 1 }}>
            התחברות
          </Button>
          <Button color="inherit" onClick={() => navigate('/register')} sx={{ fontWeight: 'bold', mx: 1 }}>
            רישום משתמש חדש
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: '#fafafa' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <EmojiObjectsIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              מהו בינה מלאכותית (AI)?
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" mb={3}>
            בינה מלאכותית (Artificial Intelligence) היא תחום במדעי המחשב שמטרתו לפתח מערכות המסוגלות לבצע משימות הדורשות "חשיבה" אנושית – כמו הבנה, למידה, פתרון בעיות, קבלת החלטות, יצירתיות ושפה טבעית.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            מערכות AI לומדות מדוגמאות, מזהות דפוסים, ומסוגלות להציע פתרונות חכמים ומותאמים אישית. בעידן המודרני, AI משולבת בתחומים רבים: חינוך, רפואה, תעשייה, תחבורה, שירות לקוחות ועוד.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            פלטפורמות למידה מבוססות AI מאפשרות לכל אחד לקבל ידע, הסברים ותשובות – בצורה אישית, מהירה ומותאמת לרמתו ותחומי העניין שלו.
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="bold">
            הצטרפו למהפכת הלמידה החכמה – ותנו ל-AI לעזור לכם להתפתח!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;