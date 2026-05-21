import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0A0A0A] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;