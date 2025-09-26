import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import LoginScreen from "./screens/LoginScreen";
import InscriptionScreen from "./screens/InscriptionScreen";
import GestionScreen from "./screens/GestionScreen";
import EditProfileScreen from "./screens/EditProfileScreen"
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/inscription" element={<InscriptionScreen />} />
        <Route path="/gestion" element={
            <PrivateRoute>
              <GestionScreen />
            </PrivateRoute>
          } 
        />
        <Route path="/editProfile" element={
            <PrivateRoute>
              <EditProfileScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
