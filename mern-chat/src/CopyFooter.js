import React from "react";
import "./CopyFooter.css";

function CopyFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copy">
      <p>Copyright ©Zaid {currentYear} </p>
    </div>
  );
}

export default CopyFooter;
