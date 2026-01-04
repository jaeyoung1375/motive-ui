import { Routes, Route } from 'react-router-dom';
import AdminPage from '~views/admin/AdminPage';
import ProductAdd from '~views/admin/prod/ProductAdd';
import ProductList from '~views/admin/prod/ProductList';
import ProductDetailAdd from '~views/admin/prod/ProductDetailAdd';
import Login from '~views/user/login/Login';
import Products from '~views/product/Products';
import GoogleLoginCallback from '~views/user/login/GoogleLoginCallback';
import KakaoLoginCallback from '~views/user/login/KakaoLoginCallback';
import MenuAdd from '~views/admin/menu/MenuAdd';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/product/add" element={<ProductAdd />} />
      <Route path="/admin/product/detail/add" element={<ProductDetailAdd />} />
      <Route path="/admin/product/list" element={<ProductList />} />
      <Route path="/admin/menu/add" element={<MenuAdd />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/oauth/google/callback" element={<GoogleLoginCallback />} />
      <Route path="/oauth/kakao/callback" element={<KakaoLoginCallback />} />
    </Routes>
  );
}
