import React from "react";
import "./notesMC.css";

function MNotesContent({ note }) {
  return (
    <div className="m_notes_content_body">
      <div className="m_notes_content_date_time_details">
        {/* Display the time of the note */}
        <div className="m_notes_content_time">{note.time}</div>
        {/* Display the date of the note */}
        <div className="m_notes_content_date">{note.date}</div>
      </div>
      <div className="m_notes_content_details">
        {/* Split note content by line breaks and display each line as a paragraph */}
        {note.content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default MNotesContent;
