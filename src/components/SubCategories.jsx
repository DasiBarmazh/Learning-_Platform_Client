import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentSubCategory } from '../Redux/subCategorySlice';
import { fetchSubCategories } from '../Redux/subCategoryThunks';
import Prompt from './Prompt'; 

const SubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { subCategories, loading, error } = useSelector(state => state.subCategories);

  useEffect(() => {
    console.clear();
    if (categoryId) {
      dispatch(fetchSubCategories(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleSubCategoryClick = (subCategory) => {
    dispatch(setCurrentSubCategory(subCategory));
    navigate(`/prompt/${categoryId}/${subCategory.id}`); 
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