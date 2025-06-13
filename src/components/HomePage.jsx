import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ScienceIcon from '@mui/icons-material/Science';
import CodeIcon from '@mui/icons-material/Code';
import FunctionsIcon from '@mui/icons-material/Functions';
import LanguageIcon from '@mui/icons-material/Language';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BrushIcon from '@mui/icons-material/Brush';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BoltIcon from '@mui/icons-material/Bolt';
import BiotechIcon from '@mui/icons-material/Biotech';
import { useEffect } from 'react';

const subjects = [
  { label: 'Science', icon: <ScienceIcon color="primary" /> },
  { label: 'Programming', icon: <CodeIcon color="secondary" /> },
  { label: 'Mathematics', icon: <FunctionsIcon color="primary" /> },
  { label: 'Languages', icon: <LanguageIcon color="secondary" /> },
  { label: 'History', icon: <HistoryEduIcon color="primary" /> },
  { label: 'Literature', icon: <MenuBookIcon color="secondary" /> },
  { label: 'Art', icon: <BrushIcon color="primary" /> },
  { label: 'Music', icon: <MusicNoteIcon color="secondary" /> },
  { label: 'Physics', icon: <BoltIcon color="primary" /> },
  { label: 'Chemistry', icon: <BiotechIcon color="secondary" /> },
];

const HomePage = () => {
  const navigate = useNavigate();
 useEffect(() => {
    console.clear();
  }, [dispatch]);
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)' }}>
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

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: '#fafafa' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <EmojiObjectsIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              ברוכים הבאים לפלטפורמת הלמידה מרחוק!
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" mb={2}>
            אנו שמחים שבחרתם ללמוד איתנו. כאן תוכלו להעמיק, להתפתח ולגלות עולמות חדשים – בכל זמן ומכל מקום.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            הפלטפורמה שלנו מציעה שיעורים מרחוק במגוון תחומים, עם הסברים מותאמים אישית, תרגולים, ותמיכה חכמה מבוססת בינה מלאכותית.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            תוכלו למצוא כאן שיעורים, תרגולים ומידע במגוון נושאים:
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            mb={2}
            columns={12}
          >
            {subjects.map((subject, idx) => (
              <Grid
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: { xs: '50%', sm: '33.33%', md: '25%' },
                  flexBasis: { xs: '50%', sm: '33.33%', md: '25%' },
                  maxWidth: { xs: '50%', sm: '33.33%', md: '25%' },
                }}
              >
                {subject.icon}
                <Typography variant="subtitle1" fontWeight="bold" color="primary" mt={1}>
                  {subject.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" color="primary" fontWeight="bold" align="center">
            הצטרפו אלינו – ותנו ל-AI לעזור לכם ללמוד, להתפתח ולהצליח!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;