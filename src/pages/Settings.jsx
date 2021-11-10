import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

export const Settings = () => {
  const { user } = useContext(AuthContext);
  let username = user.username;
  return (
    <div className="page-title">
      <h1>Settings</h1>
    </div>
  );
};
