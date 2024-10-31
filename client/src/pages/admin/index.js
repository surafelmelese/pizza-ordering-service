import Dashboard from '../../components/Dashboard';
import withAuth from '../../utils/withAuth';

// Wrap Dashboard with withAuth HOC to require the admin role
const AdminDashboard = withAuth(Dashboard, ['admin', 'super admin']);

const Home = () => {
  return <AdminDashboard />;
};

export default Home;