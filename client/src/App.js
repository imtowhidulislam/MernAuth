import "./App.css";
import { AllUsers, LoginForm, RegisterForm, NoPage } from "./components/index";

import { Route, Router, Routes, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <Routes>
        {user && <Route path="/" element={<AllUsers />} />}
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        {/* <Route path="/" element={<Navigate replace={LoginForm} />} /> */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
