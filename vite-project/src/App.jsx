
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ImagesPage from "./components/ImagesPage";

import CreateUsers from "./components/CreateUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import GetImages from "./components/CreateImage";
import UploadImage from "./components/ImagesPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protect Routes */}
          <Route element={<ProtectedRoute type="admin"/>}>
            <Route path="/images" element={<UploadImage />} />
            <Route path="/create-users" element={<CreateUsers />} />
          </Route>
          <Route element={<ProtectedRoute type="user" />}>
            <Route path="/user_images" element={<GetImages />} />
          </Route>

          {/* Default Route */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


