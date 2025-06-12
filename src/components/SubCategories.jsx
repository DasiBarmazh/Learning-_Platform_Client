import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories, setCurrentSubCategory } from '../Redux/SubCategorySlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, CircularProgress, Alert } from '@mui/material';

const SubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { subCategories, loading, error } = useSelector(state => state.subCategories);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubCategories(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleSubCategoryClick = (subCategory) => {
    dispatch(setCurrentSubCategory(subCategory));
    navigate(`/details/${subCategory.id}`); // כאן תתרנדר קומפוננטה חדשה בעתיד
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>בחר תת־קטגוריה</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {subCategories.map(subCategory => (
          <Button
            key={subCategory.id}
            variant="contained"
            onClick={() => handleSubCategoryClick(subCategory)}
            sx={{ fontWeight: 'bold' }}
          >
            {subCategory.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SubCategories;