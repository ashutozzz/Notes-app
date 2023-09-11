import React, { useEffect, useState } from "react";
import "./notesLaptop.css";
import enter from "../../Assets/send.png";
import LNotesContent from "../Notes Content/notesLC";
import UseContext from "../../useContext";

function LNotes() {
  // State variables
  const [txt, setTxt] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [initials, setInitials] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const { notes, setNotes, selected } = UseContext();

  useEffect(() => {
    // Load notes and update component state when selected group changes
    setNotes(JSON.parse(localStorage.getItem(selected)) || []);
    const groupNames = JSON.parse(localStorage.getItem("groupNames"));
    const selectedGroup = groupNames.find((group) => group.name === selected);

    let initials = "";
    let selectedTitle = "";

    if (selectedGroup) {
      const words = selectedGroup.name.split(" ");
      if (words.length === 1) {
        initials = words[0].slice(0, 2).toUpperCase();
      } else if (words.length === 2) {
        initials =
          words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
      } else if (words.length > 2) {
        initials =
          words[0].charAt(0).toUpperCase() +
          words[words.length - 1].charAt(0).toUpperCase();
      }

      selectedTitle = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    setBgColor(selectedGroup ? selectedGroup.color : "#fff");
    setInitials(initials);
    setSelectedTitle(selectedTitle);
  }, [selected, setNotes]);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNotes();
    } else if (e.key === "Enter" && e.shiftKey) {
      setTxt((prevText) => prevText + "\n");
    }
  };

  // Save notes to local storage
  const handleSaveNotes = () => {
    if (!txt.trim()) {
      return;
    }
    const notes = JSON.parse(localStorage.getItem(selected)) || [];
    const newNoteObj = {
      id: Date.now(),
      title: selected,
      content: txt,
      date: formatCurrentDate(),
      time: formatCurrentTime(),
    };
    notes.push(newNoteObj);
    localStorage.setItem(selected, JSON.stringify(notes));
    setTxt("");
    setNotes(notes);
  };

  // Handle textarea input change
  const handleChange = (e) => {
    setTxt(e.target.value);
  };

  // Format current time
  const formatCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const ampm = now.getHours() >= 12 ? "Pm" : "Am";
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${ampm}`;
  };

  // Format current date
  const formatCurrentDate = () => {
    const now = new Date();
    const day = now.getDate().toString();
    const monthIndex = now.getMonth();
    const year = now.getFullYear().toString();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[monthIndex];
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="notes">
      <div className="notes_title">
        <div
          className="notes_title_color"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="notes_title_text">{selectedTitle}</div>
      </div>
      <div className="notes_content">
        {notes && notes.length > 0
          ? notes.map((note, index) => (
              <LNotesContent
                key={index}
                note={{
                  ...note,
                  content: (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: note.content.replace(/\n/g, "<br />"),
                      }}
                    />
                  ),
                }}
              />
            ))
          : null}
      </div>
      <div className="notes_input">
        <textarea
          value={txt}
          placeholder="Enter your text here..........."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <img src={enter} alt="enter" onClick={handleSaveNotes} />
      </div>
    </div>
  );
}

export default LNotes;
