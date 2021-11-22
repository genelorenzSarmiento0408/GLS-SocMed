import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { Settings } from "./pages/Settings.jsx";
import UserProfile from "./pages/UserProfile";
import UserRoute from "./util/UserRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Container textAlign="center">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/users/:username" component={Profile} />
            <UserRoute exact path="/settings" component={Settings} />
            <UserRoute path="/profile" component={UserProfile} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
