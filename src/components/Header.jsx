import React, { useState, useEffect } from "react";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageStyle = {
    maxWidth: windowWidth < 600 ? "80%" : windowWidth < 1000 ? "50%" : "33%",
    height: "auto",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "15vh",
    padding: "0 20px",
    boxSizing: "border-box",
  };

  return (
    <header style={headerStyle}>
      <img
        src="/images/project7logo.png"
        alt="Header Image"
        style={imageStyle}
      />
    </header>
  );
};

export default Header;
