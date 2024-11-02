
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext'
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
