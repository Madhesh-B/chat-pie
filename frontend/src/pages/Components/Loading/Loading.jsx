import "./Loading.css";

const Loading = ({ appear }) => {
  return (
    <div
      className="loading-container"
      style={{ display: appear ? "flex" : "none" }}
    >
      <div className="loding-spinner"></div>
    </div>
  );
};

export default Loading;
