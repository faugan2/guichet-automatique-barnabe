import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Admin from "./screens/admin/Admin";
import AdminLogin from "./screens/admin/Login";
import AdminPage from "./screens/admin/Page";

import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Retrait from "./screens/Retrait";
import Profile from "./screens/Profile";
import Recherche from "./screens/Recherche";
import Livres from "./screens/Livres";
import LivreDetail from "./screens/LivreDetail";


function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-page" element={<AdminPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/retrait" element={<Retrait />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/livres" element={<Livres />} />
        <Route path="/livre-detail" element={<LivreDetail />} />
      </Routes>
    </BrowserRouter>
     
    
  );
}

export default App;
