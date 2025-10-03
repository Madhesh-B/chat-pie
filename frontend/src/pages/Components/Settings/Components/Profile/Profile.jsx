import './Profile.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();
  const details = JSON.parse(localStorage.getItem("user"));
  const [usersInfo, setUsersInfo] = useState({
    username: "",
    email: "",
  });
  useEffect(() => {
    try {
      let username = details.username;
      let email = details.email;
      setUsersInfo({ username, email });
    } catch (e) {
      navigate("/login");
    }
  }, []);
  function logout() {
    navigate("/login");
    localStorage.removeItem("user");
  }
  return (
    <div
      className="profile-conatiner"
      style={{ display: props.appear ? "flex" : "none" }}
    >
      <div className="profile-title">Profile</div>
      <div className="profile-info-container">
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                {usersInfo.username != null
                  ? usersInfo.username
                  : "cannot Get The Information"}
              </td>
            </tr>
            <tr>
              <td>E-mail Id:</td>
              <td>
                {usersInfo.email != null
                  ? usersInfo.email
                  : "cannot Get The Information"}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="info-footer">
          <div className="logout-btn-holder">
            <button className="logout-btn" onClick={logout}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
