import React from "react";
import "./Chatbox.css";
const Chatbox = ({ details , messageReader }) => {
  return (
     <>
          <div className="contact-box" onClick={() => messageReader(details)}>
               <div className="profile-img">
                    <img src="/public/vite.svg" alt={details.contact} />
               </div>
               <div className="contact-name"><span className="person-name">{details.person}</span></div>
          </div>
     </>
  );
};

export default Chatbox;
