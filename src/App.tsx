import { AuthProvider } from './contexts/AuthContext';
import { FeatureStatusProvider } from './contexts/FeatureStatusContext';
import Layout from './components/Layout';

export default function App() {
  return (
    <FeatureStatusProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </FeatureStatusProvider>
  );
}
