import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TripPlanner from './components/pages/TripPlanner/TripPlanner';
import ExpenseTracker from './components/pages/ExpenseTracker/ExpenseTracker';
import TravelFAQ from './components/pages/TravelFAQ/TravelFAQ';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/travel-faq" element={<TravelFAQ />} />
        <Route path="/" element={<TripPlanner />} />
      </Routes>
    </Layout>
  );
}

export default App
