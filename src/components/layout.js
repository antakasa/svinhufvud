import React from "react";
import "./layout.css";
import Contact from "./contact";
const FrontPage = ({ children }) => (
  <div>
    <div className="layout-container">
      {children}
      <Contact />
    </div>
  </div>
);

export default FrontPage;
