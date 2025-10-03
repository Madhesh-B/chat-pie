import React from "react";
import { useState } from "react";
import "./Container.css";
const Login = (props) => {
  const [userCrediendials, setUserCrediendials] = useState({
    username: "",
    password: "",
  });
  const style = {height: props.height ? props.height : "24rem"};
  return (
    <>
      <div className="screen">
        <div className="container" style={style}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Login;
