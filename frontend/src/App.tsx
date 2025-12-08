import { Route, Switch } from "wouter";
import "./App.css";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Splash} />
        <Route path="/home" component={Home} />
        <Route path="/analysis" component={Analysis} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}

function App() {
  return <Router />;
}

export default App;
