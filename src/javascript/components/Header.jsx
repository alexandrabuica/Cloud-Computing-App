import React from "react";

function Header(props) {
  const { title } = props;

  return (
    <header id="header" className="h-14 bg-blue-700 flex justify-center">
      <span className="self-center text-white text-bold text-xl">{title}</span>
    </header>
  );
}

export default Header;
