import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, requiredRoles) => {
  const AuthHOC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || (requiredRoles && !requiredRoles.includes(user?.user?.role_name.toLowerCase())))) {
        router.push('/login');
      }
    }, [loading, user, router]);

    if (loading || !user) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthHOC;
};

export default withAuth;
