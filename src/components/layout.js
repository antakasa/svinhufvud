import React from "react";
import "./layout.css";
const FrontPage = ({ children }) => (
  <div>
    <div className="layout-container">
      {children}
    </div>
  </div>
);

export default FrontPage;
