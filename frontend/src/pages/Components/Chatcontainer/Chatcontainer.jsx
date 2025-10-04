import "./Chatcontainer.css";
import Me from "./../Me/Me";
import Others from "./../Others/Others";
import { useRef, useState, useEffect } from "react";
import Socket from "./../../../Socket";

const socket = Socket;

function isObjectEmpty(obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  return Object.keys(obj).length === 0;
}

const Chatcontainer = (props) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [info, setinfo] = useState("");
  const [heightStyle, setHeightStyle] = useState({});
  const [credientials, setCredientials] = useState({});
  const [memberCount , setMemberCount] = useState(1);

  useEffect(() => {
    const localStorageCrediendials = JSON.parse(localStorage.getItem("user"));
    setCredientials(localStorageCrediendials);
  }, []);

  useEffect(() => {
    if (info.includes("\n")) {
      setHeightStyle({ height: "20%", transform: "translateY(-10px)" });
    } else {
      setHeightStyle({});
    }
  }, [info]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === "Textarea") {
        return;
      }
      if (ref.current) {
        ref.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [props.details]);

  function addMessage(currMessage, sender) {
    let tempMessage = {
      id: props.details.messages.chat.length + 1,
      sendBy: sender,
      message: currMessage,
    };
    let newObj = {
      ...props.details,
      messages: {
        ...props.details.messages,
        chat: [...props.details.messages.chat, tempMessage],
      },
    };
    return newObj;
  }

  function send() {
    if (!ref.current.value.trim()) return; // prevent empty msg

    const newMessage = addMessage(ref.current.value, credientials.username);
    props.sendMessage(newMessage);
    socket.emit("message_send", newMessage);
    ref.current.value = "";
    setinfo("");
    console.log("msgsent");
  }

  function OnEnterBtn(e) {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      ref.current.value += "\n";
    } else if (e.key === "Enter" && ref.current.value !== "" && !e.shiftKey) {
      const msg = addMessage(ref.current.value, credientials.username);
      props.sendMessage(msg);
      e.preventDefault();
      socket.emit("message_send", msg);
      console.log("msgsent");
      ref.current.value = "";
      setinfo("");
    }
  }

  // sockets

  useEffect(() => {
    const handleMessage = (data) => {
      console.log("Received on client:", data);
      props.sendMessage(data);
    };

    socket.on("recieve_message", handleMessage);

    return () => {
      socket.off("recieve_message", handleMessage);
    };
  }, []);
  
  useEffect(() => {
    const handleMessage = (data) => {
      setMemberCount(data);
    };

    socket.on("update_user_count", handleMessage);

    return () => {
      socket.off("update_user_count", handleMessage);
    };
  }, []);

  return isObjectEmpty(props.details) ? (
    <div className="no-chat-selected"></div>
  ) : (
    <>
      <div className="header-info">
        <div className="profile-img">
          <img src="/vite.svg" alt={props.details.contact} />
        </div>
        <div className="contact-name">
          <span className="person-name">{props.details.person}</span><br />
          <span className="online-indicator" style={{color:"#fff" , fontSize:"12px"}}>{ memberCount } online</span>
        </div>
      </div>
      <div className="message-holder" ref={containerRef}>
        {props.details.messages.chat.map((msg) => {
          const credientials = JSON.parse(localStorage.getItem("user"));
          console.log(msg);
          return msg.sendBy == credientials.username ? (
            <Me message={msg.message} key={msg.id} />
          ) : (
            <Others message={msg.message} key={msg.id} sender={msg.sendBy} />
          );
        })}
      </div>
      <div className="input-holder" style={heightStyle}>
        <textarea
          ref={ref}
          onKeyDown={OnEnterBtn}
          onChange={(e) => setinfo(e.target.value)}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Type Your Message Here..."
        ></textarea>
        <button
          className="send-btn"
          onClick={() => (ref.current.value !== "" ? send() : "")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Chatcontainer;
