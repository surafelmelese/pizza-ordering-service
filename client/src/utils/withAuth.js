const withAuth = (WrappedComponent, requiredRoles) => {
  const AuthHOC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    console.log(user.user.role_name);

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
    }, [loading, user, requiredRoles, router]);

    if (loading || !user) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };

  // Set a display name for the component
  AuthHOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthHOC;
};

export default withAuth;
