import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import NotFound from "./pages/Not Found/NotFound";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;