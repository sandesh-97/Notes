import React from "react";
import logo from './Images/logo.png'

function Header() {
  return (
    <>
      <header className="header" >
          <img src= {logo} alt="logo"  width= '70' height = '70'/>
          <h1> Keep app</h1>
      </header>
    </>
  );
}

export default Header;
