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
import { Settings } from "./pages/Settings";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/users/:username" component={Profile} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/profile" component={UserProfile} />
          </div>
        </AuthProvider>
        <AuthRoute component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
