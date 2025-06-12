import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Categories from './components/categories';
import SubCategories from './components/SubCategories';

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
        <Route path="/" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/subcategories/:categoryId" element={<SubCategories />} />
        {/* בעתיד: <Route path="/details/:subCategoryId" element={<Details />} /> */}
      </Routes>
    </div>
  );
}

export default App;