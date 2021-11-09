import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import OtherProfile from "./pages/OtherProfile";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/users/:username" component={OtherProfile} />
          <Route path="*" component={PageNotFound} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
