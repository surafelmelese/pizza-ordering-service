// src/utils/withAuth.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, requiredRoles) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Normalize roles to lowercase for case-insensitive comparison
      if (
        !loading &&
        (!user ||
          (requiredRoles &&
            !requiredRoles.some(
              (role) => role.toLowerCase() === user.user.role_name.toLowerCase()
            )))
      ) {
        router.push('/login');
      }
    }, [loading, user, requiredRoles]);

    if (loading || !user) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;