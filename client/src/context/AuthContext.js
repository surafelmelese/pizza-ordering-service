import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../api/userApi';
import { getRole } from '../api/roleApi'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("User", user)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      console.log("Data", data.user.role_id)
      const roleData = await getRole(data.user.role_id);
    
      console.log("Role data", roleData.data.data.name)
      const normalizedRoleName = roleData.data.data.name?.trim().toLowerCase();
      if (normalizedRoleName === 'admin' || normalizedRoleName === 'super admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Login or role fetching failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);