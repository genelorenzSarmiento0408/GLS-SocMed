import React from "react";

const PageNotFound = () => {
  return (
    <div className="page-notfound">
      <h1>HTTP 404 ERROR</h1>
      <p>File not found :( </p>
      <p>You may be lost or the file was deleted</p>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default PageNotFound;
