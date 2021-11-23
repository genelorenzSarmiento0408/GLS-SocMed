import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  function Logout() {
    <Redirect to="/" />;
    logout();
  }
  const NavBar = user ? (
    <Menu inverted size="large" color="teal">
      <Menu.Item
        name="home"
        onClick={handleItemClick}
        active={activeItem === "home"}
        //
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="Profile"
          onClick={handleItemClick}
          active={activeItem === "Profile"}
          as={Link}
          to="/profile"
        />
        <Menu.Item name="logout" onClick={Logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu inverted size="large" secondary color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
  return NavBar;
}
