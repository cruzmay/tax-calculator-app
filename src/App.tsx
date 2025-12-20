import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage, CalculatorPage } from './pages';
import { AuthenticatedLayout } from './components/AuthenticatedLayout';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <CalculatorPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/calculator" replace />} />
      </Routes>
    </div>
  );
}

export default App;
