import React from "react";
import { Link } from "react-router-dom";
import Container from "../Components/Container/Container";
const NotFound = () => {
  return (
     <>
          <Container height="13rem">
               <h1>404 Page Not Found</h1>
               <p className="url-direction">Want to go Home? <Link to="/login">Click Here</Link></p>
          </Container>
     </>
  );
};

export default NotFound;
