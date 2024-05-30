import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './Components/Movie/Login/Login';
import { RegisterPage } from './Components/Movie/Register/Register';
import { ForgotPassword } from './Components/Movie/ForgotPass/Forgot';
import { HeaderPage } from './Components/Movie/Header';
import { MovieFetch } from './Components/Movie/MovieFetch';
import { useState } from 'react';
import { Watchlist } from './Components/Movie/Watchlist/Watchlist';
import { Popular } from './Components/Movie/Popular/Popular';
import { FavoritePage } from './Components/Movie/Favorite/Favourite';
import { Logout } from './Components/Movie/Logout/Logout';
import { ToastContainer } from 'react-toastify';
import { SubScribePage } from './Components/Movie/Subscription/Subscription';
import { Cart } from './Components/Cart/Cart';
import { AuthProvider } from './Components/Movie/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [plan, setPlan] = useState("");

  return (
    <>
      <Router> 
        <AuthProvider>
          <div className="App">
            <HeaderPage userEmail={userEmail} setIsLogin={setIsLogin} isLogin={isLogin} />
            <Routes>
              <Route path="/" element={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} setUserEmail={setUserEmail} setUserId={setUserId} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/subscription" element={<SubScribePage setPlan={setPlan} />} />
              <Route path="/cart" element={<Cart plan={plan} />} />
              
              <Route path="/moviefetch" element={<ProtectedRoute element={<MovieFetch watchlist={watchlist} setWatchlist={setWatchlist} />} />} />
              <Route path="/watchlist" element={<ProtectedRoute element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} userId={userId} />} />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
