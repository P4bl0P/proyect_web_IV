import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import LoginScreen from "./screens/LoginScreen";
import InscriptionScreen from "./screens/InscriptionScreen";
import GestionScreen from "./screens/privateScreens/GestionScreen";
import EditProfileScreen from "./screens/privateScreens/EditProfileScreen"
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import JefaturaScreen from "./screens/privateScreens/JefaturaScreen";
import TesoreriaScreen from "./screens/privateScreens/TesoreriaScreen";
import SecretariaScreen from "./screens/privateScreens/SecretariaScreen";



function App() {
  return (
    <>
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
          <Route path="/jefatura" element={
              <PrivateRoute>
                <JefaturaScreen />
              </PrivateRoute>
            }
          />
          <Route path="/tesoreria" element={
              <PrivateRoute>
                <TesoreriaScreen />
              </PrivateRoute>
            }
          />
          <Route path="/secretaria" element={
              <PrivateRoute>
                <SecretariaScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
