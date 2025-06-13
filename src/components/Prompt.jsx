import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Alert, Avatar, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendPrompt } from '../Redux/promptThunks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setUserPrompt } from '../Redux/PromptSlice';

const Prompt = () => {
  const dispatch = useDispatch();
  const { userPrompt, lesson, loading, error } = useSelector(state => state.prompt);
  const { currentUser } = useSelector(state => state.users); 
  const [showUserError, setShowUserError] = useState(false);

  const { categoryId, subCategoryId } = useParams();

  const category = useSelector(state =>
    state.categories.categories.find(c => String(c.id) === String(categoryId))
  );
  const subCategory = useSelector(state =>
    state.subCategories.subCategories.find(sc => String(sc.id) === String(subCategoryId))
  );

  useEffect(() => {
    console.clear();
    if (error) {
      console.error('Prompt error:', error);
      setShowUserError(true);
    } else {
      setShowUserError(false);
    }
  }, [error]);

  const handleChange = (e) => {
    dispatch(setUserPrompt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && subCategory) {
      dispatch(sendPrompt({
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        userPrompt,
        userId: currentUser ? currentUser.id : null, 
      }));
    }
  };

  return (
    <Box sx={{
      maxWidth: 500,
      mx: 'auto',
      mt: 4,
      p: 3,
      borderRadius: 3,
      boxShadow: 2,
      bgcolor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
        <SmartToyIcon />
      </Avatar>
      <Typography variant="h6" mb={2}>איך ניתן לעזור לך?</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="הקלד שאלה"
          value={userPrompt}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, fontWeight: 'bold' }}
          disabled={loading || !userPrompt.trim() || !category || !subCategory}
        >
          שליחה
        </Button>
      </form>
      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {showUserError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          אירעה שגיאה. נסה שוב מאוחר יותר.
        </Alert>
      )}
      {lesson && (
        <Box sx={{ mt: 3, width: '100%' }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>תשובה:</Typography>
          <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
            {lesson}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Prompt;