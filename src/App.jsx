import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import RouteWrapper from "./routes/RouteWrapper";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <RouteWrapper>
              <AppRoutes />
            </RouteWrapper>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
