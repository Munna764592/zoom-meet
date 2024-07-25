import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoom from "./comp/CreateRoom";
import Room from "./comp/Room";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateRoom />} />
          <Route path="/room/:roomID" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
