import "./Me.css";

const Me = ({ message }) => {
  return (
    <div className="chat-bubble-container">
      <div className="chat-bubble">
        <div className="user-msg-container">
          <div className="senders-info">
            <span className="sender-name">me</span>
          </div>
          <div className="user-msg">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Me;
