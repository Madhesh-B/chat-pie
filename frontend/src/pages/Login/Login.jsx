import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container/Container";
import { useState } from "react";
const Login = () => {
  const [userCrediendials, setUserCrediendials] = useState({
    username: "",
    password: "",
    email: "admin123@gmail.com",
  });

  const [containerHeight, setContainerHeight] = useState({ height: "24rem" });

  const [warningUpdate, setWarningUpdate] = useState("");

  function handleEnter (e){
    if(e.key === "Enter"){
      setLoacal();
    }
  }
  
  const navigate = useNavigate();
  function setLoacal() {
    if (userCrediendials.username !== "") {
      if (userCrediendials.password !== "") {
        if (userCrediendials.password.length >= 8) {
          if (/[a-z]/.test(userCrediendials.password)) {
            if (/[A-Z]/.test(userCrediendials.password)) {
              if (/[1-9]/.test(userCrediendials.password)) {
                if (/[^a-zA-Z0-9\.\,]/.test(userCrediendials.password)) {
                  localStorage.setItem(
                    "user",
                    JSON.stringify(userCrediendials)
                  );
                  navigate("/");
                } else {
                  setContainerHeight("24rem");
                  setWarningUpdate(
                    "Password must contain at least one special character"
                  );
                }
              } else {
                setContainerHeight("24rem");
                setWarningUpdate("Password must contain at least one Number");
              }
            } else {
              setContainerHeight("27rem");
              setWarningUpdate(
                "Password must include both uppercase and lowercase letters."
              );
            }
          } else {
            setContainerHeight("27rem");
            setWarningUpdate(
              "Password must include both uppercase and lowercase letters."
            );
          }
        } else {
          setContainerHeight("24rem");
          setWarningUpdate("Password must contain at least 8 Characters");
        }
      } else {
        setWarningUpdate(
          "Password cannot be blank. Please enter a valid password."
        );
      }
    } else{
      setWarningUpdate(
        "Username cannot be blank. Please enter a valid username."
      );
    }
  }

  return (
    <>
      <Container height={containerHeight}>
        <div className="logo">
          <h1 className="title">Login</h1>
        </div>
        <div className="form">
          <div className="user-name-field field-box">
            <label htmlFor="username">Enter the User Name:</label>
            <input
              onInput={(e) =>
                setUserCrediendials((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
              type="text"
              id="username"
              className="input"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="password-field field-box">
            <label htmlFor="password">Enter the Password:</label>
            <input
              onInput={(e) =>
                setUserCrediendials((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              onKeyDown={ handleEnter }
              type="password"
              id="password"
              className="input"
            />
          </div>
          <span className="warning-info" style={{ color: "red" }}>
            {warningUpdate}
          </span>
          <div className="bottom-holder">
            <span className="info-line">
              Don't have an account?
              <Link to="" className="signup-link">
                Signup
              </Link>
            </span>
            <button className="btn" onClick={(e) => setLoacal(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="login-text">Login</span>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
