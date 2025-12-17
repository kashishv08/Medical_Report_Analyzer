import { Route, Switch, useLocation } from "wouter";
import "./App.css";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";
import { SignIn, SignUp } from "@clerk/clerk-react";
import AuthLayout from "./components/layouts/AuthLayout";
import ProtectedRoute from "./lib/middleware/ProtectedRoute";

function Router() {
  const [location] = useLocation();
  const hideNavbar =
    location.startsWith("/sign-in") ||
    location.startsWith("sign-up") ||
    location.startsWith("/analysis");
  return (
    <>
      <Route path="/sign-in/:rest*?">
        <AuthLayout>
          <SignIn routing="path" path="/sign-in" afterSignInUrl={"/home"} />
        </AuthLayout>
      </Route>

      <Route path="/sign-in/:rest*?">
        <AuthLayout>
          <SignUp routing="path" path="/sign-up" />
        </AuthLayout>
      </Route>

      {!hideNavbar && <Navbar />}
      <Switch>
        <Route path="/" component={Splash} />
        <Route path="/home" component={Home} />

        <Route path="/analysis/:id">
          <ProtectedRoute>
            <Analysis />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard/:id">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return <Router />;
}

export default App;
