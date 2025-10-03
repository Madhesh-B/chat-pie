import "./Chatcontainer.css";
import Me from "./../Me/Me";
import Others from "./../Others/Others";
import { useRef, useState, useEffect } from "react";
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

  useEffect(() => {
    if (info.includes("\n")) {
      setHeightStyle({ height: "20%" , transform:'translateY(-10px)'});
    }else{
      setHeightStyle({});
    }
  } , [info]);

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

  function OnEnterBtn(e) {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      ref.current.value += "\n";
    } else if (e.key === "Enter" && ref.current.value !== "" && !e.shiftKey) {
      props.sendMessage(addMessage(ref.current.value));
      e.preventDefault();
      ref.current.value = "";
      setinfo("");
    }
  }

  function addMessage(currMessage) {
    const credientials = JSON.parse(localStorage.getItem("user"));
    console.log(credientials);
    let tempMessage = {
      id: props.details.messages.chat.length + 1,
      sendBy: credientials.username,
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

  return isObjectEmpty(props.details) ? (
    <div className="no-chat-selected"></div>
  ) : (
    <>
      <div className="header-info">
        <div className="profile-img">
          <img src="/vite.svg" alt={props.details.contact} />
        </div>
        <div className="contact-name">
          <span className="person-name">{props.details.person}</span>
        </div>
      </div>
      <div className="message-holder" ref={containerRef}>
        {props.details.messages.chat.map((msg) => {
          const credientials = JSON.parse(localStorage.getItem("user"));
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
          onClick={() =>
            ref.current.value !== ""
              ? props.sendMessage(addMessage(ref.current.value))
              : ""
          }
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
