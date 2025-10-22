import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";

import Dashboard from "./pages/Dashboard/Index";
import Products from "./pages/Products/Index";
import Sales from "./pages/Sales/Index";
import Customers from "./pages/Customers/Index";
import Reports from "./pages/Reports/Index";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}
