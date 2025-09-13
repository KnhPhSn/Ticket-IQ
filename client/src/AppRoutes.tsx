import { Route, Routes } from 'react-router';
import PageLayout from './components/PageLayout';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Ticket from './pages/Ticket/Ticket';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/tickets/:id" element={<Ticket />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
