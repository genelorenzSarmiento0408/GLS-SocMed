import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

import { AuthContext } from "./context/auth";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { Settings } from "./pages/Settings";
import UserProfile from "./pages/UserProfile";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Container>
            <Navbar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/users/:username" component={Profile} />
            {user ? <Route exact path="/settings" component={Settings} /> : (
        <Route exact path="/settings" component={PageNotFound} />
            )}
            {user ? (
              <Route path="/profile" component={UserProfile} />
            ) : (
              <Route exact path="/profile" component={PageNotFound} />
            )}
          </Container>
        </AuthProvider>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
