import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage";
import SignupModal from "./components/Modals/SignupModal";
import ProfileModal from "./components/Modals/ProfileModal";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <Router>
      <ModalProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flowers" element={<HomePage />} />
          <Route path="/sightings" element={<HomePage />} />
          <Route path="/signup" element={<SignupModal />} />
          <Route path="/profile" element={<ProfileModal />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
}

export default App;
