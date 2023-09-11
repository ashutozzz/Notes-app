import React from "react";
import "./notesPT.css";
import { useNavigate } from "react-router-dom";
import UseContext from "../../useContext";

function MNotesTitle({ title }) {
  // Initialize navigation and setSelected from context
  const navigate = useNavigate();
  const { setSelected } = UseContext();

  // Function to calculate initials based on the group name
  const initials = (() => {
    const words = title[0].name.split(" ");
    let initials = "";
  
    if (words.length === 1) {
      initials = words[0].slice(0, 2).toUpperCase();
    } else if (words.length === 2) {
      initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length > 2) {
      initials = words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
    }
  
    return initials;
  })();

  // Create a new title with each word capitalized
  const newTitle = title[0].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  // Function to handle title click and set the selected group and navigate to notes page
  const handleTitleClick = () => {
    localStorage.setItem("selected", title[0].name);
    setSelected(title[0].name);
    navigate("/notes");
  };
  
  return (
    <div onClick={handleTitleClick} className="m_notes">
      <div
        className="m_notes_icon"
        style={{ backgroundColor: title[0].color }}
      >
        {initials}
      </div>
      <div className="m_notes_title">{newTitle}</div>
    </div>
  );
}

export default MNotesTitle;
