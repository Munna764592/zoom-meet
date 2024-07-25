const SideControls = ({ toggleSidePanel }) => {
  return (
    <div className="sideControlsWrapper">
      <span
        onClick={() => toggleSidePanel("Chats")}
        className="material-symbols-outlined"
      >
        forum
      </span>
      <span
        onClick={() => toggleSidePanel("People")}
        className="material-symbols-outlined"
      >
        groups
      </span>
    </div>
  );
};

export default SideControls;
