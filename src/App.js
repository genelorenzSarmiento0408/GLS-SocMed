import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "./components/NavBar";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import "semantic-ui-css/semantic.min.css";
import "./App.scss";

function App() {
  var environment = process.env.NODE_ENV;

  if (environment === "development") {
    return (
      <AuthProvider>
        <Router>
          {/* <Container> */}
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          {/* </Container> */}
        </Router>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <Router>
          <Container>
            <Navbar />
            <Route exact path="/" component={Home} />
            {/*   <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/posts/:postId" component={SinglePost} /> */}
          </Container>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
