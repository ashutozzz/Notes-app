import React, { useState, useEffect, useRef } from "react";
import "./mobile.css";
import CreateNotesM from "../components/Create Notes/CreateM";
import MNotesTitle from "../components/Notes Title/notesPT";

function Phone() {
  // State for titles, showPopup, and groupNamesParent
  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [groupNamesParent, setGroupNamesParent] = useState(
    localStorage.getItem("groupNames") || []
  );

  // Load group names from local storage on initial render
  useEffect(() => {
    const data = localStorage.getItem("groupNames");
    if (data) {
      setGroupNamesParent(JSON.parse(data));
    } else {
      setGroupNamesParent([]);
    }
  }, []);

  // Update titles when groupNamesParent changes
  useEffect(() => {
    if (groupNamesParent.length > 0) {
      const obj = JSON.parse(localStorage.getItem("groupNames"));
      const result = Object.keys(obj).map((key) => [obj[key]]);
      setTitles(result);
    }
  }, [groupNamesParent]);

  // Handle click to show the popup for creating notes group
  const handleClick = () => {
    setShowPopup(true);
  };

  // Handle closing the popup
  const handleClose = () => {
    setShowPopup(false);
  };

  // Reference to the popup element for click outside detection
  const popupRef = useRef(null);

  // Effect to detect clicks outside the popup and close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="mobile_sidebar">
      <div className="mst">Pocket Notes</div>
      <div className="mobile_sidebar_create_notes_btn">
        <button onClick={handleClick}>
          <span id="add">+</span>
          <span>Create Notes Group</span>
        </button>
      </div>
      <div className="mobile_sidebar_notes_title">
        {titles.map((title, index) => (
          <MNotesTitle
            title={title}
            key={index}
          />
        ))}
      </div>
      {showPopup && (
        <div className="mobile_popup_overlay">
          <div ref={popupRef}>
            <CreateNotesM
              groupNamesParent={groupNamesParent}
              setGroupNamesParent={setGroupNamesParent}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Phone;
