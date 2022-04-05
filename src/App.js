import { useContext } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Routes/Layout";
import RequireAuth from "./components/require/RequireAuth";
import { RenderProvider } from "./context/RenderContextProvider";

function App() {
  const { auth, setAuth } = useAuth();

  return (
    <RenderProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </RenderProvider>
  );
}

export default App;
