import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPrompts } from '../Redux/userThunks';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, CircularProgress } from '@mui/material';

const UserBar = () => {
  const dispatch = useDispatch();
  const { currentUser, prompts, loadingPrompts } = useSelector(state => state.users);
  const [open, setOpen] = useState(false);

  const handleShowPrompts = () => {
    if (currentUser) {
      dispatch(fetchUserPrompts(currentUser.id));
      setOpen(true);
    }
  };

  if (!currentUser) return null;

  return (
    <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000, bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        שלום, {currentUser.name}
      </Typography>
      <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={handleShowPrompts}>
        הצג היסטורית בקשות 
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>היסטוריית השיעורים שלך </DialogTitle>
        <DialogContent>
          {loadingPrompts ? (
            <CircularProgress />
          ) : (
            <List>
              {prompts.length === 0 && <ListItem>לא נמצאו בקשות קודמות.</ListItem>}
              {prompts.map((prompt, idx) => (
                <ListItem key={idx}>{prompt.userPrompt}</ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserBar;