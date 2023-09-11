import React from "react";
import "./notesLC.css";

function LNotesContent({ note }) {
  return (
    <div className="notes_content_note">
      <div className="notes_content_date_time_details">
        {/* Display the time of the note */}
        <div className="notes_content_time">{note.time}</div>
        {/* Display the date of the note */}
        <div className="notes_content_date">{note.date}</div>
      </div>
      <div className="notes_content_details">
        {/* Display the content of the note, allowing HTML formatting */}
        {note.content}
      </div>
    </div>
  );
}

export default LNotesContent;
