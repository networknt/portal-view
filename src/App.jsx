import React from 'react';
import {
  BrowserRouter,
  Routes,
  Navigate,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import Error from './pages/error';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to dashboard */}
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
        
        {/* Layout routes */}
        <Route path="/app/*" element={<Layout />} />
        
        {/* Catch all route for 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
