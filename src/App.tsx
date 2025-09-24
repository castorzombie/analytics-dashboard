
import { ApolloProvider } from '@apollo/client/react';
import client from './services/apolloClient';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import DashboardOverview from './components/features/DashboardOverview';
import Dashboard from './components/features/Dashboard';
import PaymentsList from './components/features/PaymentsList';
import PaymentDetail from './components/features/PaymentDetail';
import { RootProvider } from './context/RootProvider';
import Layout from './components/layout/Layout';


function AppRoutes() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/payments/');
  return (
    <Layout
      headerLeft={
        isDetail ? (
          <Link
            to="/"
            className="text-blue-400 hover:underline flex items-center text-sm font-medium"
          >
            &larr; Back
          </Link>
        ) : undefined
      }
      showTitle={!isDetail}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashboardOverview />
              <Dashboard />
              <PaymentsList />
            </>
          }
        />
        <Route path="/payments/:id" element={<PaymentDetail />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <RootProvider>
        <Router>
          <AppRoutes />
        </Router>
      </RootProvider>
    </ApolloProvider>
  );
}

export default App;
