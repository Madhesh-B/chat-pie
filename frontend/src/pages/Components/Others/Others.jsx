import "./Others.css";

const Others = ({ message , sender }) => {
  return (
    <div className="chat-bubble-container-other">
      <div className="chat-bubble-other">
        <div className="user-msg-container-other">
          <div className="senders-info-other">
            <span className="sender-name-other">{sender}</span>
          </div>
          <div className="user-msg-other">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Others;

