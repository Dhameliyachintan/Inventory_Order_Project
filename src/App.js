import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import { useState } from "react";
import { AuthProvider } from "./component/form/Authprovider";
import Home from "./pages/Home.js";
import Navbar from "./component/Navbar.js";
import { InventoryProvider } from "./contextapi/InventoryProvider.js";
import InventoryForm from "./component/AdminInventoryForm.js";
import AdminDashboard from "./Dashboard/AdminDashboard.js";
import { CartProvider } from "./contextapi/CartProvider.js";
import Cart from "./component/Cart.js";
import CustomerDashboard from "./Dashboard/CustomerDashboard.js";
import PlaceOrder from "./component/PlaceOrder.js";
import { OrderProvider } from "./contextapi/OrderProvider.js";
import Orderadmin from "./component/Orderadmin.js";
import OrderUpdate from "./component/Orderupdate.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthProvider>
      <Router>
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes({ isAuthenticated, onLogin }) {
  const location = useLocation();

  const shouldShowHeader = !["/login", "/registration"].includes(
    location.pathname
  );

  return (
    <div className="App">
      {shouldShowHeader && <Navbar />}
      <InventoryProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/inventoryForm" element={<InventoryForm />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route
                path="/customerDashboard"
                element={<CustomerDashboard />}
              />
              <Route path="/orderadmin" element={<Orderadmin />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/orderupdate" element={<OrderUpdate />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </OrderProvider>
        </CartProvider>
      </InventoryProvider>
    </div>
  );
}

export default App;
