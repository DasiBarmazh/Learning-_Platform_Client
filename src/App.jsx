import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage'; 
import { Routes, Route } from 'react-router-dom';
import Categories from './components/categories';
import SubCategories from './components/SubCategories';
import Prompt from './components/Prompt';

function App() {
  return (
    <div
      style={{
    minHeight: '100vh',
    minWidth: '100vw',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f7fa'
  }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/subcategories/:categoryId" element={<SubCategories />} />
        <Route path="/prompt/:categoryId/:subCategoryId" element={<Prompt />} />     
      </Routes>
    </div>
  );
}

export default App;