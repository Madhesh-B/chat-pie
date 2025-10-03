import { useState } from "react";
import "./Resetpassword.css";
const Resetpassword = (props) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function updatePassword(e) {
    let newPassword = { [e.target.name]: e.target.value };
    setPasswords((prev) => {
      return { ...passwords, ...newPassword };
    });
    console.log(passwords);
  }
  const [value, setValue] = useState("");

  function changeUserPassword() {
    const details = JSON.parse(localStorage.getItem("user"));
    if (
      passwords.newPassword !== "" &&
      passwords.confirmPassword !== "" &&
      passwords.newPassword !== ""
    ) {
      if (passwords.newPassword === passwords.confirmPassword) {
        if (details.password === passwords.currentPassword) {
          if (passwords.currentPassword !== passwords.newPassword) {
            if (passwords.newPassword.length >= 8) {
              if (/[a-z]/.test(passwords.newPassword)) {
                if (/[A-Z]/.test(passwords.newPassword)) {
                  if (/[1-9]/.test(passwords.newPassword)) {
                    if (/[^a-zA-Z0-9\.\,]/.test(passwords.newPassword)) {
                      alert("Done");
                      details.password = passwords.newPassword;
                      localStorage.setItem("user", JSON.stringify(details));
                      setPasswords({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setValue("");
                      props.close(false);
                    } else {
                      setValue(
                        "Password must contain at least one special character"
                      );
                    }
                  } else {
                    setValue("Password must contain at least one Number");
                  }
                } else {
                  setValue(
                    "Password must include both uppercase and lowercase letters."
                  );
                }
              } else {
                setValue(
                  "Password must include both uppercase and lowercase letters."
                );
              }
            } else {
              setValue("Password must contain at least 8 Characters");
            }
          } else {
            setValue("Please choose a new password different from your current one.");
          }
        } else {
          setValue("The current password you entered is incorrect.");
        }
      } else {
        setValue("Password Dosen't match.");
      }
    } else {
      setValue("Password cannot be blank. Please enter a valid password.");
    }
  }

  return (
    <div
      className="reset-password-conatiner"
      style={{ display: props.appear ? "flex" : "none" }}
    >
      <div className="reset-password-title">
        <span>Reset Password</span>
      </div>
      <div className="reset-password-input-container">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="curr-password">
                  Enter your Current Password:
                </label>
              </td>
              <td>
                <input
                  onInput={(e) => updatePassword(e)}
                  type="password"
                  value={passwords.currentPassword}
                  name="currentPassword"
                  id="curr-password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="new-password">Enter your new Password:</label>
              </td>
              <td>
                <input
                  onInput={(e) => updatePassword(e)}
                  type="password"
                  value={passwords.newPassword}
                  name="newPassword"
                  id="new-password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="confirm-password">
                  Confirm your new Password:
                </label>
              </td>
              <td>
                <input
                  onInput={(e) => updatePassword(e)}
                  type="password"
                  value={passwords.confirmPassword}
                  name="confirmPassword"
                  id="confirm-password"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                style={{ textAlign: "center", color: "red", fontSize: "16px" }}
                colSpan={2}
              >
                {value}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="submit-btn-holder">
        <button onClick={changeUserPassword} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Resetpassword;
