import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <React.Fragment>
    {location.pathname !== "/edit" ?
      <>
        {
            location.pathname === "/" ? (
                <Link to="/add">Add Data</Link>
              ) : (
                <Link to="/">Listing</Link>
              )
        }
      </>
      :
        <>
        <Link to="/add">Add Data</Link> <Link to="/">Listing</Link>
        </>
      }
    </React.Fragment>
  );
};

export default Header;
