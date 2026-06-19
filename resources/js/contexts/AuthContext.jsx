import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      console.log('🔄 Chargement de l\'utilisateur...');
      const response = await api.get('/admin/me');
      setUser(response.data);
      console.log('✅ Utilisateur chargé:', response.data);
    } catch (error) {
      console.error('❌ Erreur chargement utilisateur:', error);
      localStorage.removeItem('admin_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Tentative de connexion...');
      const response = await api.post('/admin/login', { email, password });
      console.log('📦 Réponse login:', response.data);
      
      const { token, user } = response.data;
      localStorage.setItem('admin_token', token);
      setUser(user);
      toast.success('Connexion réussie !');
      return true;
    } catch (error) {
      console.error('❌ Erreur login:', error.response?.data);
      const message = error.response?.data?.message || 'Erreur de connexion';
      toast.error(message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/admin/logout');
    } catch (error) {
      console.error('Erreur logout:', error);
    } finally {
      localStorage.removeItem('admin_token');
      setUser(null);
      toast.success('Déconnexion réussie');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};