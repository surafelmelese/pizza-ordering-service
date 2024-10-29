import Dashboard from '../../components/Dashboard';
import withAuth from '../../utils/withAuth';

// Wrap Dashboard with withAuth HOC to require the admin role
// const AdminDashboard = withAuth(Dashboard, 'admin');

const Home = () => {
  return <Dashboard />;
};

export default Home;