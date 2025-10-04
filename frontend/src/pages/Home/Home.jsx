import "./Home.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "./../Components/Loading/Loading";
import Info from "../Components/Info/Info";
import Chatbox from "./../Components/Chatbox/Chatbox";
import Chatcontainer from "../Components/Chatcontainer/Chatcontainer";
import Shortcuts from "../Components/ShortCuts/Shortcuts";
import Settings from "../Components/Settings/Settings";
import Socket from "./../../Socket";

const socket = Socket;

const Home = () => {
  const [LoadingStatus, setLoading] = useState(true); //for loading state

  const [message, setMessage] = useState({}); //for message holder

  const BG = useRef(null); //for bg reference

  const [className, setClassName] = useState("window-container Dark"); //for class theme

  const [shortcutAppear, setShortcutAppear] = useState(false); //for shortcut toggle

  const [theme, setTheme] = useState("Light"); // for theme

  const [themeTurn, setThemeTurn] = useState("off"); //for theme toggle

  const [settingsAppear, setSettingsAppear] = useState(false); //for toggle settings appearence

  const [contactsList, SetContactsList] = useState([]); //for contacts list

  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    if(!socket) return;

    socket.on('connect' , (data) => {
      setLoading(false);
    })
  })

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }, []); // for authentication check

  useEffect(() => {
    document.title = "Chat Pie";
  }, []);

  useEffect(() => {
    setClassName(
      theme === "Image" ? "window-container Image" : "window-container Dark"
    );
  }, [theme]);

  let items = [
    {
      id: 1,
      person: "Self Chat",
      messages: {
        id: 1,
        chat: [
          {
            id: 1,
            sendBy: "System",
            message:
              "Something went wrong please try again later or chat yourself!",
          },
        ],
      },
    },
  ];

  function fetchData() {
    try {
      const handleChat = (data) => {
        SetContactsList(data);
      };
      socket.on("chat", handleChat);

      // setLoading(false);

      return () => {
        socket.off("chat", handleChat);
      };
    } catch (e) {
      console.log(e);
      SetContactsList(items);
      setLoading(false);
      return () => {};
    }
  }

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, []);

  function handleSendMessage(newObj) {
    SetContactsList((prev) =>
      prev.map((contact) => (contact.id === newObj.id ? newObj : contact))
    );
    setMessage(newObj);
  }

  return (
    <>
      <Loading appear={LoadingStatus} />
      <Shortcuts appear={shortcutAppear} setAppear={setShortcutAppear} />
      <Settings
        canAppear={settingsAppear}
        doAppear={setSettingsAppear}
        info={contactsList}
      />
      <div ref={BG} className={className}>
        <div className="chatbar">
          <div className="header">
            <h2 className="title">Chat Pie</h2>
            <div className="more-options">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => setThemeTurn("on")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
              <Info
                themeChanger={setTheme}
                turn={themeTurn}
                hideInfo={setThemeTurn}
                openShortcuts={setShortcutAppear}
                openSettings={setSettingsAppear}
              />
            </div>
          </div>
          <div className="chatboxes">
            {contactsList.map((contact) => (
              <Chatbox
                key={contact.id}
                details={contact}
                messageReader={setMessage}
                sendMessage={handleSendMessage}
              />
            ))}
          </div>
          <button className="add-btn" onClick={() => alert('This option is currently unavailable')}>
            <span className="plus-icon">+</span>
          </button>
        </div>
        <div className="message-conatiner">
          <Chatcontainer details={message} sendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
};
export default Home;
