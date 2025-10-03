import "./info.css";

const Info = ({ themeChanger , turn , hideInfo , openShortcuts , openSettings }) => {
  function handleThemeChange(theme) {
    themeChanger(theme);
  }

  return (
    <>
      <div onMouseLeave={() => hideInfo('off')} className="info-container" style={{display: turn === 'on' ? "inline" : "none"}}>
        <div className="option" onClick={() => handleThemeChange('Image')}>Background Image</div>
        <div className="option" onClick={() => handleThemeChange('Dark')}>Dark Theme</div>
        <div className="option" onClick={() => openShortcuts(true)}>Shortcuts</div>
        <div className="option" onClick={() => openSettings(true)}>Settings</div>
      </div>
    </>
  );
};

export default Info;
