import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../Redux/categoryThunks';
import { setCurrentCategory } from '../Redux/CategorySlice';

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector(state => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setCurrentCategory(category));
    navigate(`/subcategories/${category.id}`); 
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>בחר קטגוריה</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {categories.map(category => (
          <Button
            key={category.id}
            variant="contained"
            onClick={() => handleCategoryClick(category)}
            sx={{ fontWeight: 'bold' }}
          >
            {category.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;