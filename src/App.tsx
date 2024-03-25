import "./App.css";
import Container from "./components/Container";
import { Routes, Route, Navigate } from "react-router-dom";
import Pokemons from "./pages/Pokemons";
function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/*" element={<Pokemons />} />
          {/* <Route path="/devices" element={<DevicesPage />} />
      <Route path="/archived-events" element={<ArchivedEventsPage />} />
      <Route path="/archived-devices" element={<ArchivedDevicesPage />} /> */}
          {/* Redirect to /events if no matching route */}
          <Route path="/" element={<Navigate to="/pokemons" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
