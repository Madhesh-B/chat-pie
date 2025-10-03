import "./Settings.css";
import { useEffect, useState } from "react";
import Profile from './Components/Profile/Profile';
import Resetpassword from './Components/Reset Password/Resetpassword';
const Settings = ({ canAppear, doAppear }) => {
  const [activeSettings , setActiveSettings] = useState({
    profile : { classNames : 'option selected' , status : true },
    resetPassword : { classNames : 'option' , status : false }
  });
  function switchSettings(settings){
    let settingsList = {...activeSettings};
    for(let position in settingsList){
      settingsList[position].status = false;
      settingsList[position].classNames = 'option';
    }
    settingsList[settings].classNames = 'option selected';
    settingsList[settings].status = true;
    setActiveSettings({...settingsList});
  }
  return (
    <div
      className="settings-window"
      style={{ display: canAppear ? "block" : "none" }}
    >
      <div className="settings-container">
        <div className="settings-header">
          <span className="settings-title">Settings</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="close"
            onClick={() => doAppear(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <hr className="settings-hr" />
        <div className="settings-display">
          <div className="options-container">
            <div className={ activeSettings.profile.classNames } onClick={() => {switchSettings("profile")}}>Profile</div>
            <div className={ activeSettings.resetPassword.classNames } onClick={() => {switchSettings("resetPassword")}}>Reset Password</div>
          </div>
          <div className="settings-info-container">
            <Profile appear = { activeSettings.profile.status }/>
            <Resetpassword appear = { activeSettings.resetPassword.status } close = { doAppear }/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
