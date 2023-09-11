import React from "react";
import "./laptop.css";
import Sidebar from "../components/Sidebar/sideB";
import LHome from "../components/Home/homeL";
import LNotes from "../components/Notes/notesLaptop";
import UseContext from "../useContext";

function Laptop() {
   // Get the selected group from context
  const { selected } = UseContext();

  return (
    <div className="lappy">
      <Sidebar />
      {selected.length > 0 ? <LNotes /> : <LHome />}
    </div>
  );
}

export default Laptop;
