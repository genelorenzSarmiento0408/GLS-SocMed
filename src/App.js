import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import AuthRoute from "./util/AuthRoute";

import "./App.scss";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { Settings } from "./pages/Settings.jsx";
import UserProfile from "./pages/UserProfile";
import UserRoute from "./util/UserRoute";
import Message from "./pages/Message";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MessageProvider>
          <Navbar />
          <Container fluid="xl">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" component={Login} />
              <Route exact path="/posts/:postId" component={SinglePost} />
              <Route exact path="/users/:username" component={Profile} />
              <UserRoute exact path="/settings" component={Settings} />
              <UserRoute exact path="/messages" component={Message} />
              <UserRoute path="/profile" component={UserProfile} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Container>{" "}
        </MessageProvider>
      </AuthProvider>
    </Router>
  );
}
console.log(process.env.REACT_APP_APILINK);

export default App;
