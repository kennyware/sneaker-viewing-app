import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/styled/Global";
import { Container } from "./components/styled/Container.styled";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Products from "./components/Products";
import ProductDisplay from "./components/ProductDisplay";
import Login from "./components/Login";
import Register from "./components/Register";
import Bag from "./components/Bag";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSavedItems } from "./features/auth/authSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        dispatch(getSavedItems());
      }, 2000);
    }
  }, [user, dispatch]);

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bag" element={<Bag />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Ooops. Page not found.</p>
              </main>
            }
          />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
