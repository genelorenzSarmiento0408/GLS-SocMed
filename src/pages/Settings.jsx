import React, { useContext } from "react";

export const Settings = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="page-title">
      <h1>Settings</h1>
    </div>
  );
};
